
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SendHorizontal, MessageCircle } from "lucide-react";

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatDialog = ({ isOpen, onClose }: ChatDialogProps) => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! What would you like to order today?", isUser: false }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput("");
      // Simulated response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "Thank you for your order request! Our team will process it shortly.", 
          isUser: false 
        }]);
      }, 1000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2">
        <div className="bg-gradient-to-r from-[#FFA500] to-[#FFB84D] p-4 rounded-t-lg">
          <div className="flex items-center gap-2">
            <MessageCircle className="text-white" />
            <h1 className="text-xl font-bold text-white">Quick Order Chat</h1>
          </div>
        </div>
        
        <div className="h-[600px] p-4 overflow-y-auto bg-white">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg animate-in slide-in-from-bottom-1 duration-300 ${
                  message.isUser
                    ? 'bg-gradient-to-r from-[#FFA500] to-[#FFB84D] text-white'
                    : 'bg-gray-100'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t bg-white rounded-b-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your order here..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Button 
              onClick={handleSend}
              className="bg-gradient-to-r from-[#FFA500] to-[#FFB84D] hover:opacity-90"
            >
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
