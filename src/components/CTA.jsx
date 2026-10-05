import { Icon, scrollTo } from "../icons";
import "./CTA.css";

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta-inner">
        <div className="cta-eyebrow">Бесплатный расчёт</div>
        <h2 className="cta-title">
          Получите бесплатный расчёт стоимости системы отопления
        </h2>
        <p className="cta-sub">
          Наш инженер рассчитает тепловую нагрузку и подберёт оптимальное оборудование для вашего объекта — бесплатно и без обязательств.
        </p>
        <button className="btn btn-white btn-lg" onClick={() => scrollTo("#contacts")}>
          Оставить заявку
          <Icon name="arrow-right" size={20} />
        </button>
      </div>
    </section>
  );
}
