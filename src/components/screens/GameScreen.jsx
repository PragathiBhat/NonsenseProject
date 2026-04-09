import CityView from '../game/CityView';
import FilterPanel from '../game/FilterPanel';
import { BUDGET_MAX } from '../../data/consequences';

export default function GameScreen({ filters, setFilter, budget, log, overrideActive, onEnterEscape }) {
  const tension = Math.round((budget / BUDGET_MAX) * 100);

  return (
    <div className="screen game-screen">
      <div className="game-header">
        <div className="game-header-left">
          <span className="game-tag">FILTER INTERFACE</span>
          <div className="tension-bar-wrap">
            <div className="tension-bar-track">
              <div className="tension-bar-fill" style={{ width: `${Math.min(100, tension)}%` }} />
            </div>
            <span className="tension-label">SYSTEM TENSION {tension}%</span>
          </div>
        </div>
        <button className="btn btn-escape" onClick={onEnterEscape}>
          Enter your escape rooms →
        </button>
      </div>

      <div className="game-body">
        <CityView filters={filters} />
        <FilterPanel
          filters={filters}
          setFilter={setFilter}
          budget={budget}
          log={log}
          overrideActive={overrideActive}
        />
      </div>
    </div>
  );
}
