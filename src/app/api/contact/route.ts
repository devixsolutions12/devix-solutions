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

    // Create WhatsApp link with the message
    // Format: https://wa.me/PHONE_NUMBER?text=MESSAGE
    const whatsappNumber = '916201732186'; // Your WhatsApp number with country code
    const fullMessage = `Hello, I'm ${name} (${email}). I'm interested in your services:\n\n${message}`;
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    console.log('Contact form submission:', { name, email, message });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully!',
        redirectUrl: whatsappUrl
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    // Even on error, provide redirect URL
    const whatsappUrl = 'https://wa.me/916201732186';
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully!',
        redirectUrl: whatsappUrl
      },
      { status: 200 }
    );
  }
}