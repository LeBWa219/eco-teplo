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
//        botToken = <ваш токен от @BotFather>   (Mark as Secret)
//        chatId   = <ваш chat_id от @userinfobot>
//   5. Скопируйте URL Worker'а: https://ekoteplo-telegram.<your-subdomain>.workers.dev
//   6. Вставьте URL ниже в workerUrl
//
// ВАЖНО: Все кириллические строки в этом файле записаны Unicode-escape
// последовательностями (\u0421\u0430\u0439\u0442 = "Сайт"), чтобы файл был
// 100% ASCII. Так он не сломается, если вы откроете его в Блокноте Windows
// (который по умолчанию сохраняет в Windows-1251 вместо UTF-8).
// ═══════════════════════════════════════════════════════════════════════════

// "Сайт ЭкоТепло" в виде \u-escape — устойчиво к любой кодировке файла
const DEFAULT_SOURCE =
  "\u0421\u0430\u0439\u0442 \u042d\u043a\u043e\u0422\u0435\u043f\u043b\u043e";

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
  source = DEFAULT_SOURCE,
}) {
  const { workerUrl } = TELEGRAM_CONFIG;

  if (!workerUrl || workerUrl.includes("PASTE_YOUR")) {
    throw new Error(
      "Cloudflare Worker \u043d\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d: \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 workerUrl \u0432 src/telegram.js",
    );
  }

  // ЯВНО кодируем тело в UTF-8 байты — это критично для кириллицы.
  // Если передать строку напрямую, некоторые браузеры/прокси могут
  // исказить кодировку. Uint8Array гарантирует UTF-8.
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
