import { useState, useCallback } from 'react';

// ─── SVG Landmark Illustrations ───────────────────────────────────────────────
// Each is a small artsy line-art drawing of a real Alexanderplatz landmark

function Fernsehturm({ color }) {
  // Berlin TV Tower — the defining landmark
  return (
    <svg viewBox="0 0 80 100" className="landmark-svg">
      {/* Sky glow */}
      <circle cx="40" cy="38" r="22" fill={`${color}10`} />
      {/* Needle top */}
      <line x1="40" y1="4" x2="40" y2="28" stroke={color} strokeWidth="2" />
      {/* Sphere */}
      <circle cx="40" cy="38" r="14" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Sphere latitude lines */}
      <ellipse cx="40" cy="38" rx="14" ry="5" fill="none" stroke={`${color}60`} strokeWidth="0.8" />
      <ellipse cx="40" cy="38" rx="10" ry="14" fill="none" stroke={`${color}40`} strokeWidth="0.8" />
      {/* Observation deck ring */}
      <rect x="33" y="50" width="14" height="4" rx="1" fill="none" stroke={color} strokeWidth="1.2" />
      {/* Tower shaft */}
      <polygon points="37,54 43,54 45,95 35,95" fill="none" stroke={color} strokeWidth="1.2" />
      {/* Horizontal bands on shaft */}
      <line x1="36" y1="65" x2="44" y2="65" stroke={`${color}50`} strokeWidth="0.7" />
      <line x1="36" y1="75" x2="44" y2="75" stroke={`${color}50`} strokeWidth="0.7" />
      <line x1="36" y1="85" x2="44" y2="85" stroke={`${color}50`} strokeWidth="0.7" />
      {/* Base */}
      <line x1="30" y1="95" x2="50" y2="95" stroke={color} strokeWidth="1.5" />
      {/* Blinking light */}
      <circle cx="40" cy="8" r="2" fill={color} opacity="0.9" />
    </svg>
  );
}

function Weltzeituhr({ color }) {
  // World Time Clock — rotating disc with hour markers
  return (
    <svg viewBox="0 0 80 100" className="landmark-svg">
      {/* Base pedestal */}
      <rect x="34" y="82" width="12" height="14" rx="2" fill="none" stroke={color} strokeWidth="1.2" />
      <line x1="28" y1="96" x2="52" y2="96" stroke={color} strokeWidth="1.5" />
      {/* Shaft */}
      <line x1="40" y1="60" x2="40" y2="82" stroke={color} strokeWidth="1.8" />
      {/* Outer ring */}
      <circle cx="40" cy="40" r="28" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Inner ring */}
      <circle cx="40" cy="40" r="18" fill="none" stroke={`${color}50`} strokeWidth="0.8" />
      {/* Clock spokes — 24 time zones */}
      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
        const r1 = 18, r2 = 26;
        return (
          <line
            key={i}
            x1={40 + Math.cos(angle) * r1}
            y1={40 + Math.sin(angle) * r1}
            x2={40 + Math.cos(angle) * r2}
            y2={40 + Math.sin(angle) * r2}
            stroke={i % 6 === 0 ? color : `${color}50`}
            strokeWidth={i % 6 === 0 ? 1.2 : 0.6}
          />
        );
      })}
      {/* Center hub */}
      <circle cx="40" cy="40" r="4" fill={`${color}30`} stroke={color} strokeWidth="1.2" />
      {/* Hour hand */}
      <line x1="40" y1="40" x2="40" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Minute hand */}
      <line x1="40" y1="40" x2="52" y2="38" stroke={color} strokeWidth="1" strokeLinecap="round" />
      {/* Label arc suggestion */}
      <circle cx="40" cy="40" r="28" fill="none" stroke={`${color}20`} strokeWidth="4" />
    </svg>
  );
}

