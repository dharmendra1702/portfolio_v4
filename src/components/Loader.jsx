import { useEffect, useRef, useState } from 'react';

const LINES = [
  '> initializing portfolio.exe',
  '> loading: dharmendra_reddy_ms',
  '> role: systems_engineer @ TCS',
  '> stack: java · python · django · ai/ml',
  '> location: Bengaluru, india',
  '> status: open_to_opportunities',
  '> boot complete ████████████ 100%',
];

export default function Loader({ onDone }) {
  const [lines, setLines]     = useState([]);
  const [current, setCurrent] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (lineIdx >= LINES.length) {
      setTimeout(() => { setExiting(true); setTimeout(onDone, 700); }, 400);
      return;
    }
    const word = LINES[lineIdx];
    if (charIdx < word.length) {
      const t = setTimeout(() => {
        setCurrent(word.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      }, charIdx === 0 ? 120 : 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLines(l => [...l, word]);
        setCurrent('');
        setCharIdx(0);
        setLineIdx(i => i + 1);
      }, lineIdx === LINES.length - 1 ? 600 : 80);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: exiting ? 'opacity 0.7s ease' : 'none',
      opacity: exiting ? 0 : 1,
    }}>
      <div style={{ width: '100%', maxWidth: 560, padding: '0 32px' }}>
        {/* Logo */}
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '2rem', fontWeight: 700, color: '#F5F5F0', letterSpacing: '-0.03em', marginBottom: 32 }}>
          DR<span style={{ color: '#FF6B00' }}>.</span>
        </div>
        {/* Terminal lines */}
        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '0.78rem', lineHeight: 2, color: '#8A8A80' }}>
          {lines.map((l, i) => (
            <div key={i} style={{ color: l.includes('boot complete') ? '#FF6B00' : '#8A8A80' }}>{l}</div>
          ))}
          {lineIdx < LINES.length && (
            <div style={{ color: '#F5F5F0' }}>
              {current}<span style={{ animation: 'blink 0.8s step-end infinite', color: '#FF6B00' }}>█</span>
            </div>
          )}
        </div>
        <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
      </div>
    </div>
  );
}
