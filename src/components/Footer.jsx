const go = id => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:'smooth' });
const NAV = ['About','Skills','Experience','Projects','Certifications','Contact'];

const SOCIAL = [
  { label:'Email',    href:'mailto:dharmu17reddy@gmail.com' },
  { label:'LinkedIn', href:'https://www.linkedin.com/in/dharmendra-reddy-m-s-8289211b1/' },
  { label:'GitHub',   href:'https://github.com/dharmendra1702' },
];

export default function Footer() {
  return (
    <footer style={{ background:'#000', borderTop:'1px solid var(--gray-3)', padding:'64px 0 36px' }}>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div style={{ fontFamily:'var(--fd)', fontSize:'1.4rem', fontWeight:700, color:'var(--white)', letterSpacing:'-0.03em', marginBottom:12 }}>
              DR<span style={{ color:'var(--amber)' }}>.</span>
            </div>
            <p style={{ fontFamily:'var(--fb)', fontSize:'0.875rem', color:'var(--gray-5)', lineHeight:1.7, maxWidth:260, marginBottom:20 }}>
              Systems Engineer &amp; Full-Stack Developer. Building scalable software and intelligent systems.
            </p>
            <div style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
              {SOCIAL.map(({ label, href }) => (
                <a key={label} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ fontFamily:'var(--fm)', fontSize:'0.7rem', color:'var(--gray-5)', letterSpacing:'0.08em', transition:'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color='var(--amber)'}
                  onMouseLeave={e => e.target.style.color='var(--gray-5)'}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="label" style={{ color:'var(--gray-4)', marginBottom:20 }}>Navigate</div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {NAV.map(l => (
                <button key={l} onClick={() => go(l)}
                  style={{ fontFamily:'var(--fb)', fontSize:'0.875rem', color:'var(--gray-5)', textAlign:'left', transition:'color 0.2s, padding-left 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color='var(--amber)'; e.currentTarget.style.paddingLeft='6px'; }}
                  onMouseLeave={e => { e.currentTarget.style.color='var(--gray-5)'; e.currentTarget.style.paddingLeft='0'; }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="label" style={{ color:'var(--gray-4)', marginBottom:20 }}>Get in Touch</div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[
                ['dharmu17reddy@gmail.com',                 'mailto:dharmu17reddy@gmail.com'],
                ['+91 96112 41651',                         'tel:+919611241651'],
                ['Bengaluru, Karnataka',                    '#'],
                ['linkedin.com/in/dharmendra-reddy-m-s',   'https://www.linkedin.com/in/dharmendra-reddy-m-s-8289211b1/'],
              ].map(([val, href]) => (
                <a key={val} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ fontFamily:'var(--fb)', fontSize:'0.845rem', color:'var(--gray-5)', transition:'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color='var(--amber)'}
                  onMouseLeave={e => e.target.style.color='var(--gray-5)'}>
                  {val}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop:'1px solid var(--gray-3)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
          <span style={{ fontFamily:'var(--fm)', fontSize:'0.68rem', color:'var(--gray-4)', letterSpacing:'0.06em' }}>
            © 2025 Dharmendra Reddy M S · Bengaluru, India
          </span>
          <span style={{ fontFamily:'var(--fm)', fontSize:'0.68rem', color:'var(--gray-4)', letterSpacing:'0.06em' }}>
            Built with React · Vite · Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}