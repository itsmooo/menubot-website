"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { SendHorizontal, MessageCircle, CreditCard, ShoppingBag } from "lucide-react"
import { toast } from "sonner"
import { generateResponse, type ChatMessage } from "@/lib/chatService"
import { MenuDisplay } from "./MenuDisplay"
import { useAuth } from "@/contexts/AuthContext"

interface ChatDialogProps {
  isOpen: boolean
  onClose: () => void
}

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface OrderData {
  items: OrderItem[]
  total: number
  status: "ordering" | "confirming" | "paying" | "completed"
  orderId?: string
  deliveryAddress?: string
}

export function ChatDialog({ isOpen, onClose }: ChatDialogProps) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Salaam! Ku soo dhawoow **Geediga Dahabka Restaurant**! Maxaad dalbanaysaa maanta?" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [menuItems, setMenuItems] = useState<any[]>([])
  const [showPaymentButton, setShowPaymentButton] = useState(false)
  const [paymentData, setPaymentData] = useState<{ phone: string; amount: number }>({ phone: "", amount: 0 })
  const [paymentStep, setPaymentStep] = useState<"none" | "phone" | "amount" | "processing">("none")
  const [currentOrder, setCurrentOrder] = useState<OrderData | null>(null)
  const [orderCreated, setOrderCreated] = useState(false)
  const [orderTotal, setOrderTotal] = useState(0)

  const formatMessage = (content: string) => {
    // Replace **text** with bold styling
    content = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Replace *text* with special offer styling
    content = content.replace(/\*(.*?)\*/g, '<span class="text-orange-500">$1</span>')
    return content
  }

  // Check for payment keywords
  const checkForPaymentKeywords = (text: string): boolean => {
    const paymentKeywords = ["lacag", "bixi", "bixin", "lacagta", "bixiso"]
    const lowerText = text.toLowerCase()

    // Check if it contains payment keywords but not just asking about prices
    const hasPaymentKeyword = paymentKeywords.some((keyword) => lowerText.includes(keyword))
    const isJustPriceInquiry =
      lowerText.includes("$") && (lowerText.includes("intee") || lowerText.includes("how much"))

    return hasPaymentKeyword && !isJustPriceInquiry
  }

  // Parse order items from chat messages
  const parseOrderItems = (messages: ChatMessage[]): OrderItem[] => {
    const items: OrderItem[] = []

    // Define regex patterns to match different order formats
    const patterns = [
      /([^-$]+?)\s*-\s*\$\s*(\d+(?:\.\d+)?)/gi, // "Item - $price"
      /(\d+)\s*x\s*([^$]+?)\s*\$\s*(\d+(?:\.\d+)?)/gi, // "Quantity x Item $price"
      /([^:$]+?):\s*\$\s*(\d+(?:\.\d+)?)/gi, // "Item: $price"
      /([^_$]+?)_\$\s*(\d+(?:\.\d+)?)_/gi, // "Item _$price_"
    ]

    // Look through all messages for order items
    messages.forEach((message) => {
      const content = message.content.toLowerCase()

      // Skip if it's just a payment request message
      if (content.includes("lacag") && !content.includes("$")) {
        return
      }

      // Check for "Wadarta: $X.XX" pattern to extract total directly
      const totalMatch = message.content.match(/Wadarta:\s*\$\s*(\d+(?:\.\d+)?)/i)
      if (totalMatch) {
        const extractedTotal = Number.parseFloat(totalMatch[1])
        if (!isNaN(extractedTotal)) {
          console.log("Found total directly:", extractedTotal)
          setOrderTotal(extractedTotal)
        }
      }

      patterns.forEach((pattern, patternIndex) => {
        let match
        const regex = new RegExp(pattern.source, pattern.flags)

        while ((match = regex.exec(message.content)) !== null) {
          let quantity = 1
          let name = ""
          let price = 0

          if (patternIndex === 1) {
            // Pattern with quantity
            quantity = Number.parseInt(match[1], 10)
            name = match[2].trim()
            price = Number.parseFloat(match[3])
          } else {
            // Other patterns
            name = match[1].trim()
            price = Number.parseFloat(match[2])
          }

          // Clean up the name
          name = name.replace(/^[-\s]+|[-\s]+$/g, "") // Remove leading/trailing dashes and spaces
          name = name.replace(/\s+/g, " ") // Normalize spaces

          // Skip if name is too short or contains unwanted text
          if (name.length < 2 || name.includes("lacag") || name.includes("bixin")) {
            continue
          }

          // Add or update item
          const existingItemIndex = items.findIndex(
            (item) =>
              item.name.toLowerCase().includes(name.toLowerCase()) ||
              name.toLowerCase().includes(item.name.toLowerCase()),
          )

          if (existingItemIndex >= 0) {
            items[existingItemIndex].quantity += quantity
          } else {
            items.push({ name, quantity, price })
          }
        }
      })
    })

    return items
  }

  // Calculate order total - FIXED to not multiply by quantity
  const calculateOrderTotal = (items: OrderItem[]): number => {
    // Simple sum of prices
    return items.reduce((total, item) => total + item.price, 0)
  }

  // Extract order information from chat
  const extractOrderInfo = () => {
    const items = parseOrderItems(messages)

    // Calculate total from items
    const calculatedTotal = calculateOrderTotal(items)

    // Use the extracted total if available, otherwise use calculated total
    const total = orderTotal > 0 ? orderTotal : calculatedTotal

    console.log("Extracted items:", items)
    console.log("Calculated total:", calculatedTotal)
    console.log("Using total:", total)

    if (items.length > 0) {
      const orderData = {
        items,
        total,
        status: "ordering" as const,
      }

      setCurrentOrder(orderData)
      return orderData
    }

    return null
  }

  // Create order in backend - MODIFIED to handle errors gracefully
  const createOrder = async (items: OrderItem[], totalAmount: number): Promise<string | null> => {
    try {
      console.log("Creating order with items:", items, "total:", totalAmount)

      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          items,
          totalAmount,
          deliveryAddress: "To be provided",
        }),
      })

      if (!response.ok) {
        console.warn("Order creation failed with status:", response.status)
        return null
      }

      const orderData = await response.json()
      console.log("Order created successfully:", orderData)
      return orderData._id
    } catch (error) {
      console.error("Error creating order:", error)
      return null // Return null instead of throwing error
    }
  }

  // Update payment status - MODIFIED to handle errors gracefully
  const updatePaymentStatus = async (orderId: string | null, phone: string): Promise<boolean> => {
    // If no orderId, skip updating payment status
    if (!orderId) {
      console.log("No order ID available, skipping payment status update")
      return false
    }

    try {
      const response = await fetch(`http://localhost:3000/api/orders/${orderId}/payment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          phone,
          transactionId: Date.now().toString(),
        }),
      })

      if (!response.ok) {
        console.warn("Payment status update failed with status:", response.status)
        return false
      }

      const result = await response.json()
      console.log("Payment status updated successfully:", result)
      return true
    } catch (error) {
      console.error("Error updating payment status:", error)
      return false
    }
  }

  const handlePaymentButtonClick = () => {
    // Extract or update order information
    const orderInfo = extractOrderInfo()

    if (!orderInfo || orderInfo.items.length === 0) {
      toast.error("Wax dalbasho ma jirto!")
      return
    }

    setShowPaymentButton(false)
    setPaymentStep("phone")

    // Show order summary before payment
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `
          <strong>Faahfaahinta Dalabka:</strong>
          ${orderInfo.items
            .map((item) => `<div>- ${item.quantity}x ${item.name}: $${item.price.toFixed(2)}</div>`)
            .join("")}
          <div class="mt-2"><strong>Wadarta: $${orderInfo.total.toFixed(2)}</strong></div>
          
          Fadlan gali lambarka taleefanka aad lacagta ka bixinayso:
        `,
      },
    ])
  }

  // MODIFIED to prioritize sending payment request even if order creation fails
  const processPayment = async (phone: string, amount: number) => {
    setPaymentStep("processing")
    setIsLoading(true)

    try {
      // Verify amount matches order total
      if (!currentOrder) {
        throw new Error("No active order")
      }

      // Round to 2 decimal places for comparison
      const orderTotal = Math.round(currentOrder.total * 100) / 100
      const paymentAmount = Math.round(amount * 100) / 100

      if (paymentAmount !== orderTotal) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `❌ Lacagta aad gelisay ($${amount}) kuma habboona wadarta dalabka ($${orderTotal}). Fadlan isku day mar kale.`,
          },
        ])
        setPaymentStep("amount")
        setIsLoading(false)
        return
      }

      // Try to create order but continue even if it fails
      let orderId = currentOrder.orderId
      if (!orderId) {
        try {
          orderId = await createOrder(currentOrder.items, currentOrder.total)
          if (orderId) {
            setCurrentOrder((prev) => (prev ? { ...prev, orderId } : null))
            setOrderCreated(true)
          }
        } catch (orderError) {
          console.error("Order creation failed but continuing with payment:", orderError)
        }
      }

      // Process payment - this is the critical part that must succeed
      console.log("Sending payment request to Hormuud:", { phone, amount })
      const response = await fetch("http://localhost:3000/api/payment/hormuud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ phone, amount }),
      })

      if (!response.ok) {
        throw new Error("Payment request failed")
      }

      const paymentResult = await response.json()
      console.log("Payment request sent successfully:", paymentResult)

      // Try to update payment status but continue even if it fails
      try {
        if (orderId) {
          await updatePaymentStatus(orderId, phone)
        }
      } catch (statusError) {
        console.error("Payment status update failed but payment was sent:", statusError)
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `✅ Codsiga lacag bixinta waa la diray! 
               📱 Telefoon: ${phone}
               💰 Lacagta: $${amount}
               ${orderId ? `🧾 Lambarka Dalabka: #${orderId.substring(0, 8)}` : ""}
               
               🔔 Eeg telefoonkaaga - waxaad heli doontaa fariin lacag bixinta ah.
               Riix "OK" ama "Confirm" si aad u xaqiijiso lacag bixinta.
               
               Markii aad xaqiijiso, dalabkaaga waa la bilaabi doonaa!`,
        },
      ])

      setPaymentStep("none")
      setPaymentData({ phone: "", amount: 0 })
      setShowPaymentButton(false)
      setCurrentOrder((prev) => (prev ? { ...prev, status: "completed" } : null))
      toast.success("Codsiga lacag bixinta waa la diray!")
    } catch (error) {
      console.error("Payment error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Waan ka xumahay, khalad ayaa ka dhacay codsiga lacag bixinta. Fadlan isku day mar kale.",
        },
      ])
      setPaymentStep("none")
      toast.error("Codsiga lacag bixinta waa fashilantay")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Parse menu items from the response when available
    const parseMenuItems = (content: string) => {
      if (content.includes("Menu") || content.toLowerCase().includes("food")) {
        const items = content.match(/\*\*(.*?)\*\* - \$(\d+(\.\d+)?)\s+_(.*?)_/g)
        if (items) {
          return items.map((item) => {
            const [name, price, description] = item.match(/\*\*(.*?)\*\* - \$(\d+(\.\d+)?)\s+_(.*?)_/)?.slice(1) || []
            return {
              name,
              price: `$${price}`,
              description,
              category: "Main Dishes",
            }
          })
        }
      }
      return null
    }

    // Check last message for menu items
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.role === "assistant") {
      const items = parseMenuItems(lastMessage.content)
      if (items) {
        setMenuItems(items)
        setShowMenu(true)
      }
    }

    // Update order information when messages change
    if (messages.length > 1 && !orderCreated) {
      extractOrderInfo()
    }
  }, [messages, orderCreated])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend()
  }

  const handleSend = async () => {
    if (!input.trim()) {
      toast.error("Fadlan qor fariin")
      return
    }

    const userInput = input.trim()

    // Handle payment flow steps
    if (paymentStep === "phone") {
      // Updated phone validation - more flexible for Somali numbers
      const phoneRegex = /^(\+?252|0)?[67]\d{7,8}$/
      if (!phoneRegex.test(userInput.replace(/\s/g, ""))) {
        setMessages((prev) => [
          ...prev,
          { role: "user", content: userInput },
          { role: "assistant", content: "Fadlan gali lambar telefoon sax ah (tusaale: 617237489 ama 252617237489)" },
        ])
        setInput("")
        return
      }

      setPaymentData((prev) => ({ ...prev, phone: userInput }))
      setPaymentStep("amount")

      // Make sure we have the latest order total
      const orderInfo = extractOrderInfo()
      const total = orderInfo?.total || 8.0 // Default to 8.00 if we can't extract

      setMessages((prev) => [
        ...prev,
        { role: "user", content: userInput },
        {
          role: "assistant",
          content: `Fadlan gali lacagta aad bixinayso ($${total.toFixed(2)}):`,
        },
      ])
      setInput("")
      return
    }

    if (paymentStep === "amount") {
      const amount = Number.parseFloat(userInput)
      if (isNaN(amount) || amount <= 0) {
        setMessages((prev) => [
          ...prev,
          { role: "user", content: userInput },
          { role: "assistant", content: "Fadlan gali lacag sax ah (tusaale: 10.50)" },
        ])
        setInput("")
        return
      }

      setPaymentData((prev) => ({ ...prev, amount }))
      setMessages((prev) => [
        ...prev,
        { role: "user", content: `$${amount}` },
        {
          role: "assistant",
          content: `Xaqiijinta lacag bixinta:
📱 Telefoon: ${paymentData.phone}
💰 Lacagta: $${amount}
Lacag bixinta waa la bilaabayaa...`,
        },
      ])
      setInput("")

      // Process payment
      await processPayment(paymentData.phone, amount)
      return
    }

    // Check for payment keywords in regular chat
    const hasPaymentKeyword = checkForPaymentKeywords(userInput)

    // Show payment button if payment keywords detected and not in payment flow
    if (hasPaymentKeyword && paymentStep === "none") {
      // Extract order information first
      const orderInfo = extractOrderInfo()

      if (!orderInfo || orderInfo.items.length === 0) {
        setMessages((prev) => [
          ...prev,
          { role: "user", content: userInput },
          {
            role: "assistant",
            content:
              "Waan arkay inaad rabto inaad lacag bixiso, laakiin wax dalbasho ah ma jirto. Fadlan marka hore dalbo cunto ama cabitaan.",
          },
        ])
        setInput("")
        return
      }

      setShowPaymentButton(true)
      setMessages((prev) => [
        ...prev,
        { role: "user", content: userInput },
        {
          role: "assistant",
          content: "Waan arkay inaad rabto inaad lacag bixiso! Riix batoonka hoose si aad u bilowdo lacag bixinta.",
        },
      ])
      setInput("")
      return
    }

    const userMessage: ChatMessage = {
      role: "user",
      content: userInput,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      console.log("Sending message:", userMessage.content)
      const response = await generateResponse([...messages, userMessage])
      console.log("Received response:", response)

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.response,
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Check if response mentions payment
      if (checkForPaymentKeywords(response.response)) {
        // Only show payment button if we have order items
        const orderInfo = extractOrderInfo()
        if (orderInfo && orderInfo.items.length > 0) {
          setShowPaymentButton(true)
        }
      }

      // Check if the message indicates order completion
      if (response.response.toLowerCase().includes("diyaar u tahay inaad bixiso lacagta")) {
        const orderInfo = extractOrderInfo()
        if (orderInfo && orderInfo.items.length > 0) {
          setShowPaymentButton(true)
        }
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage = error instanceof Error ? error.message : "Fariin khalad ah"
      toast.error(errorMessage)

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Waan ka xumahay, khalad ayaa dhacay. Fadlan isku day mar kale.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 transition-all duration-300">
        <div className="bg-gradient-to-r from-[#FFA500] to-[#FFB84D] p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="text-white" />
              <h1 className="text-xl font-bold text-white">Geediga Dahabka - Dalabka Dhaqso ah</h1>
            </div>

            {currentOrder && currentOrder.items.length > 0 && (
              <div className="bg-white/20 rounded-full px-3 py-1 flex items-center gap-1">
                <ShoppingBag className="h-4 w-4 text-white" />
                <span className="text-white text-sm font-medium">${currentOrder.total.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="h-[600px] p-4 overflow-y-auto bg-white">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user" ? "bg-gradient-to-r from-[#FFA500] to-[#FFB84D] text-white" : "bg-gray-100"
                }`}
                dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
              />
            </div>
          ))}

          {/* Payment Button */}
          {showPaymentButton && paymentStep === "none" && currentOrder && currentOrder.items.length > 0 && (
            <div className="flex justify-center mb-4">
              <Button
                onClick={handlePaymentButtonClick}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 animate-pulse"
              >
                <CreditCard className="w-5 h-5" />
                Riix halkan si aad u bixiso ${currentOrder.total.toFixed(2)}
              </Button>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                paymentStep === "phone"
                  ? "Gali lambarka telefoonka..."
                  : paymentStep === "amount"
                    ? `Gali lacagta ($${currentOrder?.total?.toFixed(2) || "8.00"})...`
                    : "Qor fariintaada..."
              }
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={paymentStep === "processing"}
            />
            <Button
              type="submit"
              disabled={isLoading || paymentStep === "processing"}
              className="bg-gradient-to-r from-[#FFA500] to-[#FFB84D] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <SendHorizontal className="w-5 h-5" />
            </Button>
          </form>

          {paymentStep !== "none" && paymentStep !== "processing" && (
            <div className="mt-2 text-sm text-gray-600 text-center">
              {paymentStep === "phone" && "📱 Gali lambarka telefoonka"}
              {paymentStep === "amount" && `💰 Gali lacagta ($${currentOrder?.total?.toFixed(2) || "8.00"})`}
            </div>
          )}
        </div>

        {showMenu && <MenuDisplay isOpen={showMenu} onClose={() => setShowMenu(false)} items={menuItems} />}
      </DialogContent>
    </Dialog>
  )
}
