import { NextResponse } from 'next/server';
import { authenticate, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    if (authenticate(username, password)) {
      const token = generateToken();
      return NextResponse.json(
        { 
          success: true, 
          message: 'Login successful',
          token 
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error processing login:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}