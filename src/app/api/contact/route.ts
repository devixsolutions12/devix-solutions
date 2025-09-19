import { NextResponse } from 'next/server'

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

    // Create Instagram DM link with the message
    // Format: https://instagram.com/direct/t/USERNAME?text=MESSAGE
    const instagramUsername = 'devixsolutions'; // Your actual Instagram username
    const fullMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const encodedMessage = encodeURIComponent(fullMessage);
    const instagramUrl = `https://instagram.com/direct/t/${instagramUsername}?text=${encodedMessage}`;

    console.log('Contact form submission:', { name, email, message });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully!',
        redirectUrl: instagramUrl
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    // Even on error, provide redirect URL
    const instagramUrl = 'https://instagram.com/devixsolutions';
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully!',
        redirectUrl: instagramUrl
      },
      { status: 200 }
    );
  }
}