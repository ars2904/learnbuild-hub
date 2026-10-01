// Standard Web Crypto API-based JWT implementation for Next.js Edge & Node.js runtimes

function base64urlEncode(arr: Uint8Array): string {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += String.fromCharCode(arr[i]);
  }
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64urlDecode(str: string): Uint8Array {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

const DEFAULT_SECRET = process.env.JWT_SECRET || "learnbuild_hub_jwt_super_secret_key_2026_x89f!";

async function getHmacKey(secretStr: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(secretStr),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Sign a payload with HMAC-SHA256 and return a valid JWT token string.
 * Default expiration: 24 hours (86,400 seconds).
 */
export async function signJwt(payload: JwtPayload, expiresInSeconds = 86400): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: JwtPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const enc = new TextEncoder();
  const headerB64 = base64urlEncode(enc.encode(JSON.stringify(header)));
  const payloadB64 = base64urlEncode(enc.encode(JSON.stringify(fullPayload)));
  const dataToSign = enc.encode(`${headerB64}.${payloadB64}`);

  const key = await getHmacKey(DEFAULT_SECRET);
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, dataToSign);
  const signatureB64 = base64urlEncode(new Uint8Array(signatureBuffer));

  return `${headerB64}.${payloadB64}.${signatureB64}`;
}

/**
 * Verify a JWT token string using HMAC-SHA256.
 * Returns the decoded JwtPayload if valid, or null if signature/expiration fails.
 */
export async function verifyJwt(token: string): Promise<JwtPayload | null> {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [headerB64, payloadB64, signatureB64] = parts;
  const enc = new TextEncoder();
  const dataToVerify = enc.encode(`${headerB64}.${payloadB64}`);
  const signatureBytes = base64urlDecode(signatureB64);

  try {
    const key = await getHmacKey(DEFAULT_SECRET);
    const isValid = await crypto.subtle.verify("HMAC", key, signatureBytes.buffer as ArrayBuffer, dataToVerify);
    if (!isValid) return null;

    const payloadJson = new TextDecoder().decode(base64urlDecode(payloadB64));
    const payload: JwtPayload = JSON.parse(payloadJson);

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null; // Expired token
    }

    return payload;
  } catch (err) {
    return null;
  }
}
