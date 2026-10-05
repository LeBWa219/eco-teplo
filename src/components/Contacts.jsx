import { useState } from "react";
import { Icon } from "../icons";
import { sendToTelegram } from "../telegram";
import { formatPhoneInput, isValidPhone } from "../phoneFormatter";
import "./Contacts.css";

const CONTACTS = [
  { icon: "phone", label: "Телефон", value: "+7 (800) 123-45-67", href: "tel:+78001234567" },
  { icon: "mail", label: "Электронная почта", value: "info@ekoteplo.ru", href: "mailto:info@ekoteplo.ru" },
  { icon: "map-pin", label: "Адрес", value: "г. Саратов, ул. Первомайская, д. 26", href: null },
];

const COOLDOWN_MS = 60 * 1000; // 60 секунд между заявками — защита от спама

export default function Contacts() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [honeypot, setHoneypot] = useState(""); // ловушка для ботов (люди это поле не видят)
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [lastSubmit, setLastSubmit] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    // Honeypot: если поле заполнено — это бот, молча имитируем успех
    if (honeypot) {
      setSent(true);
      setForm({ name: "", phone: "", message: "" });
      setHoneypot("");
      setTimeout(() => setSent(false), 5000);
      return;
    }

    // Cooldown: не чаще раза в минуту
    const now = Date.now();
    if (now - lastSubmit < COOLDOWN_MS) {
      const waitSec = Math.ceil((COOLDOWN_MS - (now - lastSubmit)) / 1000);
      setError(`Подождите ${waitSec} сек. перед следующей заявкой`);
      return;
    }

    // Проверяем, что телефон полностью введён (11 цифр)
    if (!isValidPhone(form.phone)) {
      setError("Введите номер телефона полностью — 11 цифр, например: +7 (935) 231 45 87");
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      await sendToTelegram({
        name: form.name,
        phone: form.phone,
        message: form.message,
        hp: honeypot, // передаём honeypot в Worker для двойной проверки
      });
      setSent(true);
      setForm({ name: "", phone: "", message: "" });
      setHoneypot("");
      setLastSubmit(Date.now());
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error("[telegram] send error:", err);
      setError(
        "Не удалось отправить заявку. Позвоните нам по телефону +7 (800) 123-45-67 или попробуйте позже."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contacts" className="contacts">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Свяжитесь с нами</div>
          <h2>Контакты</h2>
        </div>

        <div className="contacts-grid">
          <div>
            <h3 className="contacts-info-title">Наши реквизиты</h3>
            <div>
              {CONTACTS.map(({ icon, label, value, href }) => (
                <div key={label} className="contact-item">
                  <div className="contact-icon">
                    <Icon name={icon} size={20} />
                  </div>
                  <div>
                    <div className="contact-label">{label}</div>
                    {href ? (
                      <a className="contact-value" href={href}>{value}</a>
                    ) : (
                      <span className="contact-value">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="map-wrap">
              <iframe
                title="Карта — г. Саратов, ул. Первомайская, д. 26"
                src="https://yandex.ru/map-widget/v1/?ll=46.042456%2C51.530796&z=16&pt=46.042456%2C51.530796%2Cpm2rdm"
                allowFullScreen
                frameBorder="0"
                loading="lazy"
              />
            </div>
          </div>

          <div className="form-card">
            <h3 className="form-title">Написать нам</h3>
            <p className="form-sub">
              Опишите вашу задачу — ответим в течение одного рабочего дня.
            </p>

            {sent ? (
              <div className="form-success">
                <Icon name="check" size={56} className="form-success-icon" />
                <h4 className="form-success-title">Заявка отправлена!</h4>
                <p className="form-success-text">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Honeypot — скрытое поле, боты его заполняют, люди нет */}
                <div className="honeypot" aria-hidden="true">
                  <label>Не заполняйте это поле</label>
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label className="label">Ваше имя</label>
                  <input
                    className="input"
                    type="text"
                    required
                    placeholder="Иван Петров"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label className="label">Телефон</label>
                  <input
                    className="input"
                    type="tel"
                    required
                    placeholder="+7 (___) ___ __ __"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: formatPhoneInput(e.target.value) })}
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={18} // "+7 (XXX) XXX XX XX" = 18 символов максимум
                  />
                </div>
                <div className="form-field">
                  <label className="label">Сообщение</label>
                  <textarea
                    className="textarea"
                    rows={4}
                    placeholder="Опишите ваш объект и задачу..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                {error && <div className="form-error">{error}</div>}

                <button
                  type="submit"
                  className="form-submit"
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      <span className="form-spinner" />
                      Отправляем...
                    </>
                  ) : (
                    "Отправить заявку"
                  )}
                </button>
                <p className="form-disclaimer">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a href="#privacy">политикой обработки персональных данных</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
