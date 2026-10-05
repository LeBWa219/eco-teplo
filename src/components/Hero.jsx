import { Icon, scrollTo } from "../icons";
import { HERO_IMAGE } from "../data";
import "./Hero.css";

export default function Hero() {
  const stats = [
    { val: "100+", label: "объектов введено" },
    { val: "50–700 кВт", label: "мощностной ряд" },
    { val: "до 87%", label: "КПД" },
    { val: "5 видов", label: "биотоплива" },
  ];

  return (
    <section id="hero" className="hero">
      <img
        src={HERO_IMAGE}
        alt="Промышленный объект — котельная на биотопливе"
        className="hero-bg"
      />
      <div className="hero-overlay" />

      <div className="hero-inner">
        <div style={{ maxWidth: "780px" }}>
          <div className="hero-eyebrow">
            <Icon name="leaf" size={14} />
            Альтернативно-возобновляемое топливо
          </div>

          <h1 className="hero-title">
            Отопление на <span className="hero-title-accent">альтернативно-возобновляемом</span> топливе
          </h1>

          <p className="hero-subtitle">
            Работаем на отходах от переработки сельхоз продукции. Производим горелки и котлы, работающие на шелухе подсолнечника, гречки, измельчённой соломе, камыше, ветках деревьев и других отходах.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => scrollTo("#products")}>
              Подобрать оборудование
              <Icon name="arrow-right" size={16} />
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => scrollTo("#about")}>
              Узнать больше
            </button>
          </div>

          <div className="hero-stats">
            {stats.map((s) => (
              <div key={s.val}>
                <div className="hero-stat-value">{s.val}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <svg className="hero-wave" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0 60V30C240 0 480 60 720 40C960 20 1200 50 1440 30V60H0Z" fill="#ffffff" />
      </svg>
    </section>
  );
}
