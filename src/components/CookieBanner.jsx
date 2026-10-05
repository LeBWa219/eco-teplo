import { useState, useEffect } from "react";
import "./CookieBanner.css";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("ekoteplo_cookies_accepted");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("ekoteplo_cookies_accepted", "true");
    setVisible(false);
  };
  const decline = () => {
    localStorage.setItem("ekoteplo_cookies_accepted", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-inner">
        <div className="cookie-icon">🍪</div>
        <div className="cookie-text">
          <p className="cookie-title">Мы используем файлы куки</p>
          <p className="cookie-desc">
            Сайт использует куки для улучшения работы и анализа трафика. Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
            <a href="#privacy">политикой конфиденциальности</a> и{" "}
            <a href="#personal-data">обработкой персональных данных</a>.
          </p>
        </div>
        <div className="cookie-actions">
          <button className="cookie-decline" onClick={decline}>Отклонить</button>
          <button className="cookie-accept" onClick={accept}>Принять</button>
        </div>
      </div>
    </div>
  );
}