function Fountain({ color }) {
  // Brunnen der Völkerfreundschaft — Fountain of Friendship
  return (
    <svg viewBox="0 0 80 100" className="landmark-svg">
      {/* Water spray arcs */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const sx = 40 + Math.cos(rad) * 18;
        const sy = 50 + Math.sin(rad) * 8;
        const ex = 40 + Math.cos(rad) * 30;
        const ey = 50 + Math.sin(rad) * 14;
        return (
          <path
            key={i}
            d={`M ${sx} ${sy} Q ${ex - 2} ${sy - 12} ${ex} ${ey}`}
            fill="none"
            stroke={`${color}${i % 2 === 0 ? '90' : '50'}`}
            strokeWidth="0.8"
          />
        );
      })}
      {/* Upper basin */}
      <ellipse cx="40" cy="50" rx="18" ry="7" fill="none" stroke={color} strokeWidth="1.3" />
      {/* Lower basin */}
      <ellipse cx="40" cy="66" rx="28" ry="9" fill="none" stroke={color} strokeWidth="1.3" />
      {/* Base ring fill hint */}
      <ellipse cx="40" cy="66" rx="28" ry="9" fill={`${color}08`} />
      <ellipse cx="40" cy="50" rx="18" ry="7" fill={`${color}10`} />
      {/* Center pillar */}
      <line x1="40" y1="28" x2="40" y2="50" stroke={color} strokeWidth="2" />
      {/* Top ornament */}
      <circle cx="40" cy="26" r="4" fill="none" stroke={color} strokeWidth="1.2" />
      <circle cx="40" cy="26" r="1.5" fill={color} />
      {/* Radial ribs on upper basin */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={40 + Math.cos(rad) * 5}
            y1={50 + Math.sin(rad) * 2}
            x2={40 + Math.cos(rad) * 17}
            y2={50 + Math.sin(rad) * 6}
            stroke={`${color}40`}
            strokeWidth="0.6"
          />
        );
      })}
      {/* Ground */}
      <line x1="10" y1="75" x2="70" y2="75" stroke={`${color}30`} strokeWidth="0.8" />
    </svg>
  );
}

function Sbahn({ color }) {
  // S-Bahn Alexanderplatz viaduct — arched rail bridge
  return (
    <svg viewBox="0 0 80 100" className="landmark-svg">
      {/* Viaduct arches */}
      {[8, 30, 52].map((x, i) => (
        <path
          key={i}
          d={`M ${x} 70 Q ${x + 11} 44 ${x + 22} 70`}
          fill={`${color}08`}
          stroke={color}
          strokeWidth="1.3"
        />
      ))}
      {/* Top rail deck */}
      <rect x="6" y="40" width="68" height="8" rx="1" fill={`${color}15`} stroke={color} strokeWidth="1.2" />
      {/* Rail tracks */}
      <line x1="10" y1="43" x2="70" y2="43" stroke={`${color}70`} strokeWidth="0.7" />
      <line x1="10" y1="46" x2="70" y2="46" stroke={`${color}70`} strokeWidth="0.7" />
      {/* Rail ties */}
      {[14, 22, 30, 38, 46, 54, 62].map(x => (
        <line key={x} x1={x} y1="42" x2={x} y2="48" stroke={`${color}40`} strokeWidth="0.8" />
      ))}
      {/* S-Bahn train */}
      <rect x="18" y="30" width="44" height="12" rx="3" fill={`${color}20`} stroke={color} strokeWidth="1.2" />
      <rect x="22" y="32" width="8" height="6" rx="1" fill={`${color}40`} />
      <rect x="32" y="32" width="8" height="6" rx="1" fill={`${color}40`} />
      <rect x="42" y="32" width="8" height="6" rx="1" fill={`${color}40`} />
      <rect x="52" y="32" width="6" height="6" rx="1" fill={`${color}40`} />
      {/* S circle logo */}
      <circle cx="24" cy="22" r="7" fill={`${color}20`} stroke={color} strokeWidth="1.2" />
      <text x="24" y="26" textAnchor="middle" fontSize="8" fill={color} fontWeight="bold">S</text>
      {/* Columns */}
      {[19, 41, 63].map(x => (
        <line key={x} x1={x} y1="70" x2={x} y2="48" stroke={`${color}30`} strokeWidth="0.8" />
      ))}
    </svg>
  );
}

