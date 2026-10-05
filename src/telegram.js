// ═══════════════════════════════════════════════════════════════════════════
// Интеграция с Telegram через Cloudflare Worker (прокси)
// ═══════════════════════════════════════════════════════════════════════════
//
// Почему Worker, а не напрямую api.telegram.org?
//   1. api.telegram.org периодически блокируется/троттлится провайдерами РФ
//      → заявки не доходят с браузера посетителя
//   2. Cloudflare Worker'ы не блокируются в РФ → всегда доступны
//   3. Worker делает запрос к Telegram со своей сети (вне РФ) → обход блокировки
//   4. BOT_TOKEN хранится как secret-переменная Cloudflare → его НЕТ в коде
//      сайта, никто не может его извлечь из собранного бандла
//
// Как настроить (один раз):
//   1. Зарегистрируйтесь на https://dash.cloudflare.com (бесплатно)
//   2. Workers & Pages → Create Worker → назовите "ekoteplo-telegram" → Deploy
//   3. Edit code → вставьте содержимое worker/telegram-proxy.js → Deploy
//   4. Settings → Variables and Secrets → Add:
//        BOT_TOKEN = <ваш токен от @BotFather>   (Mark as Secret)
//        CHAT_ID   = <ваш chat_id от @userinfobot>
//   5. Скопируйте URL Worker'а: https://ekoteplo-telegram.<your-subdomain>.workers.dev
//   6. Вставьте URL ниже в workerUrl
// ═══════════════════════════════════════════════════════════════════════════

// ─── НАСТРОЙКА ─────────────────────────────────────────────────────────────
// Вставьте URL вашего Cloudflare Worker'а (см. инструкцию выше).
// Пока стоит PLACEHOLDER — форма будет показывать понятную ошибку.
export const TELEGRAM_CONFIG = {
  workerUrl: "https://ekoteplo-telegram.idbratchikov-019.workers.dev", // пример: https://ekoteplo-telegram.abc123.workers.dev
};

// ─── ОТПРАВКА СООБЩЕНИЯ ─────────────────────────────────────────────────────
// Отправляет данные формы в Cloudflare Worker, который уже сам шлёт их в Telegram.
export async function sendToTelegram({
  name,
  phone,
  message,
  hp = "",
  source = "Сайт ЭкоТепло",
}) {
  const { workerUrl } = TELEGRAM_CONFIG;

  if (!workerUrl || workerUrl.includes("PASTE_YOUR")) {
    throw new Error(
      "Cloudflare Worker не настроен: заполните workerUrl в src/telegram.js",
    );
  }

  const res = await fetch(workerUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, message, hp, source }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error(`Сервер вернул неожиданный ответ (HTTP ${res.status})`);
  }

  if (!data.ok) {
    throw new Error(data.error || `Ошибка Worker'а (HTTP ${res.status})`);
  }

  return data;
}
