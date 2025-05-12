import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { menuService, MenuItem, MenuCategory } from '@/lib/services/menuService';

export const useMenu = () => {
  const queryClient = useQueryClient();

  const categories = useQuery<MenuCategory[]>({
    queryKey: ['menuCategories'],
    queryFn: menuService.getCategories,
  });

  const allItems = useQuery<MenuItem[]>({
    queryKey: ['menuItems'],
    queryFn: menuService.getAllItems,
  });

  const createItem = useMutation({
    mutationFn: menuService.createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      queryClient.invalidateQueries({ queryKey: ['menuCategories'] });
    },
  });

  const updateItem = useMutation({
    mutationFn: ({ id, item }: { id: string; item: Partial<MenuItem> }) =>
      menuService.updateItem(id, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      queryClient.invalidateQueries({ queryKey: ['menuCategories'] });
    },
  });

  const deleteItem = useMutation({
    mutationFn: menuService.deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      queryClient.invalidateQueries({ queryKey: ['menuCategories'] });
    },
  });

  return {
    categories,
    allItems,
    createItem,
    updateItem,
    deleteItem,
  };
}; 