import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';

const ROLES = ['Systems Engineer','Full-Stack Developer','AI/ML Engineer','Django Expert','Problem Solver'];

export default function Hero() {
  const role      = useTypewriter(ROLES);
  const canvasRef = useRef(null);

  // Animated film-grain canvas
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let timer;
    const draw = () => {
      c.width  = window.innerWidth;
      c.height = window.innerHeight;
      const img = ctx.createImageData(c.width, c.height);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 20) | 0;
        img.data[i] = img.data[i+1] = img.data[i+2] = v;
        img.data[i+3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      timer = setTimeout(draw, 80);
    };
    draw();
    return () => clearTimeout(timer);
  }, []);

  const stagger = { hidden:{}, visible:{ transition:{ staggerChildren:0.07, delayChildren:0.5 } } };
  const word    = { hidden:{ y:'110%', opacity:0 }, visible:{ y:'0%', opacity:1, transition:{ duration:0.9, ease:[0.16,1,0.3,1] } } };
  const fadeUp  = (delay=0) => ({ hidden:{ y:28,opacity:0 }, visible:{ y:0,opacity:1,transition:{ duration:0.75,ease:[0.16,1,0.3,1],delay } } });

  return (
    <section id="home" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', position:'relative', overflow:'hidden', paddingTop:'var(--nav-h)' }}>

      {/* Film grain */}
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.025, pointerEvents:'none', zIndex:0 }} />

      {/* Animated amber top-bar */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'var(--gray-3)', zIndex:1 }}>
        <motion.div
          style={{ height:'100%', background:'var(--amber)', transformOrigin:'left', boxShadow:'0 0 12px var(--amber)' }}
          initial={{ scaleX:0 }} animate={{ scaleX:1 }}
          transition={{ duration:1.4, ease:[0.16,1,0.3,1], delay:0.2 }} />
      </div>

      <div className="wrap" style={{ position:'relative', zIndex:2, paddingTop:80, paddingBottom:80 }}>

        {/* Available status */}
        <motion.div variants={fadeUp(0.3)} initial="hidden" animate="visible"
          style={{ display:'flex', alignItems:'center', gap:10, marginBottom:44 }}>
          <span style={{ width:7,height:7,borderRadius:'50%',background:'var(--green)',boxShadow:'0 0 8px var(--green)',animation:'pulse 2s infinite',flexShrink:0 }} />
          <span className="label" style={{ color:'var(--gray-5)' }}>Available · Systems Engineer @ TCS, Bengaluru</span>
        </motion.div>

        {/* Main title */}
        <div style={{ marginBottom:12 }}>
          <motion.h1 variants={stagger} initial="hidden" animate="visible"
            style={{ fontFamily:'var(--fd)', fontSize:'clamp(3rem,8.5vw,7.8rem)', fontWeight:700, lineHeight:0.92, letterSpacing:'-0.04em', color:'var(--white)', display:'flex', flexWrap:'wrap', columnGap:'0.22em' }}>
            {['Dharmendra','Reddy','M S'].map(w => (
              <span key={w} style={{ display:'inline-block', overflow:'hidden' }}>
                <motion.span variants={word} style={{ display:'inline-block' }}>{w}</motion.span>
              </span>
            ))}
          </motion.h1>
        </div>

        {/* Typewriter role */}
        <motion.div variants={fadeUp(1.0)} initial="hidden" animate="visible"
          style={{ fontFamily:'var(--fm)', fontSize:'clamp(0.85rem,1.8vw,1.05rem)', color:'var(--amber)', marginBottom:40, minHeight:'1.7em', display:'flex', alignItems:'center', gap:2 }}>
          <span>{role}</span>
          <span style={{ animation:'blink 0.8s step-end infinite', color:'var(--amber)' }}>_</span>
        </motion.div>

        {/* Description + photo */}
        <div className="hero-grid">
          <motion.div variants={fadeUp(1.1)} initial="hidden" animate="visible">
            <p style={{ fontFamily:'var(--fb)', fontSize:'clamp(0.95rem,1.5vw,1.15rem)', color:'var(--gray-5)', lineHeight:1.8, maxWidth:500, marginBottom:44 }}>
              CSE - AI graduate crafting scalable systems, intelligent products, and clean code.
              I build things end-to-end — from database schemas to pixel-level UI.
            </p>
            <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior:'smooth' })}
                style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'0.875rem', color:'var(--black)', background:'var(--amber)', padding:'14px 36px', borderRadius:2, transition:'all 0.2s', letterSpacing:'-0.01em' }}
                onMouseEnter={e => { e.currentTarget.style.background='var(--amber-l)'; e.currentTarget.style.transform='translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='var(--amber)';   e.currentTarget.style.transform='translateY(0)'; }}>
                View Work
              </button>
              <a href="mailto:dharmu17reddy@gmail.com"
                style={{ fontFamily:'var(--fd)', fontWeight:500, fontSize:'0.875rem', color:'var(--white)', border:'1px solid var(--gray-3)', padding:'14px 36px', borderRadius:2, display:'inline-flex', alignItems:'center', transition:'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--amber)'; e.currentTarget.style.color='var(--amber)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--gray-3)'; e.currentTarget.style.color='var(--white)'; }}>
                dharmu17reddy@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            className="hero-photo-wrap"
            initial={{ opacity:0, scale:0.9, rotate:-3 }}
            animate={{ opacity:1, scale:1, rotate:0 }}
            transition={{ duration:1.1, ease:[0.16,1,0.3,1], delay:0.8 }}>
            <div style={{ position:'relative' }}>
              <img src="/photo.jpg" alt="Dharmendra Reddy M S"
                style={{ width:'100%', aspectRatio:'3/4', objectFit:'cover', objectPosition:'top', filter:'grayscale(15%) contrast(1.05)', display:'block' }} />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:'var(--amber)' }} />
              <div style={{ position:'absolute', top:0, left:0, width:3, height:'100%', background:'var(--amber)' }} />
              <div style={{ position:'absolute', top:12, right:12, background:'rgba(0,0,0,0.9)', border:'1px solid var(--gray-3)', padding:'7px 12px', fontFamily:'var(--fm)', fontSize:'0.62rem', color:'var(--amber)', letterSpacing:'0.12em', backdropFilter:'blur(8px)' }}>
                TCS · ENG
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div variants={fadeUp(1.3)} initial="hidden" animate="visible"
          className="hero-stats-row" style={{ display:'flex', gap:0, marginTop:80, borderTop:'1px solid var(--gray-3)', paddingTop:44 }}>
          {[['5+','Projects'],['3','Internships'],['50+','Students Trained'],['7+','Languages']].map(([n,l], i) => (
            <div key={l} style={{ flex:1, paddingLeft:i===0?0:36, borderLeft:i===0?'none':'1px solid var(--gray-3)' }}>
              <div style={{ fontFamily:'var(--fd)', fontSize:'clamp(1.8rem,3.5vw,3rem)', fontWeight:700, color:'var(--white)', letterSpacing:'-0.04em', lineHeight:1 }}>{n}</div>
              <div className="label" style={{ marginTop:6, color:'var(--gray-5)' }}>{l}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
