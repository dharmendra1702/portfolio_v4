import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ── Place these files in: portfolio_v4/public/certs/
// rooman.webp          → Rooman AI ML Engineer
// kodnest.webp         → Kodnest Full Stack Java
// skillible.webp       → Skillible Gen AI Internship
// google-cyber.webp    → Google Cybersecurity Certificate
// redington-cyber.webp → Redington Cyber Security (ICT Academy)
// ict-learnathon.webp  → ICT Academy Learnathon 2023
// udemy-dm.webp        → Udemy Digital Marketing

// Sorted newest → oldest
const CERTS = [
  {
  num: '01',
  name: 'Databricks Certified Generative AI Engineer Associate',
  issuer: 'Databricks',
  year: '2026',
  color: '#1E88E5',
  img: '/certs/databricks gen ai.webp',
  url: 'https://credentials.databricks.com/678b2fa2-37d8-42bd-ade9-5e553ee96b13',
},
  {
    num: '01',
    name: 'Claude Certified Architect - Foundations',
    issuer: 'Anthropic',
    year: '2026',
    color: '#22c55e',
    img: '/certs/claude.webp',
    url: 'https://www.credly.com/badges/b0a0414d-a125-4815-8754-cf6a8587c9ec/linked_in?t=tjdor5',
  },
  {
    num: '01',
    name: 'Full Stack Java Development',
    issuer: 'Kodnest Technologies',
    year: '2026',
    color: '#22c55e',
    img: '/certs/kodnest.webp',
    url: '#',
  },
  {
    num: '02',
    name: 'AI ML Engineer Training',
    issuer: 'Rooman Technologies',
    year: '2025',
    color: '#FF6B00',
    img: '/certs/rooman.webp',
    url: '#',
  },
  {
    num: '03',
    name: 'Cyber Security — Certificate of Recognition',
    issuer: 'Redington Foundation & ICT Academy',
    year: '2024',
    color: '#10b981',
    img: '/certs/redington-cyber.webp',
    url: '#',
  },
  {
    num: '04',
    name: 'Google Cybersecurity Certificate',
    issuer: 'Coursera — Google',
    year: '2024',
    color: '#3b82f6',
    img: '/certs/google-cyber.webp',
    url: 'https://www.credly.com/go/uPm5Iwth',
  },
  {
    num: '05',
    name: 'Generative AI Virtual Internship',
    issuer: 'Skillible — AICTE',
    year: '2024',
    color: '#8b5cf6',
    img: '/certs/skillible.webp',
    url: '#',
  },
  {
    num: '06',
    name: 'Learnathon 2023 — Certificate of Participation',
    issuer: 'ICT Academy',
    year: '2023',
    color: '#f97316',
    img: '/certs/ict-learnathon.webp',
    url: '#',
  },
  {
    num: '07',
    name: 'The Complete Digital Marketing Course',
    issuer: 'Udemy',
    year: '2023',
    color: '#ec4899',
    img: '/certs/udemy-dm.webp',
    url: 'https://ude.my/UC-6db7816c-b0a0-4f18-aa83-7d1cd8083112',
  },
];

