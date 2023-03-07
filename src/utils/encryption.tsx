import crypto from "crypto";

interface Props {
  text: string;
  key?: Buffer;
  iv?: Buffer;
}

// const myKey = crypto.randomBytes(32).toString("hex");
// const myIV = crypto.randomBytes(16);

const myKey = Buffer.from(
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  "hex"
); // 32-byte key buffer
const myIV = crypto.randomBytes(16);

export function encryptString({ text, key = myKey, iv = myIV }: Props) {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decryptString({ text, key = myKey, iv = myIV }: Props) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
