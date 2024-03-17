import { GameBoardAction } from "./game-board-actions";
import { GameBoardState, initialGameBoardState } from "./game-board-types";
import { TileStatus } from "../tile/tile-types";
import { ExpressionLoader, Calculator, ExpressionValidator } from "../../services/utils";

export function gameBoardReducer(state: GameBoardState, action: { type: GameBoardAction; payload: any }): GameBoardState {
    switch (action.type) {
    case GameBoardAction.RESET_GAME:
        const expressionOfTheDay = ExpressionLoader.loadExpressionOfTheDay();
        const expressionOfTheDayResult = Calculator.computeResult(expressionOfTheDay);
        return {
            ...initialGameBoardState(),
            targetExpression: expressionOfTheDay,
            targetResult: expressionOfTheDayResult
        }
    case GameBoardAction.SUBMIT_GAME:
        if (state.currentRowIndex >= 6 || state.isWinner !== null) { return state; } // Game over
        const givenExpression = action.payload as string[];

        const isValidExpression = ExpressionValidator.validateExpression(givenExpression);
        if (!isValidExpression) {
            return state; // Not enough entries or Invalid expression
        }
        
        const newSubmission = ExpressionValidator.compareExpressions(givenExpression, state.targetExpression);
        if (newSubmission.length === 0) {
            return state // Not enough entries
        }

        const isWinner = newSubmission.every(tile => tile.status === TileStatus.CORRECT)
            ? true
            : (state.currentRowIndex + 1 >= 6)
                ? false
                : null
        
        const resultingSubmissions = state.submissions.map((row, rowIndex) => {
            return rowIndex === state.currentRowIndex
                ? newSubmission
                : row
        })
        
        return {
            ...state,
            submissions: resultingSubmissions,
            currentRowIndex: state.currentRowIndex + 1,
            isWinner: isWinner
        }
    default:
        throw new Error('Received unknown GameBoardAction');
    }
}