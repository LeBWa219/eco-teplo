import { useState } from "react";
import { Icon } from "../icons";
import "./Contacts.css";

const CONTACTS = [
  { icon: "phone", label: "Телефон", value: "+7 (800) 123-45-67", href: "tel:+78001234567" },
  { icon: "mail", label: "Электронная почта", value: "info@ekoteplo.ru", href: "mailto:info@ekoteplo.ru" },
  { icon: "map-pin", label: "Адрес", value: "г. Краснодар, ул. Промышленная, д. 14, офис 3", href: null },
];

export default function Contacts() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 5000);
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

            <div className="map-placeholder">
              <div className="map-placeholder-inner">
                <Icon name="map-pin" size={40} />
                <p>Краснодар, ул. Промышленная, 14</p>
              </div>
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
                    placeholder="+7 (___) ___-__-__"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
                <button type="submit" className="form-submit">
                  Отправить заявку
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
