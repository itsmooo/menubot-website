export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  response: string;
  sources: Array<{
    content: string;
    score: number;
  }>;
}

const API_URL = 'http://127.0.0.1:5001/api/chat';  // Updated to use port 5001

export const generateResponse = async (messages: ChatMessage[]): Promise<ChatResponse> => {
  try {
    console.log('Sending request to:', API_URL);
    console.log('Request payload:', { messages });

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      throw new Error(data.detail || 'Server response was not ok');
    }

    return data;

  } catch (error) {
    console.error('Error details:', error);
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Could not connect to the server. Please make sure the backend is running.');
    }
    throw error;
  }
}; 