import { NextResponse } from 'next/server'

// In-memory storage for messages (in production, use a database)
interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

// Use a global variable to persist data during development
const globalMessages: Message[] = globalThis.messages || [];
globalThis.messages = globalMessages;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create new message
    const newMessage: Message = {
      id: Date.now(),
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    };

    // Store the message
    globalMessages.push(newMessage);

    console.log('New message received:', newMessage);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message received successfully!',
        data: newMessage
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}