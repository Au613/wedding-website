import { Rest } from "ably";
import { ABLY_CHANNEL } from "@/lib/ably-events";

function isApiKey(value?: string) {
  return Boolean(value && value.includes(":") && !value.startsWith("eyJ"));
}

export function ablyChannelName() {
  return process.env.ABLY_CHANNEL || ABLY_CHANNEL;
}

function rootKey() {
  return process.env.ABLY_ROOT_KEY;
}

function subKey() {
  return process.env.ABLY_SUB_KEY;
}

export function createAblyRest() {
  const key = rootKey();
  if (!isApiKey(key)) {
    throw new Error("ABLY_ROOT_KEY is missing or is not an Ably API key");
  }
  return new Rest({ key });
}

export function createGuestTokenRest() {
  const key = isApiKey(subKey()) ? subKey() : rootKey();
  if (!isApiKey(key)) {
    throw new Error("ABLY_SUB_KEY or ABLY_ROOT_KEY is required to mint guest tokens");
  }
  return new Rest({ key: key as string });
}

export async function mintGuestTokenRequest(clientId?: string) {
  const channel = ablyChannelName();
  const ttl = 60 * 60 * 1000;
  const safeClientId =
    clientId && /^[A-Za-z0-9._:-]{1,64}$/.test(clientId) && !clientId.includes("*") ? clientId : undefined;
  const attempts = [
    { rest: createGuestTokenRest(), capability: { [channel]: ["subscribe", "presence"] } },
    { rest: createAblyRest(), capability: { [channel]: ["subscribe", "presence"] } },
    { rest: createAblyRest(), capability: { [channel]: ["subscribe"] } },
  ];

  let lastError: unknown;
  for (const attempt of attempts) {
    try {
      return await attempt.rest.auth.createTokenRequest({
        capability: attempt.capability,
        ttl,
        ...(safeClientId ? { clientId: safeClientId } : {}),
      });
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

export async function publishAbly(name: string, data: unknown) {
  const rest = createAblyRest();
  await rest.channels.get(ablyChannelName()).publish(name, data);
}
