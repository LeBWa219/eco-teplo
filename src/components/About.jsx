import { Icon } from "../icons";
import { ABOUT_IMAGE } from "../data";
import "./About.css";

const ABOUT_FEATURES = [
  { icon: "flame", text: "Переоборудование существующих котлов" },
  { icon: "droplets", text: "Горячее водоснабжение круглый год" },
  { icon: "leaf", text: "Углеродно-нейтральное сжигание" },
  { icon: "zap", text: "Выработка собственной электроэнергии" },
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <div>
            <div className="about-eyebrow">О компании</div>
            <h2 className="about-title">
              Возобновляемая энергия для вашего бизнеса и дома
            </h2>
            <p className="about-paragraph">
              Мы производим горелки и котлы, работающие на шелухе подсолнечника,
              гречки, измельчённой соломе, камыше, ветках деревьев и других
              отходах от переработки сельхоз продукции.
            </p>
            <p className="about-paragraph">
              Это реальная, проверенная альтернатива газовому отоплению для
              любых помещений — вдали от газовых коммуникаций или там, где
              подключение к газу экономически нецелесообразно.
            </p>
            <div className="about-features">
              {ABOUT_FEATURES.map(({ icon, text }) => (
                <div key={text} className="about-feature">
                  <div className="about-feature-icon">
                    <Icon name={icon} size={16} />
                  </div>
                  <span className="about-feature-text">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-image-wrap">
            <div className="about-image-frame">
              <img
                src={ABOUT_IMAGE}
                alt="Промышленная котельная — оборудование БиоГорелка"
              />
              <div className="about-image-overlay" />
            </div>
            <div className="about-badge">
              <div className="about-badge-icon">
                <Icon name="trending-down" size={24} />
              </div>
              <div>
                <div className="about-badge-value">−75%</div>
                <div className="about-badge-label">экономия на отоплении</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
