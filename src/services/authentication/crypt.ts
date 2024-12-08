import { argon2id } from '@noble/hashes/argon2'
import { randomBytes, bytesToHex } from '@noble/hashes/utils'

const CPU = 2;
const Memory = 14;
const Iteration = 8;
const Parallelization_Factor = 1;
const Derived_Key_Length = 32;

const Default_Length = 16;

export async function generateSalt(): Promise<string> {
  return Buffer.from(randomBytes(Default_Length)).toString('hex')
}

export async function hashPassword(data: string, salt: string) {
  const hash = argon2id(data, salt, { m: CPU ** Memory, p: Parallelization_Factor, dkLen: Derived_Key_Length, t: Iteration })
  return bytesToHex(hash)
}

export async function comparePassword(data: string, salt: string, encrypted: string): Promise<boolean> {
  const compared = await hashPassword(data, salt)
  return compared === encrypted;
}