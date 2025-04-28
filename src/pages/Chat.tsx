
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SendHorizontal, MessageCircle } from "lucide-react";

const Chat = () => {
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
    <div className="min-h-screen bg-gradient-to-r from-[#FFF4E5] to-[#FFE0B2]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="max-w-3xl mx-auto shadow-lg">
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
                  className={`max-w-[80%] p-3 rounded-lg ${
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
        </Card>
      </div>
    </div>
  );
};

export default Chat;
