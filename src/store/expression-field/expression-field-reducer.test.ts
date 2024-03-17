import { expressionFieldReducer } from "./expression-field-reducer";
import { ExpressionFieldAction } from "./expression-field-actions";
import { initialExpressionFieldState, ExpressionFieldState } from "./expression-field-types";
import { TileStatus, initialTileState } from "../tile/tile-types";

describe('expressionFieldReducer', () => {
    it('should add a tile', () => {
        // Given

        // When
        const newState = expressionFieldReducer(initialExpressionFieldState, {
            type: ExpressionFieldAction.ADD_VALUE,
            payload: {
                value: '1',
                tileIndex: 0
            }
        });

        // Then
        expect(newState.tiles[0].value).toBe('1');
        expect(newState.currentColumnIndex).toBe(1);
    })

    it('should not add more than 5 tiles', () => {
        // Given
        const activeExpressionFieldState: ExpressionFieldState = {
            tiles: [
                {
                    value: '1',
                    status: TileStatus.INITIAL
                },
                {
                    value: '*',
                    status: TileStatus.INITIAL
                },
                {
                    value: '2',
                    status: TileStatus.INITIAL
                },
                {
                    value: '+',
                    status: TileStatus.INITIAL
                },
                {
                    value: '3',
                    status: TileStatus.INITIAL
                }
            ],
            currentColumnIndex: 5
        }
       
        // When
        const newState = expressionFieldReducer(activeExpressionFieldState, {
            type: ExpressionFieldAction.ADD_VALUE,
            payload: {
                value: '9',
                tileIndex: 5
            }
        })

        // Then
        newState.tiles.forEach((tile, index) => {
            expect(tile.status).toBe(TileStatus.INITIAL);
            expect(tile.value).toBe(activeExpressionFieldState.tiles[index].value);
        })
        expect(newState.currentColumnIndex).toBe(5);
    });

    it('should remove a tile', () => {
        // Given
        const activeExpressionFieldState: ExpressionFieldState = {
            tiles: [
                {
                    value: '1',
                    status: TileStatus.INITIAL
                },
                {
                    value: '*',
                    status: TileStatus.INITIAL
                }
            ],
            currentColumnIndex: 2
        }

        // When
        const newState = expressionFieldReducer(activeExpressionFieldState, {
            type: ExpressionFieldAction.REMOVE_VALUE,
            payload: null
        });
        
        // Then
        expect(newState.tiles[0].value).toBe('1');
        expect(newState.tiles[1].value).toBe('');
        expect(newState.currentColumnIndex).toBe(1);
    })

    it('should not remove beyond 0 tiles', () => {
        // Given

        // When
        const newState = expressionFieldReducer(initialExpressionFieldState, {
            type: ExpressionFieldAction.REMOVE_VALUE,
            payload: null
        });
        
        // Then
        expect(newState.tiles[0].value).toBe('');
        expect(newState.currentColumnIndex).toBe(0);
    })

    it('should remain unchanged when less than 5 tiles are submitted', () => {
        // Given
        const finalExpressionFieldState = {
            tiles: [
                {
                    value: '1',
                    status: TileStatus.INITIAL
                },
                {
                    value: '*',
                    status: TileStatus.INITIAL
                },
                {
                    value: '2',
                    status: TileStatus.INITIAL
                },
                {
                    value: '+',
                    status: TileStatus.INITIAL
                }
            ],
            currentColumnIndex: 5
        }

        // When
        const targetResult = '1*2+3'
        let newState = expressionFieldReducer(finalExpressionFieldState, {
            type: ExpressionFieldAction.SUBMIT_TILES,
            payload: targetResult
        })

        // Then
        newState.tiles.forEach((tile, index) => {
            expect(tile.status).toBe(finalExpressionFieldState.tiles[index].status);
            expect(tile.value).toBe(finalExpressionFieldState.tiles[index].value);
        })
        expect(newState.currentColumnIndex).toBe(5);
    });

    it('should remain unchanged when invalid combinations are submitted', () => {
        // Given
        const finalExpressionFieldState = {
            tiles: [
                {
                    value: '1',
                    status: TileStatus.INITIAL
                },
                {
                    value: '*',
                    status: TileStatus.INITIAL
                },
                {
                    value: '*',
                    status: TileStatus.INITIAL
                },
                {
                    value: '+',
                    status: TileStatus.INITIAL
                },
                {
                    value: '4',
                    status: TileStatus.INITIAL
                }
            ],
            currentColumnIndex: 5
        }

        // When
        const targetResult = '1*2+3'
        const newState = expressionFieldReducer(finalExpressionFieldState, {
            type: ExpressionFieldAction.SUBMIT_TILES,
            payload: targetResult
        })

        // Then
        newState.tiles.forEach((tile, index) => {
            expect(tile.status).toBe(finalExpressionFieldState.tiles[index].status);
            expect(tile.value).toBe(finalExpressionFieldState.tiles[index].value);
        })
        expect(newState.currentColumnIndex).toBe(5);
    });

    it('should reset entry errors', () => {
        // Given
        const activeExpressionFieldState: ExpressionFieldState = {
            ...initialExpressionFieldState,
            error: Error('Too few entries'),
        }

        // When
        const newState = expressionFieldReducer(activeExpressionFieldState, {
            type: ExpressionFieldAction.RESET_ERROR,
            payload: '1*2+3'
        })

        // Then
        expect(newState.error).toBe(null);
    });
});