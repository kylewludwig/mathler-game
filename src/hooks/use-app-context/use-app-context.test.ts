import { useAppContext } from "./use-app-context";
import { renderHook, act } from "@testing-library/react";
import { initialGameBoardState } from "../../store/game-board/game-board-types";
import { initialExpressionFieldState } from "../../store/expression-field/expression-field-types";
import { TileStatus } from "../../store/tile/tile-types";
import { StoreProvider } from "../../store/store"; // Import the StoreProvider
import { ExpressionLoader, Calculator } from "../../services/utils";

describe("useAppContext", () => {
    it("should return initial app context", () => {
        // Given
        const { result } = renderHook(() => useAppContext(), { wrapper: StoreProvider });

        // When

        // Then
        const expectedState = {
            ...initialGameBoardState(),
            currentExpression: {
                ...initialExpressionFieldState
            }
        }
        expect(result.current.state).toEqual(expectedState);
    });

    it("should reset game", () => {
        // Given
        const { result } = renderHook(() => useAppContext(), { wrapper: StoreProvider });

        // When
        act(() => {
            result.current.dispatch.resetGame();
        })

        // Then
        const targetExpression = ExpressionLoader.loadExpressionOfTheDay();
        const targetResult = Calculator.computeResult(targetExpression);

        const expectedState = {
            ...initialGameBoardState(),
            targetExpression: targetExpression,
            targetResult: targetResult,
            currentExpression: {
                ...initialExpressionFieldState
            },
        }
        expect(result.current.state).toEqual(expectedState);
    })

    it("should add value", () => {
        // Given
        const { result } = renderHook(() => useAppContext(), { wrapper: StoreProvider });

        // When
        act(() => {
            result.current.dispatch.addValue('1');
        })

        // Then
        const expectedState = {
            ...initialGameBoardState(),
            currentExpression: {
                ...initialExpressionFieldState,
                currentColumnIndex: 1,
                tiles: [
                    {
                        value: '1',
                        status: TileStatus.INITIAL
                    },
                    ...initialExpressionFieldState.tiles.slice(0,-1),
                ]
            }
        }
        expect(result.current.state).toEqual(expectedState);
    })

    it("should remove value", () => {
        // Given
        const { result } = renderHook(() => useAppContext(), { wrapper: StoreProvider });

        // When
        act(() => {
            result.current.dispatch.addValue('1');
            result.current.dispatch.removeValue();
        })

        // Then
        const expectedState = {
            ...initialGameBoardState(),
            currentExpression: {
                ...initialExpressionFieldState,
                currentColumnIndex: 0,
            }
        }
        expect(result.current.state).toEqual(expectedState)
    })

    it('should reset entry errors', () => {
        // Given
        const { result } = renderHook(() => useAppContext(), { wrapper: StoreProvider });
        
        // When
        act(() => {
            result.current.dispatch.removeValue();
        })
        const errorState = {
            ...initialGameBoardState(),
            currentExpression: {
                ...initialExpressionFieldState,
                error: Error('Too few entries'),
            }
        }
        expect(result.current.state).toEqual(errorState)

        act(() => {
            result.current.dispatch.resetEntryError();
        })

        // Then
        const expectedState = {
            ...initialGameBoardState(),
            currentExpression: {
                ...initialExpressionFieldState,
                error: null
            }
        }
        expect(result.current.state).toEqual(expectedState)
    })

    it("should submit values", () => {
        // Given
        const { result } = renderHook(() => useAppContext(), { wrapper: StoreProvider });
        
        // When
        act(() => {
            result.current.dispatch.submitExpression();
        })

        // Then
        const expectedState = {
            ...initialGameBoardState(),
            currentExpression: {
                ...initialExpressionFieldState,
                error: Error('Not enough entries'),
            },
        }
        expect(result.current.state).toEqual(expectedState)
    })
})


