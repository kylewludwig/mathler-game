import { TileState, initialTileState } from "../tile/tile-types";
import { ExpressionLoader, Calculator } from "../../services/utils";

export interface GameBoardState {
    targetExpression: string[];
    targetResult: number;
    submissions: TileState[][];
    currentRowIndex: number;
    isWinner: boolean | null;
}

export const initialGameBoardState = (): GameBoardState => {
    const expressionOfTheDay: string[] = ExpressionLoader.loadExpressionOfTheDay();
    const expressionOfTheDayResult: number = Calculator.computeResult(expressionOfTheDay);

    return {
        targetExpression: expressionOfTheDay,
        targetResult: expressionOfTheDayResult,
        submissions: Array.from({ length: 6 }, () => new Array(5).fill(initialTileState)),
        currentRowIndex: 0,
        isWinner: null
    }
};