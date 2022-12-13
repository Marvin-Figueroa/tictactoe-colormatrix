/* eslint-disable indent */
import { useReducer } from 'react';

type ActionType<T> =
  | { type: 'SET_STATE'; data: T }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'GO_FIRST' }
  | { type: 'GO_LAST' }
  | { type: 'CLEAR_STATE'; data: T };

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
  goFirst: () => void;
  goLast: () => void;
  clear: (value: T) => void;
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
    case 'GO_FIRST':
      return {
        past: [],
        present: past[0],
        future: [...past.slice(1), present],
      };
    case 'GO_LAST':
      return {
        past: [...past, present, ...future.slice(0, future.length - 1)],
        present: future[future.length - 1],
        future: [],
      };
    case 'CLEAR_STATE':
      return {
        past: [],
        present: action.data,
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
  const goLast = (): void => dispatch({ type: 'GO_LAST' });
  const goFirst = (): void => dispatch({ type: 'GO_FIRST' });
  const clear = (value: T): void =>
    dispatch({ type: 'CLEAR_STATE', data: value });
  const isUndoPossible = past.length > 0;
  const isRedoPossible = future.length > 0;

  return {
    state,
    setState,
    undo,
    redo,
    goFirst,
    goLast,
    clear,
    pastStates: past,
    futureStates: future,
    isUndoPossible,
    isRedoPossible,
  };
};

export default useTimeMachine;
