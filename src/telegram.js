const DEFAULT_SOURCE =
  "\u0421\u0430\u0439\u0442 \u042d\u043a\u043e\u0422\u0435\u043f\u043b\u043e";

export const TELEGRAM_CONFIG = {
  workerUrl: "https://ekoteplo-telegram.idbratchikov-019.workers.dev",
};

export async function sendToTelegram({
  name,
  phone,
  message,
  hp = "",
  source = DEFAULT_SOURCE,
}) {
  const { workerUrl } = TELEGRAM_CONFIG;

  if (!workerUrl || workerUrl.includes("PASTE_YOUR")) {
    throw new Error(
      "Cloudflare Worker \u043d\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d: \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 workerUrl \u0432 src/telegram.js",
    );
  }

  const bodyStr = JSON.stringify({ name, phone, message, hp, source });
  const bodyBytes = new TextEncoder().encode(bodyStr);

  const res = await fetch(workerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: bodyBytes,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error(
      `\u0421\u0435\u0440\u0432\u0435\u0440 \u0432\u0435\u0440\u043d\u0443\u043b \u043d\u0435\u043e\u0436\u0438\u0434\u0430\u043d\u043d\u044b\u0439 \u043e\u0442\u0432\u0435\u0442 (HTTP ${res.status})`,
    );
  }

  if (!data.ok) {
    throw new Error(data.error || `Worker error (HTTP ${res.status})`);
  }

  return data;
}
