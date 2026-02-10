import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function genHash(password: string): Promise<string> {
<<<<<<< HEAD
  return await bcrypt.hash(password, SALT_ROUNDS);
}
export async function compare(
  hash: string,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
=======
    return await bcrypt.hash(password, SALT_ROUNDS);
}
export async function compare(
    hash: string,
    password: string
): Promise<boolean> {
    return bcrypt.compare(password, hash);
>>>>>>> 14517d659aaf62f7cd84f27eff603630d000d39e
}



export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

