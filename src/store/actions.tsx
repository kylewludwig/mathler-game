import { GameBoardAction } from "./game-board/game-board-actions";
import { ExpressionFieldAction } from "./expression-field/expression-field-actions";

export const AppAction = { ...GameBoardAction, ...ExpressionFieldAction };
export type AppAction = typeof AppAction;