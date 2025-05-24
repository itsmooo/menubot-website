import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SendHorizontal, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { generateSomaliResponse, ChatMessage } from "@/lib/cohereService";

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatDialog({ isOpen, onClose }: ChatDialogProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Salaam! Ku soo dhawoow **Somali Delights**! Maxaad dalbanaysaa maanta?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatMessage = (content: string) => {
    // Replace **text** with bold styling
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Replace *text* with special offer styling
    content = content.replace(/\*(.*?)\*/g, '<span class="text-orange-500">$1</span>');
    return content;
  };

  const handleSend = async () => {
    if (!input.trim()) {
      toast.error("Fadlan qor fariin");
      return;
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      console.log('Sending message:', userMessage.content);
      const response = await generateSomaliResponse([...messages, userMessage]);
      console.log('Received response:', response);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (input.toLowerCase().includes("bixiyay lacagta")) {
        toast.success("Dalabkaaga waa la xaqiijiyay! Mahadsanid.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = error instanceof Error ? error.message : "Fariin khalad ah";
      toast.error(errorMessage);
      
      setMessages(prev => [...prev, { 
        role: 'assistant',
        content: "Waan ka xumahay, khalad ayaa dhacay. Fadlan isku day mar kale." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 transition-all duration-300">
        <div className="bg-gradient-to-r from-[#FFA500] to-[#FFB84D] p-4 rounded-t-lg">
          <div className="flex items-center gap-2">
            <MessageCircle className="text-white" />
            <h1 className="text-xl font-bold text-white">Somali Delights - Dalabka Dhaqso ah</h1>
          </div>
        </div>
        
        <div className="h-[600px] p-4 overflow-y-auto bg-white">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-[#FFA500] to-[#FFB84D] text-white'
                    : 'bg-gray-100'
                }`}
                dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
              />
            </div>
          ))}
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
        
        <div className="p-4 border-t bg-white rounded-b-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Fariintaaga ku qor halkan..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSend}
              className="bg-gradient-to-r from-[#FFA500] to-[#FFB84D] hover:opacity-90"
              disabled={isLoading}
            >
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
