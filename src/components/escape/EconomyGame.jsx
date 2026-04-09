import { useState, useEffect } from 'react';

const ADS = [
  { id: 0,  label: 'BUY NOW',   sub: 'Limited time offer',      col: '#e8923c' },
  { id: 1,  label: 'SALE 50%',  sub: 'Everything must go',      col: '#d4823a' },
  { id: 2,  label: 'PREMIUM™',  sub: 'Upgrade your lifestyle',  col: '#c97830' },
  { id: 3,  label: 'INVEST',    sub: 'Your future. Our profit.', col: '#bf6e28' },
  { id: 4,  label: 'LUXURY',    sub: 'You deserve the best',    col: '#e89a3c' },
  { id: 5,  label: 'BRAND™',    sub: 'Just trust us',           col: '#d48030' },
  { id: 6,  label: 'PROFIT',    sub: 'Growth at any cost',      col: '#cc7428' },
  { id: 7,  label: 'GROWTH',    sub: 'Endless expansion',       col: '#e08830' },
  { id: 8,  label: 'MARKET',    sub: 'Buy. Sell. Repeat.',      col: '#d67e28' },
  { id: 9,  label: 'TRADE',     sub: 'Move fast. Extract.',     col: '#c87020' },
  { id: 10, label: 'CAPITAL',   sub: 'Money never sleeps',      col: '#e09030' },
  { id: 11, label: 'RETAIL',    sub: 'Your space, our shelf',   col: '#d88430' },
];

export default function EconomyGame({ color, onProgress, onWin }) {
  const [active, setActive] = useState(() => ADS.map(a => ({ ...a, on: true })));
  const [won, setWon] = useState(false);

  const onCount = active.filter(a => a.on).length;
  const total = ADS.length;
  const removed = total - onCount;
  const pct = Math.round((removed / total) * 100);

  useEffect(() => {
    if (won) return;
    if (onCount === 0) {
      setWon(true);
      onProgress(100, 'All advertisements removed. The square belongs to people again.');
      onWin('Commerce cleared. Alexanderplatz is no longer for sale.');
    } else {
      onProgress(pct, `${removed} of ${total} ads removed — ${onCount} remaining`);
    }
  }, [onCount, won, pct, removed, total, onProgress, onWin]);

  function toggle(id) {
    if (won) return;
    setActive(prev => prev.map(a => a.id === id ? { ...a, on: false } : a));
  }

  return (
    <div className="game-canvas-wrap">
      <p className="game-instruction">
        Toggle off every advertisement to reclaim the square. All {total} must be removed.
      </p>

      <div className="economy-grid">
        {active.map(ad => (
          <div
            key={ad.id}
            className={`ad-card ${ad.on ? 'ad-on' : 'ad-off'}`}
            style={{ '--ad-col': ad.col }}
          >
            <div className="ad-card-body">
              <div className="ad-label">{ad.label}</div>
              <div className="ad-sub">{ad.sub}</div>
            </div>
            <button
              className={`ad-toggle ${ad.on ? 'toggle-on' : 'toggle-off'}`}
              onClick={() => toggle(ad.id)}
              disabled={!ad.on || won}
              aria-label={`Remove ${ad.label} advertisement`}
            >
              {ad.on ? 'ON' : 'OFF'}
            </button>
          </div>
        ))}
      </div>

      <div className="economy-status">
        <div className="economy-bar-track">
          <div
            className="economy-bar-fill"
            style={{ width: `${pct}%`, backgroundColor: color }}
          />
        </div>
        <span style={{ color: onCount === 0 ? color : 'rgba(255,255,255,0.4)' }}>
          {onCount === 0 ? '✓ Square reclaimed' : `${onCount} ads still active`}
        </span>
      </div>
    </div>
  );
}
