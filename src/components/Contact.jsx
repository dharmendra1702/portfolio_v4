import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';

// ── EmailJS credentials — fill these in ────────────────────────────
const EJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
// ───────────────────────────────────────────────────────────────────

const up = (d=0) => ({
  hidden:  { y:40, opacity:0 },
  visible: { y:0, opacity:1, transition:{ duration:0.8, ease:[0.16,1,0.3,1], delay:d } },
});

const METHODS = [
  { label:'Email',    val:'dharmu17reddy@gmail.com',                          href:'mailto:dharmu17reddy@gmail.com' },
  { label:'Phone',    val:'+91 96112 41651',                                  href:'tel:+919611241651' },
  { label:'LinkedIn', val:'linkedin.com/in/dharmendra-reddy-m-s',             href:'https://www.linkedin.com/in/dharmendra-reddy-m-s-8289211b1/' },
  { label:'GitHub',   val:'github.com/dharmendra1702',                        href:'https://github.com/dharmendra1702' },
  { label:'Location', val:'Bengaluru, Karnataka, India',                      href:null },
];

const inputStyle = {
  width:'100%', background:'transparent', border:'none',
  borderBottom:'1px solid var(--gray-3)', padding:'13px 0',
  fontFamily:'var(--fb)', fontSize:'0.95rem', color:'var(--white)',
  outline:'none', transition:'border-color 0.2s',
};

