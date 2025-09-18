// Simple authentication utility for admin panel
// In production, this should be replaced with a proper authentication system

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'devix2025'; // In production, use environment variables

export const authenticate = (username: string, password: string): boolean => {
  // In a real application, you would hash passwords and use a database
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
};

// For demo purposes, we're using a simple token system
// In production, use JWT or session-based authentication
export const generateToken = (): string => {
  return Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`).toString('base64');
};

export const verifyToken = (token: string): boolean => {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = decoded.split(':');
    return authenticate(username, password);
  } catch {
    return false;
  }
};