import { useState, useEffect } from "react";
import { TESTIMONIALS } from "../data";
import { Icon, scrollTo } from "../icons";
import "./Testimonials.css";

function StarRating({ rating }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="star"
          viewBox="0 0 20 20"
          fill={i < rating ? "#F57C00" : "none"}
          stroke={i < rating ? "#F57C00" : "#ccc"}
          strokeWidth="1.5"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function VideoModal({ embedUrl, onClose }) {
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
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`${embedUrl}?autoplay=1&rel=0`}
          title="Видеоотзыв клиента"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <button className="video-modal-close" onClick={onClose} aria-label="Закрыть видео">
          <Icon name="x" size={18} />
        </button>
      </div>
    </div>
  );
}

function TestimonialCard({ t }) {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="testimonial-card">
      {t.media.kind === "image" && (
        <div className="testimonial-media">
          <img src={t.media.src} alt={t.media.alt} />
        </div>
      )}

      {t.media.kind === "video" && (
        <>
          <button
            className="testimonial-video-btn"
            onClick={() => setVideoOpen(true)}
            aria-label="Воспроизвести видеоотзыв"
          >
            <img src={t.media.thumbnailSrc} alt={t.media.thumbnailAlt} />
            <div className="testimonial-video-overlay" />
            <div className="testimonial-play">
              <div className="testimonial-play-btn">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="testimonial-video-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Видеоотзыв
            </div>
          </button>
          {videoOpen && (
            <VideoModal embedUrl={t.media.embedUrl} onClose={() => setVideoOpen(false)} />
          )}
        </>
      )}

      <div className="testimonial-body">
        <StarRating rating={t.rating} />
        <div className="quote-mark" aria-hidden>«</div>
        <p className="testimonial-text">{t.text}</p>

        <div className="testimonial-author">
          <img src={t.avatarSrc} alt={t.name} className="testimonial-avatar" />
          <div>
            <div className="testimonial-name">{t.name}</div>
            <div className="testimonial-meta">{t.role} · {t.company}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Отзывы</div>
          <h2>Отзывы покупателей</h2>
          <p>Реальные истории клиентов из разных регионов России.</p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>

        <div className="testimonials-cta">
          <div>
            <p className="testimonials-cta-title">Есть вопросы о нашем оборудовании?</p>
            <p className="testimonials-cta-sub">
              Свяжитесь с нами — ответим на любые вопросы и подберём решение для вашего объекта.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => scrollTo("#contacts")}>
            Написать нам
            <Icon name="arrow-right" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
