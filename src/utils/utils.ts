import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function genHash(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
}
export async function compare(
    hash: string,
    password: string
): Promise<boolean> {
    return bcrypt.compare(password, hash);
}



export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

