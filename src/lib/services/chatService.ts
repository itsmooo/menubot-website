import { api } from '../api';

export interface ChatResponse {
  error: string | null;
  intent: string;
  confidence: number;
  translation: string;
  response: string;
}

export interface Order {
  customer: {
    name: string;
    phoneNumber: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  paymentStatus: string;
  timestamp: string;
}

export const chatService = {
  // Send message to chatbot
  sendMessage: async (message: string): Promise<ChatResponse> => {
    try {
      const response = await api.post('/api/chatbot/chat', { message });
      return response.data;
    } catch (error) {
      console.error('Chat service error:', error);
      throw error;
    }
  },

  // Get all orders - Note: This endpoint is not currently available in the backend
  // We'll keep the interface but comment out the implementation until the backend endpoint is ready
  getOrders: async (): Promise<Order[]> => {
    // TODO: Implement when backend endpoint is available
    return [];
  }
};