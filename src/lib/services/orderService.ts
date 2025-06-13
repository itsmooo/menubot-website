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
      console.log('Fetching orders...');
      // Use the admin-specific endpoint for fetching all orders
      const response = await api.get('/order');
      console.log('Raw orders response:', response.data);
      return response.data.map((order: any) => ({
        _id: order._id,
        items: order.items,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt,
        message: order.message,
        response: order.response,
        timestamp: order.timestamp,
        user: order.user
      }));
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },
  
  updateOrder: async (orderId: string, data: Partial<Order>): Promise<Order> => {
    try {
      console.log(`Updating order ${orderId} with data:`, data);
      const response = await api.put(`/order/${orderId}`, {
        status: data.status
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating order ${orderId}:`, error);
      throw error;
    }
  },
  
  updatePaymentStatus: async (orderId: string, paymentStatus: string): Promise<Order> => {
    try {
      console.log(`Updating payment status for order ${orderId} to ${paymentStatus}`);
      const response = await api.put(`/order/${orderId}/payment`, {
        paymentStatus
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating payment status for order ${orderId}:`, error);
      throw error;
    }
  },
};