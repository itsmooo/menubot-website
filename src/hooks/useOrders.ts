import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/lib/services/orderService';
import type { Order } from '@/types';
import { toast } from 'sonner';

export const useOrders = () => {
  const queryClient = useQueryClient();
  
  // Query for fetching orders
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: orderService.getOrders,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 30,
  });
  
  // Mutation for updating order status
  const updateOrderMutation = useMutation({
    mutationFn: ({ orderId, data }: { orderId: string; data: Partial<Order> }) => 
      orderService.updateOrder(orderId, data),
    onSuccess: () => {
      // Invalidate and refetch orders query after update
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order updated successfully');
    },
    onError: (error) => {
      console.error('Error updating order:', error);
      toast.error('Failed to update order');
    },
  });

  // Mutation for updating payment status
  const updatePaymentStatusMutation = useMutation({
    mutationFn: ({ orderId, paymentStatus }: { orderId: string; paymentStatus: string }) => 
      orderService.updatePaymentStatus(orderId, paymentStatus),
    onSuccess: () => {
      // Invalidate and refetch orders query after update
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Payment status updated successfully');
    },
    onError: (error) => {
      console.error('Error updating payment status:', error);
      toast.error('Failed to update payment status');
    },
  });
};