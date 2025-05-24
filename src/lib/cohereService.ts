export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const API_URL = 'http://127.0.0.1:5000/api/chatbot/chat';

export const generateSomaliResponse = async (messages: ChatMessage[]) => {
  try {
    const userMessage = messages[messages.length - 1];
    
    if (!userMessage || !userMessage.content) {
      throw new Error('No message content provided');
    }

    console.log('Sending request to:', API_URL);
    console.log('Request payload:', { message: userMessage.content });

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage.content
      }),
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Server response was not ok');
    }

    if (!data.success || !data.response) {
      throw new Error('Invalid response format from server');
    }

    return data.response;

  } catch (error) {
    console.error('Error details:', error);
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Could not connect to the server. Please make sure the backend is running.');
    }
    throw error;
  }
}; 