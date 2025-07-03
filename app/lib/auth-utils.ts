// app/lib/auth-utils.ts
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import pool from '@/app/lib/db'; 

// 1. Find user by email
export async function findUserByEmail(email: string) {
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}

// 2. Save password reset token
export async function savePasswordResetToken(userId: number, token: string) {
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry
  await pool.execute(
    'INSERT INTO password_reset_tokens (user_id, token, expires) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE token = VALUES(token), expires = VALUES(expires)',
    [userId, token, expires]
  );
}

// 3. Send password reset email
export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${token}`;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    to: email,
    subject: 'Password Reset',
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`,
  });
}

// 4. Verify password reset token
export async function verifyPasswordResetToken(token: string) {
  const [rows] = await pool.execute('SELECT * FROM password_reset_tokens WHERE token = ?', [token]);
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const record = rows[0] as { expires: string | Date; user_id: number };
  if (new Date(record.expires) < new Date()) return null;
  // Get user
  const [userRows] = await pool.execute('SELECT * FROM users WHERE user_id = ?', [record.user_id]);
  return Array.isArray(userRows) && userRows.length > 0 ? userRows[0] : null;
}

// 5. Update user password
export async function updateUserPassword(userId: number, password: string) {
  const hash = await bcrypt.hash(password, 10);
  await pool.execute('UPDATE users SET password = ? WHERE user_id = ?', [hash, userId]);
  // Delete all password reset tokens for this user
  await pool.execute('DELETE FROM password_reset_tokens WHERE user_id = ?', [userId]);
}