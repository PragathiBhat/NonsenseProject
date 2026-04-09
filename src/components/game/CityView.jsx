import { useEffect, useRef, useState } from 'react';

const DATA_WORDS = [
  'TRANSIT', 'HUMAN', 'COMMERCE', 'ECOLOGY', 'ARCHIVE',
  'SIGNAL', 'MEMORY', 'FLOW', 'DENSITY', 'TRACE',
  'NODE', 'GRID', 'LAYER', 'PULSE', 'VECTOR',
];

function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, mn, mx) { return Math.max(mn, Math.min(mx, v)); }

export default function CityView({ filters }) {
  const { people, economy, env, memory, infra } = filters;
  const tramRef = useRef(0);
  const towerPhaseRef = useRef(0);
  const animFrameRef = useRef(null);
  const [tramX, setTramX] = useState(-60);
  const [towerLight, setTowerLight] = useState(1);
  const [dataLabels, setDataLabels] = useState([]);
  const labelTimerRef = useRef(null);

  // Animate tram + tower light
  useEffect(() => {
    let running = true;
    function frame() {
      if (!running) return;
      tramRef.current = (tramRef.current + 0.6) % 560;
      towerPhaseRef.current += 0.04;
      setTramX(tramRef.current - 60);
      setTowerLight(0.6 + 0.4 * Math.sin(towerPhaseRef.current));
      animFrameRef.current = requestAnimationFrame(frame);
    }
    animFrameRef.current = requestAnimationFrame(frame);
    return () => {
      running = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Spawn floating data labels
  useEffect(() => {
    labelTimerRef.current = setInterval(() => {
      const word = DATA_WORDS[Math.floor(Math.random() * DATA_WORDS.length)];
      const id = Date.now();
      setDataLabels(prev => [...prev.slice(-5), { id, word, x: 20 + Math.random() * 60, y: 50 + Math.random() * 40 }]);
      setTimeout(() => setDataLabels(prev => prev.filter(l => l.id !== id)), 3500);
    }, 2200);
    return () => clearInterval(labelTimerRef.current);
  }, []);

  const pAlpha = clamp(people / 100, 0, 1);
  const eAlpha = lerp(0.3, 1.0, economy / 100);
  const gAlpha = lerp(0.2, 1.0, env / 100);
  const mAlpha = memory / 100;
  const infraAlpha = infra / 100;

  // Number of visible people (0-6)
  const visiblePeople = Math.round(clamp(people / 100 * 6, 0, 6));

  // Glitch when extremes
  const extremeCount = [people, economy, env, memory, infra].filter(v => v < 10 || v > 90).length;
  const glitchAlpha = extremeCount * 0.08;

  // Fog opacity
  const totalPresence = (people + economy + env + memory + infra) / 500;
  const fogAlpha = clamp(totalPresence * 0.4 - 0.1, 0, 0.35);

  const infraTram = infra > 20 ? 1 : 0;

  return (
    <div className="city-view">
      <svg viewBox="0 0 440 420" className="city-svg" aria-label="Alexanderplatz city visualization">
        {/* Sky — deep navy */}
        <rect width="440" height="420" fill="#08081e" />

        {/* Stars — ~20 scattered */}
        {[...Array(20)].map((_, i) => (
          <circle
            key={i}
            cx={10 + (i * 43) % 420}
            cy={6 + (i * 17) % 90}
            r={0.7 + (i % 3) * 0.45}
            fill="#ffeedd"
            opacity={0.25 + (i % 5) * 0.12}
          />
        ))}

        {/* Crescent Moon — two overlapping circles */}
        <circle cx="390" cy="38" r="18" fill="rgba(255,238,221,0.18)" />
        <circle cx="398" cy="32" r="16" fill="#08081e" />

        {/* Ground / Plaza — purple-navy */}
        <rect x="0" y="320" width="440" height="100" fill="#16103a" />
        <rect x="0" y="315" width="440" height="8" fill="#1e1650" />
        {/* Ground markings */}
        {[60, 130, 200, 270, 340].map(x => (
          <rect key={x} x={x} y="335" width="35" height="2" fill="rgba(255,140,26,0.07)" />
        ))}

        {/* Infrastructure — Fernsehturm */}
        <g opacity={infraAlpha}>
          {/* Tower shaft */}
          <rect x="215" y="80" width="10" height="240" fill="#12103a" />
          {/* Sphere */}
          <ellipse cx="220" cy="160" rx="28" ry="28" fill="#1a1060" stroke="rgba(255,61,127,0.35)" strokeWidth="1.5" />
          {/* Antenna */}
          <rect x="218" y="40" width="4" height="100" fill="#1e1870" />
          {/* Pulsing pink glow */}
          <circle cx="220" cy="155" r="5" fill={`rgba(255,61,127,${towerLight * infraAlpha * 0.9})`} />
          <circle cx="220" cy="155" r="14" fill={`rgba(255,61,127,${towerLight * infraAlpha * 0.15})`} />
          <circle cx="220" cy="155" r="22" fill={`rgba(255,61,127,${towerLight * infraAlpha * 0.06})`} />
        </g>

        {/* Economy — Buildings */}
        <g opacity={eAlpha}>
          {/* Left tall building */}
          <rect x="20" y="200" width="65" height="120" fill="#1a1040" stroke="rgba(255,140,26,0.15)" strokeWidth="0.8" />
          {[0,1,2].map(row => [0,1,2,3].map(col => (
            <rect key={`${row}-${col}`} x={27 + col * 15} y={210 + row * 22} width="9" height="14"
              fill={`rgba(255,140,26,${0.22 + Math.sin(row * 3 + col * 2) * 0.12})`} />
          )))}
          {/* Accent windows — pinks */}
          <rect x="27" y="210" width="9" height="14" fill="rgba(255,61,127,0.28)" />
          <rect x="57" y="232" width="9" height="14" fill="rgba(255,214,26,0.22)" />

          {/* Right tall building */}
          <rect x="340" y="210" width="80" height="110" fill="#1a1040" stroke="rgba(255,140,26,0.15)" strokeWidth="0.8" />
          {[0,1,2].map(row => [0,1,2,3].map(col => (
            <rect key={`r${row}-c${col}`} x={347 + col * 17} y={218 + row * 24} width="10" height="16"
              fill={`rgba(255,140,26,${0.18 + Math.cos(row * 2 + col) * 0.1})`} />
          )))}
          {/* Accent windows */}
          <rect x="364" y="218" width="10" height="16" fill="rgba(255,61,127,0.25)" />
          <rect x="381" y="242" width="10" height="16" fill="rgba(192,132,252,0.3)" />

          {/* Smaller mid buildings */}
          <rect x="95" y="240" width="45" height="80" fill="#150e38" stroke="rgba(255,140,26,0.1)" strokeWidth="0.5" />
          {[0,1].map(row => [0,1].map(col => (
            <rect key={`sm${row}-${col}`} x={100 + col * 16} y={248 + row * 22} width="10" height="14"
              fill={`rgba(255,214,26,${0.2 + row * 0.08})`} />
          )))}

          <rect x="290" y="235" width="42" height="85" fill="#150e38" stroke="rgba(255,140,26,0.1)" strokeWidth="0.5" />
          {[0,1].map(row => [0,1].map(col => (
            <rect key={`sm2${row}-${col}`} x={295 + col * 16} y={243 + row * 22} width="10" height="14"
              fill={`rgba(34,211,238,${0.18 + col * 0.08})`} />
          )))}
        </g>

        {/* Infrastructure — Tram */}
        <g opacity={infraTram * infraAlpha} transform={`translate(${tramX - 440}, 310)`} style={{ transition: 'none' }}>
          {/* Body — bright cobalt blue */}
          <rect x="0" y="0" width="55" height="16" rx="3" fill="#2255cc" stroke="rgba(34,211,238,0.5)" strokeWidth="1" />
          {/* Teal windows */}
          <rect x="3" y="2" width="12" height="8" rx="1" fill="rgba(0,201,177,0.55)" />
          <rect x="18" y="2" width="12" height="8" rx="1" fill="rgba(0,201,177,0.55)" />
          <rect x="33" y="2" width="12" height="8" rx="1" fill="rgba(0,201,177,0.55)" />
          {/* Wheels */}
          <circle cx="10" cy="16" r="3" fill="#16103a" stroke="rgba(34,211,238,0.4)" strokeWidth="0.8" />
          <circle cx="45" cy="16" r="3" fill="#16103a" stroke="rgba(34,211,238,0.4)" strokeWidth="0.8" />
          {/* Front light */}
          <circle cx="53" cy="8" r="2" fill="rgba(255,238,221,0.8)" />
        </g>

        {/* Tram tracks */}
        <g opacity={infraAlpha * 0.5}>
          <line x1="0" y1="325" x2="440" y2="325" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
          <line x1="0" y1="328" x2="440" y2="328" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
          {[0,1,2,3,4,5,6,7,8].map(i => (
            <line key={i} x1={i * 55} y1="323" x2={i * 55 + 10} y2="323" stroke="rgba(34,211,238,0.12)" strokeWidth="1" />
          ))}
        </g>

        {/* Environment — Trees & vegetation */}
        <g opacity={gAlpha}>
          {[35, 80, 145, 380, 410].map((x, i) => (
            <g key={i} transform={`translate(${x}, 285)`}>
              {/* Trunk */}
              <rect x="-2" y="0" width="4" height="30" fill="#0d2010" />
              {/* Main canopy — rich saturated green */}
              <ellipse cx="0" cy="-5" rx="12" ry="16" fill={`rgba(34,197,94,${0.7 + i * 0.04})`} />
              {/* Highlight */}
              <ellipse cx="0" cy="-10" rx="8" ry="10" fill={`rgba(74,222,128,${0.5 + i * 0.03})`} />
            </g>
          ))}
          {/* Ground plants */}
          {[100, 170, 250, 350, 430].map((x, i) => (
            <ellipse key={i} cx={x} cy="318" rx="8" ry="4" fill="rgba(34,197,94,0.35)" />
          ))}
        </g>

        {/* Memory — Historical markers — vivid purple */}
        <g opacity={mAlpha}>
          {/* 1969 marker */}
          <g transform="translate(155, 290)">
            <rect x="-20" y="-10" width="40" height="25" rx="2" fill="rgba(192,132,252,0.14)" stroke="rgba(192,132,252,0.45)" strokeWidth="1" />
            <text x="0" y="2" textAnchor="middle" fontSize="7" fill="rgba(192,132,252,0.9)" fontFamily="monospace" fontWeight="700">1969</text>
            <text x="0" y="10" textAnchor="middle" fontSize="5" fill="rgba(192,132,252,0.6)" fontFamily="monospace">ERÖFFNUNG</text>
          </g>
          {/* 1989 marker */}
          <g transform="translate(280, 285)">
            <rect x="-20" y="-10" width="40" height="25" rx="2" fill="rgba(192,132,252,0.14)" stroke="rgba(192,132,252,0.45)" strokeWidth="1" />
            <text x="0" y="2" textAnchor="middle" fontSize="7" fill="rgba(192,132,252,0.9)" fontFamily="monospace" fontWeight="700">1989</text>
            <text x="0" y="10" textAnchor="middle" fontSize="5" fill="rgba(192,132,252,0.6)" fontFamily="monospace">REVOLUTION</text>
          </g>
        </g>

        {/* People — Figures — hot pink */}
        {[60, 110, 170, 250, 310, 380].slice(0, visiblePeople).map((x, i) => (
          <g key={i} transform={`translate(${x}, 320)`} opacity={pAlpha}>
            <circle cx="0" cy="-18" r="5" fill={`rgba(255,61,127,${0.6 + i * 0.06})`} />
            <line x1="0" y1="-13" x2="0" y2="0" stroke={`rgba(255,61,127,${0.6 + i * 0.06})`} strokeWidth="2" />
            <line x1="-6" y1="-8" x2="6" y2="-8" stroke={`rgba(255,61,127,${0.5 + i * 0.06})`} strokeWidth="1.5" />
            <line x1="0" y1="0" x2="-5" y2="12" stroke={`rgba(255,61,127,${0.5 + i * 0.06})`} strokeWidth="1.5" />
            <line x1="0" y1="0" x2="5" y2="12" stroke={`rgba(255,61,127,${0.5 + i * 0.06})`} strokeWidth="1.5" />
          </g>
        ))}

        {/* Data fog overlay — orange tint */}
        <rect width="440" height="420" fill={`rgba(255,140,26,${fogAlpha})`} style={{ mixBlendMode: 'multiply', pointerEvents: 'none' }} />

        {/* Glitch overlay — pink */}
        {glitchAlpha > 0 && (
          <rect width="440" height="420" fill={`rgba(255,61,127,${glitchAlpha})`} style={{ pointerEvents: 'none' }} />
        )}

        {/* Floating data labels — orange */}
        {dataLabels.map(label => (
          <text
            key={label.id}
            x={`${label.x}%`}
            y={`${label.y}%`}
            fontSize="7"
            fill="rgba(255,140,26,0.5)"
            fontFamily="monospace"
            className="data-label-float"
          >
            {label.word}
          </text>
        ))}
      </svg>
    </div>
  );
}
