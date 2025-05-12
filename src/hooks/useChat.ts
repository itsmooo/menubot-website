import { useMutation } from '@tanstack/react-query';
import { chatService, ChatResponse } from '@/lib/services/chatService';

export const useChat = () => {
  const sendMessage = useMutation({
    mutationFn: chatService.sendMessage,
  });

  return {
    sendMessage,
  };
}; 