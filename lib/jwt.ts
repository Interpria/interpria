import { SignJWT, jwtVerify } from 'jose';

// Define the structure of our JWT payload
export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
}

// Secret key for JWT - should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const secret = new TextEncoder().encode(JWT_SECRET);

// Function to create a JWT token
export async function createToken(payload: JWTPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(secret);
}

// Function to verify and decode a JWT token
export async function verifyToken(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as JWTPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid token');
  }
}

// Function to check if user is admin
export async function isAdmin(token: string): Promise<boolean> {
  try {
    const decoded = await verifyToken(token);
    const isAdminUser = decoded.role === 'admin';
    return isAdminUser;
  } catch (error) {
    return false;
  }
} 