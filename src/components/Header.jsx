import { useState } from "react";
import { NAV_LINKS } from "../data";
import { Icon, scrollTo, useScrolled } from "../icons";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(20);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-bar">
        <button
          className="logo"
          onClick={() => scrollTo("#hero")}
          aria-label="На главную"
        >
          <span className="logo-badge">
            <Icon name="flame" size={20} />
          </span>
          <span className="logo-text">БиоГорелка</span>
        </button>

        <nav className="nav-desktop">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              className="nav-link"
              onClick={() => scrollTo(link.href)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          className="header-cta-desktop"
          onClick={() => scrollTo("#contacts")}
        >
          <Icon name="phone" size={16} />
          Заказать звонок
        </button>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <Icon name={menuOpen ? "x" : "menu"} size={24} />
        </button>
      </div>

      <div
        className="mobile-nav"
        style={{ maxHeight: menuOpen ? "400px" : "0" }}
      >
        <div className="mobile-nav-inner">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              className="mobile-nav-link"
              onClick={() => {
                scrollTo(link.href);
                setMenuOpen(false);
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            className="mobile-nav-cta"
            onClick={() => {
              scrollTo("#contacts");
              setMenuOpen(false);
            }}
          >
            <Icon name="phone" size={16} />
            Заказать звонок
          </button>
        </div>
      </div>
    </header>
  );
}
