import { TileState, initialTileState } from "../tile/tile-types";

export interface ExpressionFieldState {
    tiles: TileState[];
    currentColumnIndex: number;
    error: Error | null;
}

export const initialExpressionFieldState: ExpressionFieldState = {
    tiles: Array.from({ length: 5 }, () => { return initialTileState }),
    currentColumnIndex: 0,
    error: null
} 