import { NAV_LINKS } from "../data";
import { Icon, scrollTo } from "../icons";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <button className="footer-logo" onClick={() => scrollTo("#hero")}>
              <span className="footer-logo-badge">
                <Icon name="flame" size={20} />
              </span>
              <span className="footer-logo-text">ЭкоТепло</span>
            </button>
            <p className="footer-desc">
              Производитель горелок и котлов на альтернативно-возобновляемом
              биотопливе из отходов растениеводства. Автономное, экономичное и
              экологичное отопление для любых объектов.
            </p>
          </div>

          <div>
            <div className="footer-heading">Разделы</div>
            <nav className="footer-nav">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  className="footer-nav-link"
                  onClick={() => scrollTo(link.href)}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <div className="footer-heading">Контакты</div>
            <div className="footer-contacts-list">
              <a href="tel:+78001234567" className="footer-contact">
                <Icon name="phone" size={16} className="footer-contact-icon" />
                +7 (800) 123-45-67
              </a>
              <a href="mailto:info@ekoteplo.ru" className="footer-contact">
                <Icon name="mail" size={16} className="footer-contact-icon" />
                info@ekoteplo.ru
              </a>
              <div className="footer-contact">
                <Icon
                  name="map-pin"
                  size={16}
                  className="footer-contact-icon"
                />
                г. Саратов, ул. Первомайская, д. 26
              </div>
            </div>

            <div className="footer-heading">Документы</div>
            <a href="#privacy" className="footer-legal-link">
              Политика конфиденциальности
            </a>
            <a href="#personal-data" className="footer-legal-link">
              Политика обработки персональных данных
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2025 ЭкоТепло. Все права защищены.</p>
          <p className="footer-tagline">
            Отопление на биотопливе · Горелки · Котлы ·
            Альтернативно-возобновляемая энергия
          </p>
        </div>
      </div>
    </footer>
  );
}