export default function Contact() {
  const ref       = useRef(null);
  const formRef   = useRef(null);
  const inView    = useInView(ref, { once:true, margin:'-80px' });
  const V = (v,x={}) => ({ variants:v, initial:'hidden', animate:inView?'visible':'hidden', ...x });

  const [form,   setForm]   = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const set    = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const focus  = e => e.target.style.borderColor = 'var(--amber)';
  const blur   = e => e.target.style.borderColor = 'var(--gray-3)';

  const submit = async (e) => {
    e.preventDefault();
    if (status !== 'idle') return;
    setStatus('loading');

    try {
      await emailjs.send(
        EJS_SERVICE_ID,
        EJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject || 'No subject',
          message:    form.message,
          reply_to:   form.email,
        },
        EJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name:'', email:'', subject:'', message:'' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="section"
      style={{ background:'var(--gray-1)', borderTop:'1px solid var(--gray-3)' }}
      ref={ref}
    >
      <div className="wrap">

        {/* Heading */}
        <motion.div {...V(up(0))} style={{ textAlign:'center', marginBottom:100 }}>
          <span className="label" style={{ display:'block', marginBottom:20 }}>Contact</span>
          <h2 style={{
            fontFamily:'var(--fd)', fontSize:'clamp(2.4rem,7vw,6rem)',
            fontWeight:700, color:'var(--white)', lineHeight:0.92,
            letterSpacing:'-0.04em', marginBottom:20,
          }}>
            Let&apos;s build<br />
            <span style={{ color:'var(--amber)' }}>something great.</span>
          </h2>
          <p style={{
            fontFamily:'var(--fb)', fontSize:'1rem', color:'var(--gray-5)',
            maxWidth:440, margin:'0 auto', lineHeight:1.75,
          }}>
            Open to full-time roles, freelance projects, and interesting collaborations.
            I respond within 24 hours.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="contact-grid">

          {/* ── Info panel ── */}
          <motion.div {...V(up(0.15))}>
            {/* Availability badge */}
            <div style={{
              display:'flex', alignItems:'center', gap:12,
              marginBottom:44, padding:'16px 20px',
              border:'1px solid var(--gray-3)',
            }}>
              <span style={{
                width:8, height:8, borderRadius:'50%',
                background:'var(--green)', boxShadow:'0 0 8px var(--green)',
                animation:'pulse 2s infinite', flexShrink:0,
              }} />
              <div>
                <div style={{ fontFamily:'var(--fd)', fontSize:'0.875rem', fontWeight:600, color:'var(--white)', marginBottom:2 }}>
                  Available for Opportunities
                </div>
                <div className="label" style={{ color:'var(--gray-5)' }}>
                  Full-time · Freelance · Collaborations
                </div>
              </div>
            </div>

            {/* Contact methods */}
            {METHODS.map(m => (
              <div key={m.label} style={{
                borderTop:'1px solid var(--gray-3)', padding:'18px 0',
                display:'flex', flexDirection:'column', gap:5,
              }}>
                <span className="label" style={{ color:'var(--gray-4)' }}>{m.label}</span>
                {m.href ? (
                  <a
                    href={m.href}
                    target={m.href.startsWith('http') ? '_blank' : undefined}
                    rel={m.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{ fontFamily:'var(--fd)', fontSize:'0.95rem', fontWeight:500, color:'var(--white)', transition:'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color='var(--amber)'}
                    onMouseLeave={e => e.target.style.color='var(--white)'}
                  >
                    {m.val}
                  </a>
                ) : (
                  <span style={{ fontFamily:'var(--fb)', fontSize:'0.95rem', color:'var(--gray-6)' }}>
                    {m.val}
                  </span>
                )}
              </div>
            ))}
            <div style={{ borderTop:'1px solid var(--gray-3)' }} />
          </motion.div>

          {/* ── Form ── */}
          <motion.div {...V(up(0.2))}>
            <form ref={formRef} onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:28 }}>

              <div className="form-row">
                <div>
                  <label className="label" style={{ display:'block', marginBottom:8, color:'var(--gray-5)' }}>Name</label>
                  <input
                    type="text" placeholder="Your name" required
                    value={form.name} onChange={set('name')}
                    style={inputStyle} onFocus={focus} onBlur={blur}
                  />
                </div>
                <div>
                  <label className="label" style={{ display:'block', marginBottom:8, color:'var(--gray-5)' }}>Email</label>
                  <input
                    type="email" placeholder="you@email.com" required
                    value={form.email} onChange={set('email')}
                    style={inputStyle} onFocus={focus} onBlur={blur}
                  />
                </div>
              </div>

              <div>
                <label className="label" style={{ display:'block', marginBottom:8, color:'var(--gray-5)' }}>Subject</label>
                <input
                  type="text" placeholder="Project / Job Opportunity"
                  value={form.subject} onChange={set('subject')}
                  style={inputStyle} onFocus={focus} onBlur={blur}
                />
              </div>

              <div>
                <label className="label" style={{ display:'block', marginBottom:8, color:'var(--gray-5)' }}>Message</label>
                <textarea
                  placeholder="Tell me about your project or opportunity..."
                  required rows={5}
                  value={form.message} onChange={set('message')}
                  style={{ ...inputStyle, resize:'vertical', minHeight:120 }}
                  onFocus={focus} onBlur={blur}
                />
              </div>

              {/* Error message */}
              {status === 'error' && (
                <p style={{ fontFamily:'var(--fb)', fontSize:'0.85rem', color:'#ef4444', margin:0 }}>
                  Something went wrong. Please try again or email me directly.
                </p>
              )}

              <motion.button
                type="submit"
                disabled={status !== 'idle'}
                whileHover={status === 'idle' ? { y:-3 } : {}}
                whileTap={status  === 'idle' ? { scale:0.98 } : {}}
                style={{
                  fontFamily:'var(--fd)', fontWeight:700, fontSize:'0.9rem', letterSpacing:'-0.01em',
                  color:'var(--black)',
                  background: status === 'success' ? 'var(--green)' : status === 'error' ? '#ef4444' : 'var(--amber)',
                  padding:'16px 36px', borderRadius:2, alignSelf:'flex-start',
                  display:'flex', alignItems:'center', gap:10,
                  opacity: status === 'loading' ? 0.7 : 1,
                  transition:'background 0.3s, opacity 0.3s',
                  cursor: status !== 'idle' ? 'not-allowed' : 'pointer',
                }}
              >
                {status === 'idle'    && <><span>Send Message</span><span>&#x2192;</span></>}
                {status === 'loading' && <><span>Sending</span><span style={{ display:'inline-block', animation:'spin 1s linear infinite' }}>&#x21BB;</span></>}
                {status === 'success' && <><span>Message Sent!</span><span>&#x2713;</span></>}
                {status === 'error'   && <><span>Failed — Try Again</span><span>&#x2715;</span></>}
              </motion.button>

            </form>
          </motion.div>
        </div>

      </div>

      <style>{`
        input::placeholder, textarea::placeholder { color: var(--gray-4); }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 8px var(--green); }
          50% { box-shadow: 0 0 16px var(--green); }
        }
      `}</style>
    </section>
  );
}