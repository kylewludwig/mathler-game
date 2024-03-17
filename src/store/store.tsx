import { createContext, useReducer } from 'react';
import { gameBoardReducer } from './game-board/game-board-reducer';
import { initialGameBoardState } from './game-board/game-board-types';
import { expressionFieldReducer } from './expression-field/expression-field-reducer';
import { ExpressionFieldState, initialExpressionFieldState } from './expression-field/expression-field-types';
import { AppAction } from './actions';
import { TileState } from './tile/tile-types';

export const AppContext = createContext<{
  state: {
    targetExpression: string[],
    targetResult: number,
    currentExpression: ExpressionFieldState,
    currentRowIndex: number,
    submissions: TileState[][],
    isWinner: boolean | null
  },
  dispatch: {
    resetGame: () => void,
    addValue: (value: string) => void,
    removeValue: () => void,
    resetEntryError: () => void,
    submitExpression: () => void
  }
} | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [expression, expressionDispatch] = useReducer(expressionFieldReducer, initialExpressionFieldState);
  const [gameBoard, gameBoardDispatch] = useReducer(gameBoardReducer, initialGameBoardState());
  
  const { targetExpression, targetResult, currentRowIndex, submissions, isWinner } = gameBoard;

  const state = {
    targetExpression: targetExpression,
    targetResult: targetResult,
    currentExpression: expression,
    currentRowIndex: currentRowIndex,
    submissions: submissions,
    isWinner: isWinner
  }
  const dispatch = {
    resetGame: () => {
      gameBoardDispatch({ type: AppAction.RESET_GAME, payload: null });
    },
    addValue: (value: string) => {
      expressionDispatch({ type: AppAction.ADD_VALUE, payload: { value } });
    },
    removeValue: () => {
      expressionDispatch({ type: AppAction.REMOVE_VALUE, payload: null });
    },
    resetEntryError: () => {
      expressionDispatch({ type: AppAction.RESET_ERROR, payload: null });
    },
    submitExpression: () => {
      const isGameOver = state.currentRowIndex >= 6 || state.isWinner !== null
      const givenExpression = expression.tiles.map(tile => tile.value);
      expressionDispatch({ type: AppAction.SUBMIT_TILES, payload: isGameOver });
      gameBoardDispatch({ type: AppAction.SUBMIT_GAME, payload: givenExpression });
    }
  }

  return (
    <AppContext.Provider value={{state, dispatch}}>
        {children}
    </AppContext.Provider>
  )
}

export type StoreProvider = typeof StoreProvider;