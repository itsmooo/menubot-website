import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from 'sonner';

interface PaymentFormProps {
  orderId: string;
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PaymentForm({ orderId, amount, onSuccess, onCancel }: PaymentFormProps) {
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Process payment
      const paymentResponse = await fetch('http://localhost:3000/api/payment/hormuud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          phone,
          amount
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Payment failed');
      }

      const paymentData = await paymentResponse.json();

      // Update order payment status
      const orderResponse = await fetch(`http://localhost:3000/api/orders/${orderId}/payment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          phone,
          transactionId: paymentData.transactionId || Date.now().toString()
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to update order status');
      }

      toast.success('Payment successful!');
      onSuccess();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount to Pay</label>
            <div className="text-lg font-bold">${amount.toFixed(2)}</div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number for Payment</label>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isProcessing}
              className="flex-1"
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
