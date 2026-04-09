import { useState, useCallback } from 'react';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '../../data/consequences';
import PeopleGame from '../escape/PeopleGame';
import MemoryGame from '../escape/MemoryGame';
import EnvGame from '../escape/EnvGame';
import EconomyGame from '../escape/EconomyGame';
import InfraGame from '../escape/InfraGame';

const ER_CONFIGS = {
  people: {
    tag: '👤 Population Drift',
    title: 'PEOPLE HAVE BEEN ERASED',
    desc: 'The streets are empty. You must repopulate the square to the correct density — not too few, not too many.',
  },
  memory: {
    tag: '🧠 Memory Fragments',
    title: 'HISTORY HAS BEEN DELETED',
    desc: "The archive is scattered. Rebuild it by matching the fragments of Alexanderplatz's past.",
  },
  env: {
    tag: '🌿 Ecological Balance',
    title: 'THE ECOSYSTEM IS COLLAPSING',
    desc: 'Environmental threats are mounting. Use tools to counter them and hold the balance.',
  },
  economy: {
    tag: '💰 Market Saturation',
    title: 'THE ECONOMY HAS BEEN ZEROED',
    desc: 'The plaza is either colonized by ads or stripped bare. Find the correct economic density.',
  },
  infra: {
    tag: '⚡ Grid Failure',
    title: 'INFRASTRUCTURE HAS FAILED',
    desc: "The city's connections are severed. Trace the path that reconnects the network.",
  },
};

function GameComponent({ cat, color, onProgress, onWin }) {
  switch (cat) {
    case 'people': return <PeopleGame color={color} onProgress={onProgress} onWin={onWin} />;
    case 'memory': return <MemoryGame color={color} onProgress={onProgress} onWin={onWin} />;
    case 'env': return <EnvGame color={color} onProgress={onProgress} onWin={onWin} />;
    case 'economy': return <EconomyGame color={color} onProgress={onProgress} onWin={onWin} />;
    case 'infra': return <InfraGame color={color} onProgress={onProgress} onWin={onWin} />;
    default: return null;
  }
}

export default function EscapeScreen({ lowestCat, pct, onReveal }) {
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState('Starting…');
  const [won, setWon] = useState(false);
  const [winMsg, setWinMsg] = useState('');

  const config = ER_CONFIGS[lowestCat];
  const color = CATEGORY_COLORS[lowestCat];

  const handleProgress = useCallback((pct, msg) => {
    setProgress(Math.min(100, pct));
    setStatusMsg(msg);
  }, []);

  const handleWin = useCallback((msg) => {
    setProgress(100);
    setWon(true);
    setWinMsg(msg);
    setStatusMsg(msg);
  }, []);

  return (
    <div className="screen escape-screen">
      <div className="escape-header">
        <div className="escape-tag" style={{ color }}>ESCAPE ROOM</div>
        <div className="escape-title">{config.title}</div>
        <div className="escape-pct">{Math.round(pct)}% erased</div>
      </div>

      <div className="escape-room-tag">{config.tag}</div>
      <p className="escape-desc">{config.desc}</p>

      <GameComponent
        cat={lowestCat}
        color={color}
        onProgress={handleProgress}
        onWin={handleWin}
      />

      <div className="escape-progress-wrap">
        <div className="escape-progress-track">
          <div
            className="escape-progress-fill"
            style={{ width: `${progress}%`, backgroundColor: color }}
          />
        </div>
        <div className="escape-status" style={{ color: won ? color : 'rgba(255,255,255,0.5)' }}>
          {statusMsg}
        </div>
      </div>

      <button
        className={`btn ${won ? 'btn-primary' : 'btn-disabled'}`}
        onClick={onReveal}
        disabled={!won}
        style={won ? { borderColor: color, color } : {}}
      >
        See your city →
      </button>
    </div>
  );
}
