import { CATEGORY_COLORS, CATEGORY_LABELS, outcomes } from '../../data/consequences';

const CATEGORIES = ['people', 'economy', 'env', 'memory', 'infra'];

export default function RevealScreen({ filters, lowestCat, onRestart }) {
  const outcome = outcomes[lowestCat];
  const val = filters[lowestCat];
  const side = val < 50 ? 'low' : 'high';
  const { title, text } = outcome[side];

  const erasedPct = side === 'low' ? Math.round(100 - val) : Math.round(val - 50);

  return (
    <div className="screen reveal-screen">
      <div className="reveal-header">
        <div className="reveal-tag">FILTER RESULT</div>
        <h2 className="reveal-title">{title}</h2>
      </div>

      <p className="reveal-body">{text}</p>

      <div className="reveal-stats">
        {CATEGORIES.map(cat => {
          const v = filters[cat];
          const color = CATEGORY_COLORS[cat];
          const isLowest = cat === lowestCat;
          return (
            <div key={cat} className={`reveal-stat ${isLowest ? 'reveal-stat-highlight' : ''}`}
              style={isLowest ? { borderColor: color } : {}}>
              <div className="reveal-stat-label" style={{ color }}>{CATEGORY_LABELS[cat]}</div>
              <div className="reveal-stat-value">{v}%</div>
              <div className="reveal-stat-bar-track">
                <div className="reveal-stat-bar-fill" style={{ width: `${v}%`, backgroundColor: color }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="reveal-reflection">
        <p>
          You erased <strong style={{ color: CATEGORY_COLORS[lowestCat] }}>{CATEGORY_LABELS[lowestCat]}</strong> most aggressively —&nbsp;
          filtering it to {filters[lowestCat]}%.
          This is what algorithmic urbanism feels like from the inside.
          Every filter has a cost. Every absence is a choice.
        </p>
      </div>

      <div className="reveal-actions">
        <button className="btn btn-primary" onClick={onRestart}>
          ↺ Run the algorithm again
        </button>
      </div>
    </div>
  );
}
