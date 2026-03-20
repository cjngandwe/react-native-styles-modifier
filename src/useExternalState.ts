// Simple external state management without dependencies
// This is a lightweight alternative to libraries like zustand or redux

type Listener<T> = (state: T) => void;

export interface UseExternalState<T> {
  getState: () => T;
  setState: (value: T | ((prev: T) => T)) => void;
  subscribe: (listener: Listener<T>) => () => void;
}

export function createExternalState<T>(initialState: T): UseExternalState<T> {
  let state = initialState;
  const listeners = new Set<Listener<T>>();

  return {
    getState: () => state,

    setState: (value: T | ((prev: T) => T)) => {
      const newState =
        typeof value === "function" ? (value as (prev: T) => T)(state) : value;

      if (newState !== state) {
        state = newState;
        listeners.forEach((listener) => listener(state));
      }
    },

    subscribe: (listener: Listener<T>) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

// Type for useSyncExternalStore hook
type UseSyncExternalStore = <T>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => T,
) => T;

// React hook for using external state
// Requires useSyncExternalStore to be passed in from React
export function useExternalState<T>(
  store: UseExternalState<T>,
  useSyncExternalStore: UseSyncExternalStore,
): [T, (value: T | ((prev: T) => T)) => void] {
  // Adapt store.subscribe to match useSyncExternalStore's expected signature
  const subscribe = (onStoreChange: () => void) => {
    return store.subscribe(() => onStoreChange());
  };

  const state = useSyncExternalStore(subscribe, store.getState);
  return [state, store.setState];
}
