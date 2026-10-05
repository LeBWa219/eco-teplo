import { ADVANTAGES } from "../data";
import { Icon } from "../icons";
import "./Advantages.css";

export default function Advantages() {
  return (
    <section id="advantages" className="advantages">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="eyebrow-white">Почему выбирают нас</div>
          <h2 className="advantages-title">
            Шесть причин перейти на альтернативно-возобновляемое топливо
          </h2>
        </div>

        <div className="advantages-grid">
          {ADVANTAGES.map(({ icon, title, desc }) => (
            <div key={title} className="advantage-card">
              <div className="advantage-icon">
                <Icon name={icon} size={24} />
              </div>
              <h3 className="advantage-title">{title}</h3>
              <p className="advantage-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
