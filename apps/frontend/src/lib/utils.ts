import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getJWTpayload(jwt: string | undefined) {
  if (!jwt) {
    return null;
  }
  const jwtParts = jwt.split(".");
  const payloadSegment = jwtParts[1];
  const base64Payload = payloadSegment.replace(/-/g, "+").replace(/_/g, "/");
  const decodedPayload = Buffer.from(base64Payload, "base64").toString("utf-8");
  const payload = JSON.parse(decodedPayload);
  return payload;
}

export async function shuffle(array: any[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}
