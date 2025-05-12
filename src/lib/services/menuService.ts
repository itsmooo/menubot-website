import { api } from '../api';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export const menuService = {
  // Get all menu categories
  getCategories: async () => {
    const response = await api.get<MenuCategory[]>('/api/menu/categories');
    return response.data;
  },

  // Get menu items by category
  getItemsByCategory: async (categoryId: string) => {
    const response = await api.get<MenuItem[]>(`/api/menu/categories/${categoryId}/items`);
    return response.data;
  },

  // Get all menu items
  getAllItems: async () => {
    const response = await api.get<MenuItem[]>('/api/menu/items');
    return response.data;
  },

  // Create a new menu item
  createItem: async (item: Omit<MenuItem, 'id'>) => {
    const response = await api.post<MenuItem>('/api/menu/items', item);
    return response.data;
  },

  // Update a menu item
  updateItem: async (id: string, item: Partial<MenuItem>) => {
    const response = await api.put<MenuItem>(`/api/menu/items/${id}`, item);
    return response.data;
  },

  // Delete a menu item
  deleteItem: async (id: string) => {
    await api.delete(`/api/menu/items/${id}`);
  },
}; 