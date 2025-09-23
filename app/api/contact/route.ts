import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  role: z.string().optional(),
  email: z.string().email('Invalid email address.'),
  pharmacy: z.string().min(2, 'Pharmacy name is required.'),
  country: z.string().optional(),
  message: z.string().optional(),
  wantsDemo: z.boolean(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedData = contactSchema.parse(body);

    console.log('Received new contact submission:', parsedData);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true, 
      message: "Thank you! We'll be in touch shortly." 
    }, { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: 'Validation failed.', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'An unexpected error occurred.' }, { status: 500 });
  }
}