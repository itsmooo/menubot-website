import { api } from '../api';

export interface Order {
  _id: string;
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
  conversation?: {
    message: string;
    response: string;
  };
  timestamp: string;
}

export const orderService = {
  // Get all orders
  getOrders: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>('/api/orders');
    return response.data;
  },

  // Get a single order
  getOrder: async (orderId: string): Promise<Order> => {
    const response = await api.get<Order>(`/api/orders/${orderId}`);
    return response.data;
  },

  // Update an order
  updateOrder: async (orderId: string, data: Partial<Order>): Promise<Order> => {
    const response = await api.put<Order>(`/api/orders/${orderId}`, data);
    return response.data;
  },

  // Delete an order
  deleteOrder: async (orderId: string): Promise<void> => {
    await api.delete(`/api/orders/${orderId}`);
  },

  // Update order status
  updateOrderStatus: async (orderId: string, status: string): Promise<Order> => {
    const response = await api.patch<Order>(`/api/orders/${orderId}/status`, { status });
    return response.data;
  }
}; 