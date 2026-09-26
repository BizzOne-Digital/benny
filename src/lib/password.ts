import { hash, verify } from 'argon2'

export async function hashPassword(password: string): Promise<string> {
  return hash(password, {
    type: 2, // argon2id
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  })
}

export async function verifyPassword(
  hashedPassword: string,
  plainPassword: string
): Promise<boolean> {
  try {
    return await verify(hashedPassword, plainPassword)
  } catch (error) {
    console.error('Password verification error:', error)
    return false
  }
}
