// ═══════════════════════════════════════════════════════════════════════════
// Интеграция с Telegram-ботом для формы обратной связи
// ═══════════════════════════════════════════════════════════════════════════
//
// ⚠️  ВАЖНО ПРО БЕЗОПАСНОСТЬ
// Это статичный сайт (GitHub Pages), без backend. BOT_TOKEN будет виден в
// собранном JS-бандле. Любой посетитель технически может его извлечь.
// Реальный риск: кто-то может слать спам в ваш чат через этого бота.
// Это НЕ даёт доступ к вашему аккаунту или к чтению ваших сообщений.
//
// Если нужна полноценная защита — перенесите отправку на Cloudflare Workers
// или Vercel Functions (token хранится как env-переменная сервера).
// ═══════════════════════════════════════════════════════════════════════════

// ─── НАСТРОЙКА ─────────────────────────────────────────────────────────────
// 1. Получите BOT_TOKEN у @BotFather в Telegram (команда /newbot)
// 2. Узнайте свой chat_id у @userinfobot (или @getmyid_bot)
// 3. Отправьте боту любое сообщение (иначе он не сможет вам написать первым)
// 4. Вставьте значения ниже
export const TELEGRAM_CONFIG = {
  botToken: "PASTE_YOUR_BOT_TOKEN_HERE",
  chatId: "PASTE_YOUR_CHAT_ID_HERE",
};

// ─── ОТПРАВКА СООБЩЕНИЯ ─────────────────────────────────────────────────────
// Формирует красиво оформленное сообщение и шлёт его в Telegram
export async function sendToTelegram({
  name,
  phone,
  message,
  source = "Сайт ЭкоТепло",
}) {
  const { botToken, chatId } = TELEGRAM_CONFIG;

  if (!botToken || !chatId || botToken.includes("PASTE_YOUR")) {
    throw new Error(
      "Telegram-бот не настроен: заполните TELEGRAM_CONFIG в src/telegram.js",
    );
  }

  // Экранируем HTML-спецсимволы в пользовательском вводе, чтобы не сломать разметку
  const esc = (s = "") =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const time = new Date().toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const text = [
    `🔔 <b>Новая заявка с сайта</b>`,
    `<b>Источник:</b> ${esc(source)}`,
    ``,
    `<b>👤 Имя:</b> ${esc(name)}`,
    `<b>📞 Телефон:</b> ${esc(phone)}`,
    message ? `<b>💬 Сообщение:</b>\n${esc(message)}` : null,
    ``,
    `<i>🕒 Время: ${time}</i>`,
  ]
    .filter(Boolean)
    .join("\n");

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  const data = await res.json();
  if (!data.ok) {
    throw new Error(data.description || "Неизвестная ошибка Telegram API");
  }
  return data;
}
