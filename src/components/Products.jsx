import { useState, useEffect } from "react";
import { PRODUCTS } from "../data";
import { Icon, scrollTo } from "../icons";
import "./Products.css";

function ProductModal({ product, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-image">
          <img src={product.img} alt={product.alt} />
          <div className="modal-image-overlay" />
          <div className="modal-image-content">
            <div className="modal-image-subtitle">{product.subtitle}</div>
            <h3 className="modal-image-title">{product.title}</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Закрыть">
            <Icon name="x" size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-description">{product.modal.description}</p>

          <h4 className="modal-section-title">Технические характеристики</h4>
          <div className="modal-specs">
            {product.modal.specs.map(({ icon, label, value }) => (
              <div className="modal-spec" key={label}>
                <div className="modal-spec-head">
                  <Icon name={icon} size={16} className="modal-spec-icon" />
                  <span className="modal-spec-label">{label}</span>
                </div>
                <span className="modal-spec-value">{value}</span>
              </div>
            ))}
          </div>

          <div className="modal-two-col">
            <div>
              <h4 className="modal-section-title">Виды топлива</h4>
              <ul>
                {product.modal.fuels.map((f) => (
                  <li key={f} className="modal-list-item">
                    <Icon name="leaf" size={16} className="modal-list-icon orange" />
                    <span className="modal-list-item-text">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="modal-section-title">Ключевые возможности</h4>
              <ul>
                {product.modal.advantages.map((a) => (
                  <li key={a} className="modal-list-item">
                    <Icon name="check" size={16} className="modal-list-icon green" />
                    <span className="modal-list-item-text">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            className="modal-cta"
            onClick={() => { onClose(); setTimeout(() => scrollTo("#contacts"), 300); }}
          >
            Запросить коммерческое предложение
            <Icon name="arrow-right" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [active, setActive] = useState(null);

  return (
    <section id="products" className="products">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Наша продукция</div>
          <h2>Горелки и котлы на биотопливе</h2>
        </div>

        <div className="products-grid">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.img} alt={product.alt} />
                <div className="product-image-overlay" />
              </div>
              <div className="product-body">
                <div className="product-subtitle">{product.subtitle}</div>
                <h3 className="product-title">{product.title}</h3>
                <p className="product-desc">{product.desc}</p>
                <ul className="product-features">
                  {product.features.map((f) => (
                    <li key={f} className="product-feature">
                      <Icon name="check" size={16} className="product-feature-icon" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn-green btn-sm"
                  style={{ alignSelf: "flex-start" }}
                  onClick={() => setActive(product)}
                >
                  Подробнее
                  <Icon name="chevron-right" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {active && <ProductModal product={active} onClose={() => setActive(null)} />}
    </section>
  );
}
