import { useState, useCallback } from 'react';

export function forceUpdate() {
  const [, setTick] = useState(0);

  const update = useCallback(() => {
    setTick(tick => tick + 1);
  }, []);
  return update;
};