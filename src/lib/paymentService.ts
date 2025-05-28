interface PaymentRequest {
  accountNo: string;
  amount: number;
  description: string;
  referenceId: string;
  invoiceId: string;
}

interface PaymentResponse {
  success: boolean;
  message: string;
  transactionId?: string;
}

export const processHormuudPayment = async (request: PaymentRequest): Promise<PaymentResponse> => {
  try {
    // Replace with actual Hormuud API endpoint
    const HORMUUD_API_URL = 'https://api.hormuud.com/payment';
    const API_KEY = process.env.HORMUUD_API_KEY;

    const response = await fetch(HORMUUD_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        phoneNumber: request.accountNo,
        amount: request.amount,
        description: request.description,
        referenceId: request.referenceId,
        invoiceId: request.invoiceId,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Payment processed successfully',
        transactionId: data.transactionId,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Payment failed',
      };
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      message: 'An error occurred while processing the payment',
    };
  }
};
