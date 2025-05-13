import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService, Order } from '@/lib/services/orderService';
import { toast } from 'sonner';

export const useOrders = () => {
  const queryClient = useQueryClient();

  const orders = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: orderService.getOrders,
  });

  const updateOrder = useMutation({
    mutationFn: ({ orderId, data }: { orderId: string; data: Partial<Order> }) =>
      orderService.updateOrder(orderId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update order');
      console.error('Update error:', error);
    },
  });

  const deleteOrder = useMutation({
    mutationFn: orderService.deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete order');
      console.error('Delete error:', error);
    },
  });

  const updateOrderStatus = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      orderService.updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order status updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update order status');
      console.error('Status update error:', error);
    },
  });

  return {
    orders,
    updateOrder,
    deleteOrder,
    updateOrderStatus,
  };
}; 