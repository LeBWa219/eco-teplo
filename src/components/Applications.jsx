import { APPLICATIONS } from "../data";
import "./Applications.css";

export default function Applications() {
  return (
    <section id="applications" className="applications">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Области применения</div>
          <h2>Где работает наше оборудование</h2>
          <p>
            От теплиц до майнинговых ферм — биотопливо решает задачу там, где газ недоступен или невыгоден.
          </p>
        </div>

        <div className="applications-grid">
          {APPLICATIONS.map(({ name, img, alt }) => (
            <div key={name} className="app-card">
              <img src={img} alt={alt} />
              <div className="app-card-overlay" />
              <div className="app-card-label">
                <p>{name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
