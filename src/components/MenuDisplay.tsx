"use client"

import { useState } from "react"
import { processHormuudPayment } from "@/lib/paymentService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Utensils, Coffee, IceCream, Sandwich, ShoppingCart } from "lucide-react"
import { toast } from "sonner"

interface MenuItem {
  name: string
  price: string
  description: string
  category: string
}

interface MenuDisplayProps {
  items: MenuItem[]
  onClose: () => void
}

export function MenuDisplay({ items, onClose }: MenuDisplayProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleOrder = async (item: MenuItem) => {
    setSelectedItem(item)
  }

  const processPayment = async () => {
    if (!phoneNumber.trim() || !selectedItem) {
      toast.error("Fadlan geli lambarka teleefanka saxda ah")
      return
    }

    // Validate phone number format
    const phoneRegex = /^252[0-9]{9}$/
    if (!phoneRegex.test(phoneNumber.replace(/\s+/g, ""))) {
      toast.error("Lambarka teleefanka waa inuu bilaabmaa 252 oo uu yahay 12 lambar")
      return
    }

    setIsProcessing(true)

    try {
      const paymentRequest = {
        accountNo: phoneNumber.replace(/\s+/g, ""),
        amount: Number.parseFloat(selectedItem.price.replace("$", "")),
        description: `Order for ${selectedItem.name} - Geediga Dahabka Restaurant`,
        referenceId: `ORDER-${Date.now()}`,
        invoiceId: `INV-${Date.now()}`,
      }

      const result = await processHormuudPayment(paymentRequest)

      if (result.success) {
        toast.success("Lacag bixintu wey dhammaatay! Dalabkaaga waa la diyaargaraynayaa.")
        setSelectedItem(null)
        setPhoneNumber("")
        // Don't close the menu, just the payment modal
      } else {
        toast.error(result.message || "Lacag bixintu way fashilantay. Fadlan isku day mar kale.")
      }
    } catch (error) {
      toast.error("Cilad ayaa ka timid lacag bixinta. Fadlan isku day mar kale.")
      console.error("Payment error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    const lowerCategory = category.toLowerCase()
    if (
      lowerCategory.includes("drink") ||
      lowerCategory.includes("beverage") ||
      lowerCategory.includes("shake") ||
      lowerCategory.includes("iced")
    ) {
      return <Coffee className="w-5 h-5 text-blue-500" />
    }
    if (lowerCategory.includes("dessert") || lowerCategory.includes("sweet")) {
      return <IceCream className="w-5 h-5 text-pink-500" />
    }
    if (lowerCategory.includes("fast") || lowerCategory.includes("burger")) {
      return <Sandwich className="w-5 h-5 text-red-500" />
    }
    return <Utensils className="w-5 h-5 text-orange-500" />
  }

  // Group items by category
  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, MenuItem[]>,
  )

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b bg-white flex items-center justify-between shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Geediga Dahabka Menu</h2>
          <p className="text-sm text-gray-600">{items.length} items available</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 hover:bg-gray-100">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Category Navigation */}
      <div className="p-4 bg-white border-b">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.keys(groupedItems).map((category) => (
            <button
              key={category}
              onClick={() => {
                const element = document.getElementById(`category-${category}`)
                element?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className="flex items-center gap-2 px-3 py-2 bg-orange-100 text-orange-600 rounded-full whitespace-nowrap hover:bg-orange-200 transition-colors text-sm font-medium"
            >
              {getCategoryIcon(category)}
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} id={`category-${category}`} className="space-y-3">
              {/* Category Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                {getCategoryIcon(category)}
                <h3 className="font-bold text-lg text-gray-800">{category}</h3>
                <span className="text-sm text-gray-500">({categoryItems.length} items)</span>
              </div>

              {/* Menu Items */}
              <div className="grid gap-3">
                {categoryItems.map((item, index) => (
                  <div
                    key={`${category}-${index}`}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:border-orange-200"
                  >
                    {/* Item Header */}
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900 flex-1 pr-2 leading-tight">{item.name}</h4>
                      <span className="font-bold text-orange-600 text-lg whitespace-nowrap">{item.price}</span>
                    </div>

                    {/* Item Description */}
                    {item.description && (
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{item.description}</p>
                    )}

                    {/* Order Button */}
                    <Button
                      onClick={() => handleOrder(item)}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Dalbo Hadda
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t bg-white">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">
            📞 For orders: <span className="font-medium">+252 61 1499124</span>
          </p>
          <p className="text-xs text-gray-500">💳 We accept Hormuud EVC Plus payments</p>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Dhammaystir Dalabkaaga</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)} className="h-8 w-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingCart className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-700">Dalabkaaga:</span>
                </div>
                <h4 className="font-semibold text-gray-800 text-lg">{selectedItem.name}</h4>
                <p className="text-2xl font-bold text-orange-600 mt-1">{selectedItem.price}</p>
                <p className="text-gray-600 text-sm mt-2">{selectedItem.description}</p>
              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Geli lambarka Hormuud EVC Plus:
                  </label>
                  <Input
                    type="tel"
                    placeholder="252615557890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    disabled={isProcessing}
                  />
                  <p className="text-xs text-gray-500 mt-1">Lambarka waa inuu bilaabmaa 252 (Tusaale: 252615557890)</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => setSelectedItem(null)}
                    variant="outline"
                    className="flex-1 py-3 font-medium"
                    disabled={isProcessing}
                  >
                    Ka noqo
                  </Button>
                  <Button
                    onClick={processPayment}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isProcessing || !phoneNumber.trim()}
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Waa la bixinayaa...
                      </div>
                    ) : (
                      <>💳 Bixi Hormuud</>
                    )}
                  </Button>
                </div>
              </div>

              {/* Security Note */}
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-700">
                  🔒 Lacag bixintaadu waa ammaan. Waxaad heli doontaa SMS xaqiijin ah.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
