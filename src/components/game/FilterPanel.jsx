import { CATEGORY_COLORS, CATEGORY_LABELS, BUDGET_MAX } from '../../data/consequences';

const CATEGORIES = ['people', 'economy', 'env', 'memory', 'infra'];

export default function FilterPanel({ filters, setFilter, budget, log, overrideActive }) {
  const budgetPct = Math.round((budget / BUDGET_MAX) * 100);
  const budgetWarning = budget > BUDGET_MAX * 0.85;
  const budgetDanger = budget > BUDGET_MAX;

  return (
    <div className="filter-panel">
      <div className="filter-panel-inner">
        <div className="budget-section">
          <div className="budget-label">
            <span>Processing Budget</span>
            <span className={budgetDanger ? 'text-danger' : budgetWarning ? 'text-warn' : ''}>
              {budget} / {BUDGET_MAX}
            </span>
          </div>
          <div className="budget-track">
            <div
              className={`budget-fill ${budgetDanger ? 'budget-danger' : budgetWarning ? 'budget-warn' : ''}`}
              style={{ width: `${Math.min(100, budgetPct)}%` }}
            />
          </div>
          {budgetWarning && (
            <div className="budget-alert">⚠ {budgetDanger ? 'LIMIT EXCEEDED' : 'Approaching limit'}</div>
          )}
        </div>

        {overrideActive && (
          <div className="override-notice">⚠ SYSTEM OVERRIDE ACTIVE</div>
        )}

        <div className="sliders-section">
          {CATEGORIES.map(cat => {
            const color = CATEGORY_COLORS[cat];
            const val = filters[cat];
            return (
              <div key={cat} className="slider-row">
                <div className="slider-header">
                  <span className="slider-label" style={{ color }}>{CATEGORY_LABELS[cat]}</span>
                  <span className="slider-value">{val}%</span>
                </div>
                <div className="slider-track">
                  <div
                    className="slider-fill"
                    style={{ width: `${val}%`, backgroundColor: color }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={val}
                    onChange={e => setFilter(cat, Number(e.target.value))}
                    className="slider-input"
                    style={{ '--thumb-color': color }}
                    aria-label={`${CATEGORY_LABELS[cat]} filter: ${val}%`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="log-section">
          <div className="log-title">Consequence Log</div>
          <div className="log-list">
            {log.length === 0 && (
              <div className="log-empty">Adjust filters to see consequences…</div>
            )}
            {log.map(entry => (
              <div key={entry.id} className={`log-entry log-${entry.type}`}>
                {entry.msg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
