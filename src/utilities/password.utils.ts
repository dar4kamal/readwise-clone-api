import { randomBytes, scryptSync } from 'crypto';

export const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 32).toString('hex')}`;
};

export const checkPassword = (password: string, hash: string) => {
  const [salt, key] = hash.split(':');
  const hashed = scryptSync(password, salt, 32).toString('hex');
  return key == hashed;
};