function Rathaus({ color }) {
  // Rotes Rathaus — Red Town Hall
  return (
    <svg viewBox="0 0 80 100" className="landmark-svg">
      {/* Clock tower */}
      <rect x="33" y="10" width="14" height="40" fill="none" stroke={color} strokeWidth="1.3" />
      {/* Tower roof */}
      <polygon points="33,10 40,2 47,10" fill="none" stroke={color} strokeWidth="1.2" />
      {/* Clock face */}
      <circle cx="40" cy="26" r="5" fill={`${color}15`} stroke={color} strokeWidth="1" />
      <line x1="40" y1="26" x2="40" y2="22" stroke={color} strokeWidth="0.8" />
      <line x1="40" y1="26" x2="43" y2="26" stroke={color} strokeWidth="0.8" />
      {/* Main building */}
      <rect x="10" y="50" width="60" height="42" fill="none" stroke={color} strokeWidth="1.3" />
      {/* Frieze band */}
      <rect x="10" y="54" width="60" height="5" fill={`${color}15`} stroke={`${color}50`} strokeWidth="0.6" />
      {/* Windows — row 1 */}
      {[16, 26, 36, 46, 56].map(x => (
        <rect key={`w1-${x}`} x={x} y={63} width="8" height="10" rx="1" fill={`${color}20`} stroke={`${color}70`} strokeWidth="0.7" />
      ))}
      {/* Windows — row 2 */}
      {[16, 26, 36, 46, 56].map(x => (
        <rect key={`w2-${x}`} x={x} y={78} width="8" height="10" rx="1" fill={`${color}20`} stroke={`${color}70`} strokeWidth="0.7" />
      ))}
      {/* Arched entrance */}
      <path d="M 34 92 L 34 82 Q 40 76 46 82 L 46 92" fill={`${color}12`} stroke={color} strokeWidth="1" />
      {/* Battlements */}
      {[10, 18, 26, 34, 42, 50, 58, 66].map(x => (
        <rect key={x} x={x} y={47} width="6" height="4" fill="none" stroke={`${color}60`} strokeWidth="0.7" />
      ))}
    </svg>
  );
}

