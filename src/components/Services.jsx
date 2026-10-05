import { SERVICES } from "../data";
import { Icon } from "../icons";
import "./Services.css";

export default function Services() {
  return (
    <section className="services">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Как мы работаем</div>
          <h2>Полный цикл работ — от проекта до сервиса</h2>
          <p>
            Берём на себя всё: проектирование, изготовление, расчёт, поставку и сопровождение. Возможен монтаж изделия самим заказчиком.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map(({ num, title, desc, icon }) => (
            <div key={num} className="service-card">
              <div className="service-num">{num}</div>
              <div className="service-icon">
                <Icon name={icon} size={22} />
              </div>
              <h3 className="service-title">{title}</h3>
              <p className="service-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
