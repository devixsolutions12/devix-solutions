// Simple in-memory storage for contact form messages
// In production, this would be replaced with a database

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

// Use a global variable to ensure messages persist during development
// In production, this should be replaced with a database
declare global {
  var messages: Message[] | undefined;
}

const globalMessages: Message[] = globalThis.messages || [];
globalThis.messages = globalMessages;

export const addMessage = (message: Omit<Message, 'id' | 'timestamp'>): Message => {
  const newMessage: Message = {
    id: Date.now(),
    ...message,
    timestamp: new Date().toISOString()
  };
  
  globalMessages.push(newMessage);
  return newMessage;
};

export const getMessages = (): Message[] => {
  return globalMessages;
};

export const getMessageCount = (): number => {
  return globalMessages.length;
};

// For demo purposes only - in production you would never expose this
export const clearMessages = (): void => {
  globalMessages.length = 0;
};