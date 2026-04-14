import { useEffect, useState, useRef } from 'react';

const DATA_MESSAGES = [
  'PEOPLE — 847,291 simultaneous streams',
  'ECONOMY — 234,891 transaction nodes',
  'ENVIRONMENT — 12,440 sensor inputs',
  'MEMORY — 98 years of archival data',
  'INFRASTRUCTURE — 4,201 active endpoints',
];

export default function OverloadScreen({ onReady }) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [particles, setParticles] = useState([]);
  const intervalRef = useRef(null);
  const msgIntervalRef = useRef(null);

  useEffect(() => {
    // Spawn particles
    const pts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      dur: 6 + Math.random() * 6,
    }));
    setParticles(pts);

    // Progress bar
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          onReady();
          return 100;
        }
        return prev + 1.2;
      });
    }, 80);

    // Cycle messages
    msgIntervalRef.current = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % DATA_MESSAGES.length);
    }, 1600);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(msgIntervalRef.current);
    };
  }, []);

  return (
    <div className="screen overload-screen">
      <div className="particles" aria-hidden="true">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}
      </div>

      <div className="overload-content">
        <div className="overload-tag">INITIALIZING FILTER SYSTEM</div>
        <h2 className="overload-glitch" data-text="ALEXANDERPLATZ">ALEXANDERPLATZ</h2>
        <p className="overload-sub">DATA STREAMS EXCEEDING CAPACITY</p>

        <div className="overload-msg">{DATA_MESSAGES[msgIndex]}</div>

        <div className="overload-bar-wrap">
          <div className="overload-bar-label">
            <span>SYSTEM LOAD</span>
            <span>{Math.min(100, Math.round(progress))}%</span>
          </div>
          <div className="overload-bar-track">
            <div
              className="overload-bar-fill"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
