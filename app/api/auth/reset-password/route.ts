import { NextRequest, NextResponse } from 'next/server';
import { verifyPasswordResetToken, updateUserPassword } from '@/app/lib/auth-utils';

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();
  if (!token || !password) {
    return NextResponse.json({ error: 'Token and password are required' }, { status: 400 });
  }
  // Verify token and get user
  const userResult = await verifyPasswordResetToken(token);
  const user =
    Array.isArray(userResult) && userResult.length > 0
      ? userResult[0]
      : userResult;

  // Type guard to check if user has an 'id' property
  if (!user || typeof user !== 'object' || !('id' in user)) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }
  // Update password (implement this function)
  await updateUserPassword(user.id, password);
  return NextResponse.json({ success: true });
}