/* ── CSS ───────────────────────────────────────────────────────────── */
const CSS = `
  .cert-row {
    display: flex;
    align-items: center;
    gap: 20px;
    border-top: 1px solid var(--gray-3);
    padding: 28px 0;
    cursor: default;
    transition: background 0.22s ease;
  }
  .cert-row:hover { background: var(--gray-1); }

  .cert-row-slide {
    display: flex;
    align-items: center;
    gap: 20px;
    flex: 1;
    transform: translateX(0);
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
    will-change: transform;
  }
  .cert-row:hover .cert-row-slide { transform: translateX(10px); }

  .cert-verify-btn {
    font-family: var(--fm);
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: opacity 0.18s ease;
  }
  .cert-verify-btn:hover { opacity: 0.6; }

  .cert-modal-link {
    font-family: var(--fm);
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: opacity 0.18s ease;
    text-decoration: none;
  }
  .cert-modal-link:hover { opacity: 0.6; }

  .cert-close-btn {
    font-size: 1.1rem;
    color: var(--gray-4);
    line-height: 1;
    padding: 4px 8px;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.18s ease;
    flex-shrink: 0;
  }
  .cert-close-btn:hover { color: var(--white); }

  .cert-shimmer {
    position: absolute;
    inset: 0;
    border-radius: 8px;
    background: linear-gradient(90deg, var(--gray-1) 25%, #1a1a1a 50%, var(--gray-1) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.2s infinite;
  }
  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

if (typeof document !== 'undefined' && !document.getElementById('cert-styles')) {
  const el = document.createElement('style');
  el.id = 'cert-styles';
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* ── CertPreview ───────────────────────────────────────────────────── */
function CertPreview({ cert }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: 8, overflow: 'hidden', background: '#f5f5f5', minHeight: 160 }}>
      {!loaded && !error && <div className="cert-shimmer" />}
      {error ? (
        <div style={{
          width: '100%', height: 220, background: 'var(--gray-1)',
          border: '1px solid var(--gray-3)', borderRadius: 8,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: cert.color, opacity: 0.2 }} />
          <span style={{ fontFamily: 'var(--fm)', fontSize: '0.7rem', color: 'var(--gray-4)', letterSpacing: '0.08em' }}>
            Image not found — check /public/certs/
          </span>
        </div>
      ) : (
        <img
          src={cert.img}
          alt={cert.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => { setLoaded(true); setError(true); }}
          style={{
            width: '100%',
            display: 'block',
            objectFit: 'contain',
            borderRadius: 8,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.25s ease',
          }}
        />
      )}
    </div>
  );
}

/* ── CertModal ─────────────────────────────────────────────────────── */
function CertModal({ cert, onClose }) {
  // Close on Escape
  useState(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  });

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.82)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: '20px',
            willChange: 'opacity',
          }}
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.96, opacity: 0, y: 12 }}
            animate={{ scale: 1,    opacity: 1, y: 0  }}
            exit={{    scale: 0.96, opacity: 0, y: 12 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0a0a0a',
              border: '1px solid var(--gray-3)',
              borderRadius: 12,
              padding: '24px',
              width: '100%',
              maxWidth: 620,
              maxHeight: '92vh',
              overflowY: 'auto',
              willChange: 'transform, opacity',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '0.6rem', color: 'var(--gray-4)', letterSpacing: '0.14em' }}>
                  CERTIFICATE
                </span>
                <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', margin: '5px 0 3px' }}>
                  {cert.name}
                </h3>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '0.7rem', color: 'var(--gray-5)', letterSpacing: '0.06em' }}>
                  {cert.issuer}
                </span>
              </div>
              <button className="cert-close-btn" onClick={onClose} aria-label="Close">
                &#x2715;
              </button>
            </div>

            {/* Accent bar */}
            <div style={{ width: '100%', height: 2, background: cert.color, borderRadius: 1, marginBottom: 16, opacity: 0.7 }} />

            {/* Certificate image */}
            <div style={{ marginBottom: 16 }}>
              <CertPreview cert={cert} />
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '0.68rem', color: 'var(--gray-4)', letterSpacing: '0.08em' }}>
                {cert.year}
              </span>
              {cert.url && cert.url !== '#' ? (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-modal-link"
                  style={{ color: cert.color }}
                >
                  Open Credential &#x2197;
                </a>
              ) : (
                <span style={{ fontFamily: 'var(--fm)', fontSize: '0.68rem', color: 'var(--gray-4)', letterSpacing: '0.06em' }}>
                  Local Certificate
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Certifications ────────────────────────────────────────────────── */
export default function Certifications() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCert, setActiveCert] = useState(null);

  return (
    <section id="certifications" className="section" ref={ref}>
      <div className="wrap">

        {/* Heading */}
        <div className="cert-head-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label">Credentials</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            style={{
              fontFamily: 'var(--fd)',
              fontSize: 'clamp(2rem,4.5vw,3.8rem)',
              fontWeight: 700,
              color: 'var(--white)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
            }}
          >
            Certifications &amp;<br />
            <span style={{ color: 'var(--amber)' }}>achievements.</span>
          </motion.h2>
        </div>

        {/* Rows */}
        <div>
          {CERTS.map((c, i) => (
            <motion.div
              key={c.num}
              className="cert-row"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.055 }}
            >
              {/* Slide wrapper */}
              <div className="cert-row-slide">
                {/* Left — number + color bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 28 }}>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: '0.6rem', color: 'var(--gray-4)', letterSpacing: '0.12em' }}>
                    {c.num}
                  </span>
                  <div style={{ width: 22, height: 2, background: c.color, borderRadius: 1 }} />
                </div>

                {/* Centre — name + issuer */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(0.92rem,1.8vw,1.1rem)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: 5 }}>
                    {c.name}
                  </h3>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: '0.68rem', color: 'var(--gray-5)', letterSpacing: '0.06em' }}>
                    {c.issuer}
                  </span>
                </div>
              </div>

              {/* Right — year + verify */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, minWidth: 70 }}>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '0.68rem', color: 'var(--gray-5)', letterSpacing: '0.08em' }}>
                  {c.year}
                </span>
                <button
                  className="cert-verify-btn"
                  style={{ color: c.color }}
                  onClick={() => setActiveCert(c)}
                >
                  Verify &#x2197;
                </button>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid var(--gray-3)' }} />
        </div>

      </div>

      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </section>
  );
}