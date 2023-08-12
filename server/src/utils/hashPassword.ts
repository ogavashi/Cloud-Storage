import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string) =>
  bcrypt.hash(password, Number(process.env.SALT));
