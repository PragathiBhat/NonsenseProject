import { useEffect, useState } from 'react';

const COLORS = [
  'rgba(255,238,221,0.4)',
  'rgba(255,238,221,0.2)',
  'rgba(255,140,26,0.8)',
  'rgba(255,61,127,0.7)',
  'rgba(34,211,238,0.6)',
  'rgba(192,132,252,0.5)',
  'rgba(255,238,221,0.15)',
];

function randomVal() {
  const r = Math.random();
  if (r < 0.45) return String(Math.floor(Math.random() * 10));
  if (r < 0.70) return String(Math.floor(Math.random() * 100)).padStart(2, '0');
  if (r < 0.88) return String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
}

let uid = 0;

export default function EntryScreen({ onDeploy }) {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const spawn = () => {
      const now = Date.now();
      setNumbers(prev => {
        const live = prev.filter(n => now - n.born < n.duration * 1000 + 200);
        return [
          ...live,
          {
            id: uid++,
            born: now,
            left: Math.random() * 97,
            value: randomVal(),
            duration: 1.8 + Math.random() * 2.8,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            size: 8 + Math.floor(Math.random() * 8),
          },
        ].slice(-100);
      });
    };

    const id = setInterval(spawn, 55);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="screen entry-screen">
      <div className="glitch-tears" aria-hidden="true">
        <div className="tear tear-1" />
        <div className="tear tear-2" />
        <div className="tear tear-3" />
      </div>

      <div className="entry-numbers" aria-hidden="true">
        {numbers.map(n => (
          <span
            key={n.id}
            className="entry-number"
            style={{
              left: `${n.left}%`,
              color: n.color,
              fontSize: `${n.size}px`,
              animationDuration: `${n.duration}s`,
            }}
          >
            {n.value}
          </span>
        ))}
      </div>

      <div className="entry-content">
        <div className="entry-tag">URBAN DATA SYSTEM v4.2.1</div>
        <h1 className="entry-title glitch-title" data-text="REALITIES REIMAGINED">
          REALITIES REIMAGINED
        </h1>
        <div className="entry-location">Berlin · Alexanderplatz · 02:47</div>
        <p className="entry-subtitle">
          Every city generates data. Someone decides what gets filtered.
          <br />
          Today, that someone is you.
          <br /><br />
          You control five data streams flowing through Alexanderplatz.
          <br />
          Everything you filter out disappears.
        </p>
        <button className="btn btn-primary" onClick={onDeploy}>
          Deploy Filter System
        </button>
      </div>
      <div className="city-silhouette" aria-hidden="true">
        <svg viewBox="0 0 600 120" preserveAspectRatio="xMidYMax meet">
          {/* TV Tower */}
          <rect x="290" y="10" width="6" height="90" fill="rgba(255,255,255,0.08)" />
          <ellipse cx="293" cy="40" rx="14" ry="14" fill="rgba(255,255,255,0.06)" />
          <rect x="291" y="5" width="4" height="30" fill="rgba(255,255,255,0.1)" />
          {/* Buildings */}
          <rect x="50" y="50" width="60" height="70" fill="rgba(255,255,255,0.04)" />
          <rect x="120" y="65" width="40" height="55" fill="rgba(255,255,255,0.04)" />
          <rect x="170" y="40" width="50" height="80" fill="rgba(255,255,255,0.05)" />
          <rect x="330" y="55" width="55" height="65" fill="rgba(255,255,255,0.04)" />
          <rect x="395" y="45" width="45" height="75" fill="rgba(255,255,255,0.04)" />
          <rect x="450" y="70" width="70" height="50" fill="rgba(255,255,255,0.03)" />
          {/* Ground */}
          <rect x="0" y="110" width="600" height="10" fill="rgba(255,255,255,0.06)" />
        </svg>
      </div>
    </div>
  );
}
