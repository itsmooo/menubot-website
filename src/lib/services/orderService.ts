import { api } from '../api';

export interface Order {
  _id: string;
  message: string;
  response: string;
  timestamp: string;
}

export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    try {
      const response = await api.get<Order[]>('/api/orders');
      console.log('Raw API response:', response);
      
      // Ensure we're getting the correct data structure
      const orders = Array.isArray(response.data) ? response.data : [response.data];
      
      // Map and validate each order
      return orders.map(order => ({
        _id: order._id || '',
        message: order.message || '',
        response: order.response || '',
        timestamp: order.timestamp || new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }
};