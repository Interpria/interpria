import { NextRequest, NextResponse } from 'next/server';
import { sendPasswordResetEmail, findUserByEmail, savePasswordResetToken } from '@/app/lib/auth-utils';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }
  // Find user by email
  const user = await findUserByEmail(email);
  if (!user) {
    // Don't reveal if user exists
    return NextResponse.json({ success: true });
  }
  // Generate token
  const token = crypto.randomBytes(32).toString('hex');
  // Save token to DB (implement this function)
  await savePasswordResetToken(user.id, token);
  // Send email (implement this function)
  await sendPasswordResetEmail(email, token);
  return NextResponse.json({ success: true });
}