function WallSection({ color }) {
  // Berlin Wall — monochrome line art, matching all other landmark tiles
  return (
    <svg viewBox="0 0 80 100" className="landmark-svg">
      {/* Wall slab */}
      <rect x="8" y="12" width="64" height="74" rx="2" fill={`${color}0d`} stroke={color} strokeWidth="1.3" />

      {/* Masonry seams — horizontal */}
      <line x1="8"  y1="37" x2="72" y2="37" stroke={color} strokeWidth="0.7" opacity="0.4" />
      <line x1="8"  y1="62" x2="72" y2="62" stroke={color} strokeWidth="0.7" opacity="0.4" />
      {/* Masonry seams — vertical, staggered */}
      <line x1="40" y1="12" x2="40" y2="37" stroke={color} strokeWidth="0.6" opacity="0.3" />
      <line x1="24" y1="37" x2="24" y2="62" stroke={color} strokeWidth="0.6" opacity="0.3" />
      <line x1="56" y1="37" x2="56" y2="62" stroke={color} strokeWidth="0.6" opacity="0.3" />
      <line x1="32" y1="62" x2="32" y2="86" stroke={color} strokeWidth="0.6" opacity="0.3" />
      <line x1="58" y1="62" x2="58" y2="86" stroke={color} strokeWidth="0.6" opacity="0.3" />

      {/* ── Mural: two figures — Fraternal Kiss ── */}
      {/* Left figure head */}
      <circle cx="26" cy="27" r="6" fill={`${color}20`} stroke={color} strokeWidth="1.5" />
      {/* Left figure body */}
      <line x1="26" y1="33" x2="26" y2="50" stroke={color} strokeWidth="1.8" />
      <line x1="18" y1="40" x2="34" y2="40" stroke={color} strokeWidth="1.3" />
      <line x1="26" y1="50" x2="20" y2="60" stroke={color} strokeWidth="1.3" />
      <line x1="26" y1="50" x2="32" y2="60" stroke={color} strokeWidth="1.3" />

      {/* Right figure head */}
      <circle cx="54" cy="27" r="6" fill={`${color}20`} stroke={color} strokeWidth="1.5" />
      {/* Right figure body */}
      <line x1="54" y1="33" x2="54" y2="50" stroke={color} strokeWidth="1.8" />
      <line x1="46" y1="40" x2="62" y2="40" stroke={color} strokeWidth="1.3" />
      <line x1="54" y1="50" x2="48" y2="60" stroke={color} strokeWidth="1.3" />
      <line x1="54" y1="50" x2="60" y2="60" stroke={color} strokeWidth="1.3" />

      {/* Embrace arc */}
      <path d="M 30 22 Q 40 13 50 22" fill="none" stroke={color} strokeWidth="1.4" />

      {/* Graffiti spray circle */}
      <circle cx="40" cy="73" r="7"   fill={`${color}15`} stroke={color} strokeWidth="1.1" opacity="0.7" />
      <circle cx="40" cy="73" r="3.5" fill={`${color}25`} stroke={color} strokeWidth="0.7" opacity="0.6" />

      {/* Graffiti scrawl left */}
      <path d="M 12 69 L 16 64 L 20 70 L 24 64 L 28 69"
        fill="none" stroke={color} strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      {/* Graffiti wave right */}
      <path d="M 50 66 Q 54 62 58 66 Q 62 70 66 66"
        fill="none" stroke={color} strokeWidth="1.1"
        strokeLinecap="round" opacity="0.65" />

      {/* Chip / impact marks */}
      <circle cx="64" cy="18" r="1.8" fill={`${color}30`} stroke={color} strokeWidth="0.8" opacity="0.55" />
      <circle cx="13" cy="53" r="1.5" fill={`${color}30`} stroke={color} strokeWidth="0.7" opacity="0.55" />

      {/* Year */}
      <text x="40" y="86" textAnchor="middle" fontSize="7"
        fill={color} fontFamily="monospace" opacity="0.75">1961–1989</text>

      {/* Ground */}
      <line x1="6" y1="86" x2="74" y2="86" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// ─── Landmark config ──────────────────────────────────────────────────────────
const LANDMARKS = [
  { id: 'fernsehturm', name: 'Fernsehturm',   year: '1969', Component: Fernsehturm },
  { id: 'weltzeituhr', name: 'Weltzeituhr',    year: '1969', Component: Weltzeituhr },
  { id: 'fountain',    name: 'Völkerfreundschaft Fountain', year: '1969', Component: Fountain },
  { id: 'sbahn',       name: 'S-Bahn Viaduct', year: '1882', Component: Sbahn },
  { id: 'rathaus',     name: 'Rotes Rathaus',  year: '1869', Component: Rathaus },
  { id: 'wall',        name: 'Mauerrest',       year: '1989', Component: WallSection },
];

function makeCards() {
  const pairs = [...LANDMARKS, ...LANDMARKS];
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((landmark, i) => ({
    cardIndex: i,
    landmarkId: landmark.id,
    name: landmark.name,
    year: landmark.year,
    Component: landmark.Component,
    flipped: false,
    matched: false,
  }));
}

export default function MemoryGame({ color, onProgress, onWin }) {
  const [cards, setCards] = useState(makeCards);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [locked, setLocked] = useState(false);

  const handleFlip = useCallback((idx) => {
    if (locked) return;
    setCards(prev => {
      if (prev[idx].flipped || prev[idx].matched) return prev;
      const next = prev.map((c, i) => i === idx ? { ...c, flipped: true } : c);
      const newFlipped = [...flippedIndices, idx];

      if (newFlipped.length === 2) {
        setLocked(true);
        const [a, b] = newFlipped;
        setTimeout(() => {
          setCards(prev2 => {
            const isMatch = prev2[a].landmarkId === prev2[b].landmarkId;
            const updated = prev2.map((c, i) => {
              if (i === a || i === b) return { ...c, matched: isMatch, flipped: isMatch };
              return c;
            });
            const matchedPairs = updated.filter(c => c.matched).length / 2;
            const total = LANDMARKS.length;
            onProgress(
              Math.round((matchedPairs / total) * 100),
              `${matchedPairs} of ${total} landmarks recovered`
            );
            if (matchedPairs === total) {
              onWin('All landmarks recovered. Alexanderplatz remembers.');
            }
            return updated;
          });
          setFlippedIndices([]);
          setLocked(false);
        }, 1000);
        setFlippedIndices(newFlipped);
      } else {
        setFlippedIndices(newFlipped);
      }
      return next;
    });
  }, [locked, flippedIndices, onProgress, onWin]);

  return (
    <div className="game-canvas-wrap">
      <p className="game-instruction">
        Match each Alexanderplatz landmark with its pair. Click to reveal.
      </p>
      <div className="memory-grid">
        {cards.map((card, i) => {
          const { Component } = card;
          return (
            <div
              key={card.cardIndex}
              className={`memory-card ${card.flipped || card.matched ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
              style={{ '--card-color': color }}
              onClick={() => handleFlip(i)}
              role="button"
              aria-label={card.flipped || card.matched ? card.name : 'Hidden landmark'}
            >
              <div className="card-inner">
                {/* Back face */}
                <div className="card-back">
                  <span className="card-back-mark">?</span>
                  <span className="card-back-sub">ALEX</span>
                </div>
                {/* Front face — landmark illustration */}
                <div className="card-front landmark-front">
                  <Component color={card.matched ? color : `${color}cc`} />
                  <div className="landmark-label">
                    <span className="landmark-name">{card.name}</span>
                    <span className="landmark-year">{card.year}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
