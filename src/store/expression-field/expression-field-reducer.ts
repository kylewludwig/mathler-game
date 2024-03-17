import { ExpressionFieldAction } from "./expression-field-actions";
import { ExpressionFieldState, initialExpressionFieldState } from "./expression-field-types";
import { ExpressionValidator } from "../../services/utils";

export function expressionFieldReducer(state: ExpressionFieldState, action: { type: ExpressionFieldAction; payload: any }): ExpressionFieldState {
    switch (action.type) {
    case ExpressionFieldAction.ADD_VALUE:
        if (state.currentColumnIndex >= 5) {
            return {
                ...state,
                error: new Error('Too many entries')
            } 
        }

        const addedTiles = [...state.tiles];
        addedTiles[state.currentColumnIndex] = {
            ...addedTiles[state.currentColumnIndex],
            value: action.payload.value
        }

        const nextIndex = state.currentColumnIndex + 1;

        return {
            ...state,
            tiles: addedTiles,
            currentColumnIndex: nextIndex,
            error: null
        };
    case ExpressionFieldAction.REMOVE_VALUE:
        if (state.currentColumnIndex <= 0) {
            return {
                ...state,
                error: new Error('Too few entries')
            }
        }

        const previousIndex = state.currentColumnIndex - 1;

        const remainingTiles = [...state.tiles];
        remainingTiles[previousIndex] = {
            ...remainingTiles[previousIndex],
            value: ''
        }

        return {
            ...state,
            tiles: remainingTiles,
            currentColumnIndex: previousIndex,
            error: null
        };
    case ExpressionFieldAction.RESET_ERROR:
        return {
            ...state,
            error: null
        }
    case ExpressionFieldAction.SUBMIT_TILES:
        const isGameOver: boolean = action.payload.isGameOver
        if (isGameOver) { return state; }

        const containsEmptyEntries = state.tiles.every(tile => tile.value !== '')
        if (!containsEmptyEntries) {
            return {
                ...state,
                error: new Error('Not enough entries')
            }
        }

        const givenExpression = state.tiles.map(tile => tile.value);
        const isValidExpression = ExpressionValidator.validateExpression(givenExpression);
        if (!isValidExpression) {
            return {
                ...state,
                error: new Error('Invalid expression')
            }
        }

        // Reset state
        return initialExpressionFieldState;
    default:
        throw new Error('Received unknown ExpressionFieldAction');
    }
}