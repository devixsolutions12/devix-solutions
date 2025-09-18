import { NextResponse } from 'next/server';
import { getMessages, getMessageCount } from '../../../../lib/messages';
import { verifyToken } from '../../../../lib/auth';

// GET endpoint to retrieve all messages
export async function GET(request: Request) {
  try {
    // Check for authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized: No token provided' },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid token' },
        { status: 401 }
      );
    }
    
    const messages = getMessages();
    
    return NextResponse.json({ 
      messages: messages,
      count: getMessageCount()
    }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}