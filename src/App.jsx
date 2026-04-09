import { useState, useMemo } from 'react';
import { useGameState } from './hooks/useGameState';
import { CATEGORIES } from './data/consequences';
import EntryScreen from './components/screens/EntryScreen';
import OverloadScreen from './components/screens/OverloadScreen';
import GameScreen from './components/screens/GameScreen';
import EscapeScreen from './components/screens/EscapeScreen';
import RevealScreen from './components/screens/RevealScreen';

const SCREENS = { entry: 'entry', overload: 'overload', game: 'game', escape: 'escape', reveal: 'reveal' };

export default function App() {
  const [screen, setScreen] = useState(SCREENS.entry);
  const { filters, setFilter, budget, log, overrideActive, reset } = useGameState();

  const lowestCat = useMemo(
    () => CATEGORIES.reduce((a, b) => filters[a] < filters[b] ? a : b),
    [filters]
  );
  const lowestPct = filters[lowestCat];

  function handleRestart() {
    reset();
    setScreen(SCREENS.entry);
  }

  return (
    <div className="app-container">
      {screen === SCREENS.entry && (
        <EntryScreen onDeploy={() => setScreen(SCREENS.overload)} />
      )}
      {screen === SCREENS.overload && (
        <OverloadScreen onReady={() => setScreen(SCREENS.game)} />
      )}
      {screen === SCREENS.game && (
        <GameScreen
          filters={filters}
          setFilter={setFilter}
          budget={budget}
          log={log}
          overrideActive={overrideActive}
          onEnterEscape={() => setScreen(SCREENS.escape)}
        />
      )}
      {screen === SCREENS.escape && (
        <EscapeScreen
          lowestCat={lowestCat}
          pct={100 - lowestPct}
          onReveal={() => setScreen(SCREENS.reveal)}
        />
      )}
      {screen === SCREENS.reveal && (
        <RevealScreen
          filters={filters}
          lowestCat={lowestCat}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
