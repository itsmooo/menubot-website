import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/lib/services/orderService';
import { Order } from '@/lib/services/orderService';

export const useOrders = () => {
  return useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await orderService.getOrders();
      // Add more detailed logging
      console.log('Raw API Response:', response);
      console.log('Response type:', typeof response);
      console.log('Is Array:', Array.isArray(response));
      return Array.isArray(response) ? response : [response];
    },
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 30,
  });
};