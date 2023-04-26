import { v4 as uuidv4 } from 'uuid';

export function generateToken(): string {
  const token = uuidv4().substr(0, 15);
  return token;
}