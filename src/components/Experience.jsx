import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const up = (d=0) => ({ hidden:{ y:40,opacity:0 }, visible:{ y:0,opacity:1,transition:{ duration:0.8,ease:[0.16,1,0.3,1],delay:d } } });

const EXP = [
  {
    role:'Systems Engineer', co:'Tata Consultancy Services', short:'TCS',
    period:'Apr 2026 – Present', loc:'Bengaluru', current:true,
    points:[
      'Enterprise training in Python, Cloud technologies, and Full-Stack development.',
      'Active in Agile delivery — sprint planning, stand-ups, and retrospectives.',
      'Applying AI/ML + full-stack experience in production engineering context.',
    ],
    tags:['Python','Cloud','Agile','Enterprise'],
  },
  {
    role:'Full Stack Developer Intern', co:'Kodnest Technologies', short:'KODNEST',
    period:'Jun 2025 – Mar 2026', loc:'Bengaluru', current:false,
    points:[
      'Built full-stack web apps: Java backend, MySQL, HTML/CSS/JS frontend.',
      'Coordinated a 30-student internship batch — scheduling and progress tracking.',
      'Delivered CRUD modules with REST API integrations in Agile sprints.',
    ],
    tags:['Java','Python', 'MySQL','JavaScript','REST','Manual Testing'],
  },
  {
    role:'AI ML Engineer Intern', co:'Rooman Technologies Pvt Ltd', short:'ROOMAN',
    period:'Sep 2024 – Feb 2025', loc:'Bengaluru', current:false,
    points:[
      'Built ML models in Python with TensorFlow, NumPy, and Pandas.',
      'Deployed AI Recipe Generator using OpenAI API and Streamlit.',
      'Organised workshops training 50+ students in web development.',
    ],
    tags:['Python','TensorFlow','OpenAI','Streamlit'],
  },
  {
role: 'Web Developer Intern',
co: 'Rail Wheel Factory.',
short: ' Rail Wheel',
period: 'Nov 2023 – Jan 2024',
loc: 'Remote',
current: false,
points: [
'Developed responsive web applications using HTML, CSS, JavaScript, Bootstrap, and PHP.',
'Designed and integrated REST APIs and implemented CRUD operations using .NET and Dapper.',
'Worked with MySQL and SQL Server databases for data storage, retrieval, and management.',
'Built user-friendly interfaces and optimized application performance across devices.',
'Collaborated on backend development, database connectivity, and API integration to support dynamic web features.'
],
tags: ['HTML/CSS', 'JavaScript', 'Bootstrap', 'PHP', 'Dapper', 'REST API', 'MySQL', 'SQL Server']
}

];

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const V = (v,x={}) => ({ variants:v, initial:'hidden', animate:inView?'visible':'hidden', ...x });

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="wrap">

        <div className="exp-head-grid">
          <motion.div {...V(up(0))}><span className="label">Experience</span></motion.div>
          <motion.h2 {...V(up(0.1))}
            style={{ fontFamily:'var(--fd)', fontSize:'clamp(2rem,4.5vw,3.8rem)', fontWeight:700, color:'var(--white)', lineHeight:1.0, letterSpacing:'-0.03em' }}>
            Built across <span style={{ color:'var(--amber)' }}>three companies</span><br />before TCS.
          </motion.h2>
        </div>

        <div>
          {EXP.map((e, i) => (
            <motion.div key={e.co} {...V(up(0.1+i*0.1))}
              className="exp-row"
              style={{ borderTop:'1px solid var(--gray-3)', paddingTop:44, paddingBottom:44, transition:'background 0.25s, padding-left 0.3s' }}
              onMouseEnter={ev => { ev.currentTarget.style.background='var(--gray-1)'; ev.currentTarget.style.paddingLeft='12px'; }}
              onMouseLeave={ev => { ev.currentTarget.style.background='transparent';   ev.currentTarget.style.paddingLeft='0'; }}>

              {/* Left col */}
              <div>
                <span style={{ fontFamily:'var(--fm)', fontSize:'0.65rem', color:'var(--gray-4)', letterSpacing:'0.12em', display:'block', marginBottom:8 }}>0{i+1}</span>
                <span className="label" style={{ color:e.current?'var(--amber)':'var(--gray-5)', display:'block', marginBottom:8 }}>{e.short}</span>
                <span style={{ fontFamily:'var(--fm)', fontSize:'0.66rem', color:'var(--gray-5)', display:'block' }}>{e.loc}</span>
                {e.current && (
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:10 }}>
                    <span style={{ width:6,height:6,borderRadius:'50%',background:'var(--green)',boxShadow:'0 0 6px var(--green)',animation:'pulse 2s infinite',flexShrink:0 }} />
                    <span style={{ fontFamily:'var(--fm)', fontSize:'0.6rem', color:'var(--green)', letterSpacing:'0.1em' }}>NOW</span>
                  </div>
                )}
              </div>

              {/* Right col */}
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16, flexWrap:'wrap', gap:10 }}>
                  <div>
                    <h3 style={{ fontFamily:'var(--fd)', fontSize:'clamp(1.05rem,2vw,1.3rem)', fontWeight:700, color:'var(--white)', letterSpacing:'-0.02em', marginBottom:4 }}>{e.role}</h3>
                    <div style={{ fontFamily:'var(--fb)', fontSize:'0.875rem', color:'var(--amber)' }}>{e.co}</div>
                  </div>
                  <span style={{ fontFamily:'var(--fm)', fontSize:'0.68rem', color:'var(--gray-5)', letterSpacing:'0.05em', whiteSpace:'nowrap', flexShrink:0 }}>{e.period}</span>
                </div>
                <ul style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:20 }}>
                  {e.points.map(p => (
                    <li key={p} style={{ display:'flex', gap:12, fontFamily:'var(--fb)', fontSize:'0.875rem', color:'var(--gray-5)', lineHeight:1.65 }}>
                      <span style={{ color:'var(--amber)', flexShrink:0, marginTop:2 }}>→</span>{p}
                    </li>
                  ))}
                </ul>
                <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
                  {e.tags.map(t => (
                    <span key={t} style={{ fontFamily:'var(--fm)', fontSize:'0.64rem', color:'var(--gray-5)', border:'1px solid var(--gray-3)', padding:'4px 11px', letterSpacing:'0.06em' }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop:'1px solid var(--gray-3)' }} />
        </div>

      </div>
    </section>
  );
}
