import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const up = (d=0) => ({ hidden:{ y:40,opacity:0 }, visible:{ y:0,opacity:1,transition:{ duration:0.8,ease:[0.16,1,0.3,1],delay:d } } });

const FACTS = [
  { n:'B.E. CSE - AI',     s:'sri venkateshwara college of engineering, bangalore · CGPA 7.66' },
  { n:'Systems Engineer',  s:'Tata Consultancy Services · Apr 2026–Present' },
  { n:'3 Internships',     s:'AI/ML · Full-Stack · Web Dev' },
  { n:'50+ Students',      s:'Workshops & batch coordination' },
];

const VALUES = [
  { icon:'⚡', t:'Speed + Quality',       d:'Fast iteration without cutting corners. I ship, then refine.' },
  { icon:'🧠', t:'Continuous Learning',   d:'New stacks, new paradigms. Comfort zones are growth ceilings.' },
  { icon:'🎯', t:'User First',            d:'Every architectural decision traces back to the end-user.' },
  { icon:'🤝', t:'Community',             d:"Trained 50+ students. Sharing knowledge multiplies it." },
];

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  const V = (variants, extra={}) => ({ variants, initial:'hidden', animate:inView?'visible':'hidden', ...extra });

  return (
    <section id="about" className="section" ref={ref}>
      <div className="wrap">

        {/* Heading row */}
        <div className="about-head-grid">
          <motion.div {...V(up(0))}><span className="label">About</span></motion.div>
          <motion.h2 {...V(up(0.1))}
            style={{ fontFamily:'var(--fd)', fontSize:'clamp(2rem,4.5vw,3.8rem)', fontWeight:700, color:'var(--white)', lineHeight:1.0, letterSpacing:'-0.03em' }}>
            CSE - AI engineer.<br />
            <span style={{ color:'var(--amber)' }}>Builder</span> by instinct.<br />
            Bangalore.
          </motion.h2>
        </div>

        {/* Bio + photo */}
        <div className="about-bio-grid">
          <motion.div {...V(up(0.15))}>
            <p style={{ fontFamily:'var(--fb)', fontSize:'1.05rem', color:'var(--gray-5)', lineHeight:1.85, marginBottom:28, maxWidth:560 }}>
              I'm a Computer Science &amp; Engineering in Artificial Intelligence graduate who genuinely loves
              the craft of building software. From the logic of a clean backend API to the feel
              of a smooth UI — I care about every layer of the stack.
            </p>
            <p style={{ fontFamily:'var(--fb)', fontSize:'1.05rem', color:'var(--gray-5)', lineHeight:1.85, marginBottom:48, maxWidth:560 }}>
              I currently work as a{' '}
              <strong style={{ color:'var(--white)', fontWeight:500 }}>Systems Engineer at TCS</strong>
              {' '}in Bengaluru. Before TCS, I interned at three companies — AI/ML Intern at Rooman Technologies,
              Full-Stack Java Developer at Kodnest, and Web Development Intern at Rail Wheel Factory.
            </p>
            <div className="values-grid">
              {VALUES.map(({ icon,t,d }, i) => (
                <motion.div key={t} {...V(up(0.2+i*0.07))}
                  style={{
                    padding:'26px 22px',
                    borderRight:  i%2===0 ? '1px solid var(--gray-3)' : 'none',
                    borderBottom: i<2     ? '1px solid var(--gray-3)' : 'none',
                    transition:'background 0.25s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background='var(--gray-1)'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                  <div style={{ fontSize:'1.3rem', marginBottom:10 }}>{icon}</div>
                  <div style={{ fontFamily:'var(--fd)', fontSize:'0.88rem', fontWeight:600, color:'var(--white)', marginBottom:6 }}>{t}</div>
                  <div style={{ fontFamily:'var(--fb)', fontSize:'0.8rem', color:'var(--gray-5)', lineHeight:1.6 }}>{d}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="about-photo" {...V(up(0.2))}>
            <div style={{ position:'relative', borderLeft:'3px solid var(--amber)' }}>
              <img src="/photo.jpg" alt="Dharmendra Reddy" style={{ width:'100%', objectFit:'cover', filter:'grayscale(10%)', display:'block' }} />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:'var(--amber)' }} />
            </div>
            <div style={{ marginTop:14, fontFamily:'var(--fm)', fontSize:'0.66rem', color:'var(--gray-5)', letterSpacing:'0.08em' }}>
              Dharmendra Reddy M S — Bengaluru, 2025
            </div>
          </motion.div>
        </div>

        {/* Fact cards */}
        <hr className="h-rule" style={{ marginBottom:56 }} />
        <div className="facts-grid">
          {FACTS.map(({ n,s }, i) => (
            <motion.div key={n} {...V(up(0.1+i*0.07))}
              style={{
                padding:'30px 26px',
                borderRight: i<3 ? '1px solid var(--gray-3)' : 'none',
                transition:'background 0.25s, padding-left 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--gray-1)'; e.currentTarget.style.paddingLeft='32px'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent';   e.currentTarget.style.paddingLeft='26px'; }}>
              <div style={{ fontFamily:'var(--fd)', fontSize:'1rem', fontWeight:700, color:'var(--white)', marginBottom:6 }}>{n}</div>
              <div className="label" style={{ color:'var(--gray-5)' }}>{s}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
