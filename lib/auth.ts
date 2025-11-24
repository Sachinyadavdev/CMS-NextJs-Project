import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (userId: string, email: string, isAdmin: boolean): string => {
  return jwt.sign(
    { userId, email, isAdmin },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
};

export const verifyToken = (token: string): { userId: string; email: string; isAdmin: boolean } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return { userId: decoded.userId, email: decoded.email, isAdmin: decoded.isAdmin };
  } catch (error) {
    return null;
  }
};

export const getTokenFromCookie = (cookieString: string): string | null => {
  const cookies = cookieString.split(';').reduce((acc: any, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});
  return cookies.token || null;
};
