import { FUELS } from "../data";
import "./Fuel.css";

export default function Fuel() {
  return (
    <section id="fuel" className="fuel">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Виды топлива</div>
          <h2>Что мы используем как топливо</h2>
          <p>
            Отходы растениеводства, которые иначе сжигались бы на полях или вывозились на свалки, превращаются в дешёвую энергию.
          </p>
        </div>

        <div className="fuel-grid">
          {FUELS.map(({ name, img, alt }) => (
            <div key={name} className="fuel-card">
              <img src={img} alt={alt} />
              <div className="fuel-card-overlay" />
              <div className="fuel-card-label">
                <p>{name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
