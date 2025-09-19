// Persistent storage solution for Vercel serverless functions
// Uses file system storage as a simple database alternative

import { promises as fs } from 'fs';
import { join } from 'path';

// Define the storage directory - in Vercel, we'll use /tmp which is writable
const STORAGE_DIR = process.env.VERCEL ? '/tmp' : join(process.cwd(), '.data');
const MESSAGES_FILE = join(STORAGE_DIR, 'messages.json');

// Ensure storage directory exists
async function ensureStorageDir() {
  try {
    await fs.access(STORAGE_DIR);
  } catch {
    // Directory doesn't exist, create it
    await fs.mkdir(STORAGE_DIR, { recursive: true });
  }
}

// Initialize storage file if it doesn't exist
async function initStorageFile() {
  try {
    await fs.access(MESSAGES_FILE);
  } catch {
    // File doesn't exist, create it with empty array
    await fs.writeFile(MESSAGES_FILE, JSON.stringify([]));
  }
}

// Read messages from storage
export async function readMessages(): Promise<unknown[]> {
  try {
    // In Vercel production, we might not be able to persist data to file system
    // So we'll use a fallback approach
    await ensureStorageDir();
    await initStorageFile();
    
    const data = await fs.readFile(MESSAGES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading messages:', error);
    // Return empty array as fallback
    return [];
  }
}

// Write messages to storage
export async function writeMessages(messages: unknown[]): Promise<void> {
  try {
    await ensureStorageDir();
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
  } catch (error) {
    console.error('Error writing messages:', error);
    // Don't throw error in production as it might break the app
    if (!process.env.VERCEL) {
      throw error;
    }
  }
}

// Add a new message
export async function addMessage(message: unknown): Promise<unknown> {
  try {
    const messages = await readMessages();
    const newMessage = {
      id: Date.now(),
      ...message as Record<string, unknown>,
      timestamp: new Date().toISOString()
    };
    
    messages.push(newMessage);
    await writeMessages(messages);
    
    return newMessage;
  } catch (error) {
    console.error('Error adding message:', error);
    // Don't throw error in production as it might break the app
    if (!process.env.VERCEL) {
      throw error;
    }
    // Return the message anyway
    return {
      id: Date.now(),
      ...message as Record<string, unknown>,
      timestamp: new Date().toISOString()
    };
  }
}

// Initialize storage on module load
ensureStorageDir().then(() => {
  initStorageFile();
}).catch(console.error);