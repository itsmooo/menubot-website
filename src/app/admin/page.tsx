import { OrderList } from '@/components/admin/OrderList';

export default function AdminPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <OrderList />
    </div>
  );
} 