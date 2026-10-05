import { useState } from "react";
import { FAQ_ITEMS } from "../data";
import { Icon, scrollTo } from "../icons";
import "./FAQ.css";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Частые вопросы</div>
          <h2>Отвечаем на главные вопросы</h2>
          <p>Если не нашли ответ — напишите нам, и мы ответим лично.</p>
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  className="faq-head"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question">{item.question}</span>
                  <span className="faq-toggle">
                    <Icon name={isOpen ? "minus" : "plus"} size={14} />
                  </span>
                </button>

                <div className="faq-body" style={{ maxHeight: isOpen ? "500px" : "0" }}>
                  <div className="faq-body-inner">
                    <div className="faq-divider" />
                    <p className="faq-answer">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq-footer">
          <button className="btn btn-green" onClick={() => scrollTo("#contacts")}>
            Задать свой вопрос
            <Icon name="arrow-right" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
