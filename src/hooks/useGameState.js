import { useState, useCallback, useRef, useEffect } from 'react';
import { BUDGET_MAX, CATEGORIES, consequenceMessages } from '../data/consequences';

const INITIAL_FILTERS = { people: 50, economy: 50, env: 50, memory: 50, infra: 50 };

export function useGameState() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [log, setLog] = useState([]);
  const [overrideActive, setOverrideActive] = useState(false);
  const overrideRef = useRef(null);
  const logIdRef = useRef(0);

  const getBudget = useCallback((f = filters) =>
    CATEGORIES.reduce((sum, cat) => sum + f[cat], 0), [filters]);

  const addLog = useCallback((msg, type = 'neutral') => {
    const id = ++logIdRef.current;
    setLog(prev => [{ id, msg, type }, ...prev].slice(0, 8));
  }, []);

  const logConsequence = useCallback((cat, val) => {
    const msgs = consequenceMessages[cat];
    let msg, type;
    if (val < 25) { msg = msgs.low; type = 'bad'; }
    else if (val > 75) { msg = msgs.high; type = 'bad'; }
    else { msg = msgs.mid; type = 'neutral'; }
    addLog(msg, type);
  }, [addLog]);

  const cancelOverride = useCallback(() => {
    if (overrideRef.current) {
      clearInterval(overrideRef.current);
      overrideRef.current = null;
    }
    setOverrideActive(false);
  }, []);

  const triggerOverride = useCallback((currentFilters) => {
    if (overrideRef.current) return;
    setOverrideActive(true);
    addLog('⚠ SYSTEM OVERRIDE ACTIVE — reducing lowest category automatically.', 'bad');
    overrideRef.current = setInterval(() => {
      setFilters(prev => {
        const total = CATEGORIES.reduce((s, c) => s + prev[c], 0);
        if (total <= BUDGET_MAX) {
          cancelOverride();
          return prev;
        }
        const lowest = CATEGORIES.reduce((a, b) => prev[a] < prev[b] ? a : b);
        const newVal = Math.max(0, prev[lowest] - 8);
        return { ...prev, [lowest]: newVal };
      });
    }, 2200);
  }, [addLog, cancelOverride]);

  const setFilter = useCallback((cat, val) => {
    setFilters(prev => {
      const next = { ...prev, [cat]: val };
      const total = CATEGORIES.reduce((s, c) => s + next[c], 0);
      if (total > BUDGET_MAX) {
        triggerOverride(next);
      } else {
        cancelOverride();
      }
      return next;
    });
    logConsequence(cat, val);
  }, [logConsequence, triggerOverride, cancelOverride]);

  const reset = useCallback(() => {
    cancelOverride();
    setFilters(INITIAL_FILTERS);
    setLog([]);
  }, [cancelOverride]);

  // Cleanup on unmount
  useEffect(() => () => cancelOverride(), [cancelOverride]);

  const budget = getBudget();

  return { filters, setFilter, budget, log, overrideActive, reset };
}
