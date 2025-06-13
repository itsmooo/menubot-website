export interface Order {
  _id: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  message?: string;
  response?: string;
  timestamp?: string;
  user?: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
