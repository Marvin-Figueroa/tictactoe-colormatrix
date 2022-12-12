/* eslint-disable indent */
import { useReducer } from 'react';

type ActionType<T> =
  | { type: 'SET_STATE'; data: T }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'RESET' };

interface StateType<T> {
  past: T[];
  present: T;
  future: T[];
}

interface TimeMachineReturn<T> {
  state: StateType<T>;
  setState: (newState: T) => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
  pastStates: T[];
  futureStates: T[];
  isUndoPossible: boolean;
  isRedoPossible: boolean;
}

const reducerTimeMachine = <T>(
  state: StateType<T>,
  action: ActionType<T>
): StateType<T> => {
  const { past, present, future } = state;

  switch (action.type) {
    case 'SET_STATE':
      return {
        past: [...past, present],
        present: action.data,
        future: [],
      };
    case 'UNDO':
      return {
        past: past.slice(0, past.length - 1),
        present: past[past.length - 1],
        future: [present, ...future],
      };
    case 'REDO':
      return {
        past: [...past, present],
        present: future[0],
        future: future.slice(1),
      };
    case 'RESET':
      return {
        past: [...past, present, ...future.slice(0, future.length - 1)],
        present: future[future.length - 1],
        future: [],
      };
    default:
      return state;
  }
};

const useTimeMachine = <T>(initialState: T): TimeMachineReturn<T> => {
  const [state, dispatch] = useReducer<
    (state: StateType<T>, action: ActionType<T>) => StateType<T>
  >(reducerTimeMachine, {
    past: [],
    present: initialState,
    future: [],
  });

  const { past, future } = state;

  const setState = (newState: T): void =>
    dispatch({ type: 'SET_STATE', data: newState });
  const undo = (): void => dispatch({ type: 'UNDO' });
  const redo = (): void => dispatch({ type: 'REDO' });
  const reset = (): void => dispatch({ type: 'RESET' });
  const isUndoPossible = past.length > 1;
  const isRedoPossible = future.length > 0;

  return {
    state,
    setState,
    undo,
    redo,
    reset,
    pastStates: past,
    futureStates: future,
    isUndoPossible,
    isRedoPossible,
  };
};

export default useTimeMachine;
