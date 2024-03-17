import { gameBoardReducer } from './game-board-reducer';
import { GameBoardAction } from './game-board-actions';
import { initialGameBoardState } from './game-board-types';
import { TileStatus } from '../tile/tile-types';
import { ExpressionLoader, Calculator } from '../../services/utils';

describe('gameBoardReducer', () => {
    it('should reset the game to use expression of the day', () => {
        // Given
        const intialState = initialGameBoardState();

        // When
        const resetState = gameBoardReducer(initialGameBoardState(), {
            type: GameBoardAction.RESET_GAME,
            payload: null 
        });

        // Then
        expect(resetState).toEqual(intialState);

        const expressionOfTheDay = ExpressionLoader.loadExpressionOfTheDay();
        expect(resetState.targetExpression).toEqual(expressionOfTheDay);

        const expressionOfTheDayResult = Calculator.computeResult(expressionOfTheDay);
        expect(resetState.targetResult).toEqual(expressionOfTheDayResult);
    });

    it('should submit the game for absent tiles', () => {
        // Given
        const targetExpression = ['1', '*', '2', '+', '3'];
        const targetResult = 5;
        const initialState = {
            ...initialGameBoardState(),
            targetExpression: targetExpression,
            targetResult: targetResult
        }

        // When
        const givenExpression = ['9', '-', '8', '/', '4'];
        const newState = gameBoardReducer(initialState, {
            type: GameBoardAction.SUBMIT_GAME,
            payload: givenExpression
        });

        // Then
        const previousRowIndex = newState.currentRowIndex - 1;
        const currentRow = newState.submissions[previousRowIndex];
        currentRow.forEach((tile, index) => {
            expect(tile.status).toBe(TileStatus.ABSENT);
            expect(tile.value).not.toBe(targetExpression[index]);
        })
        expect(currentRow.length).toBe(5);
    });

    it('should submit the game for present tiles', () => {
        // Given
        const targetExpression = ['1', '*', '2', '+', '3'];
        const targetResult = 5;
        const initialState = {
            ...initialGameBoardState(),
            targetExpression: targetExpression,
            targetResult: targetResult
        }

        // When
        const givenExpression = ['3', '+', '1', '*', '2'];
        const newState = gameBoardReducer(initialState, {
            type: GameBoardAction.SUBMIT_GAME,
            payload: givenExpression
        })

        // Then
        const previousRowIndex = newState.currentRowIndex - 1;
        const currentRow = newState.submissions[previousRowIndex];
        currentRow.forEach((tile, index) => {
            expect(tile.status).toBe(TileStatus.PRESENT);
            expect(tile.value).not.toBe(targetExpression[index]);
        })
        expect(currentRow.length).toBe(5);
    });

    it('should submit the game for correct tiles', () => {
        // Given
        const targetExpression = ['1', '*', '2', '+', '3'];
        const targetResult = 5;
        const initialState = {
            ...initialGameBoardState(),
            targetExpression: targetExpression,
            targetResult: targetResult
        }

        // When
        const givenExpression = targetExpression;
        const newState = gameBoardReducer(initialState, {
            type: GameBoardAction.SUBMIT_GAME,
            payload: givenExpression
        })

        // Then
        const previousRowIndex = newState.currentRowIndex - 1;
        const currentRow = newState.submissions[previousRowIndex];
        currentRow.forEach((tile, index) => {
            expect(tile.status).toBe(TileStatus.CORRECT);
            expect(tile.value).toBe(targetExpression[index]);
        })
        expect(currentRow.length).toBe(5);
    })

    it('should submit the game for a combination of absent, present and correct tiles', () => {
        // Given
        const targetExpression = ['1', '*', '2', '+', '3'];
        const targetResult = 5;
        const initialState = {
            ...initialGameBoardState(),
            targetExpression: targetExpression,
            targetResult: targetResult
        }

        // When
        const givenExpression = ['9', '-', '4', '+', '1'];
        const newState = gameBoardReducer(initialState, {
            type: GameBoardAction.SUBMIT_GAME,
            payload: givenExpression
        })

        // Then
        const previousRowIndex = newState.currentRowIndex - 1;
        const currentRow = newState.submissions[previousRowIndex];
        currentRow.forEach((tile, index) => {
            if (index <= 2) {
                expect(tile.status).toBe(TileStatus.ABSENT);
                expect(tile.value).not.toBe(targetExpression[index]);
            } else if (index === 3) {
                expect(tile.status).toBe(TileStatus.CORRECT);
                expect(tile.value).toBe(targetExpression[index]);
            } else {
                expect(tile.status).toBe(TileStatus.PRESENT);
                expect(tile.value).not.toBe(targetExpression[index]);
            }
        })
        expect(currentRow.length).toBe(5);
    });

    it('should submit the game to advance the row', () => {
        // Given
        const givenExpression = ['1', '-', '3', '+', '4'];

        // When
        const newState = gameBoardReducer(initialGameBoardState(), {
            type: GameBoardAction.SUBMIT_GAME,
            payload: givenExpression
        });
        
        // Then
        expect(newState.currentRowIndex).toBe(1);
    });

    it('should submit the game for a winning result', () => {
        // Given
        const givenExpression = ['1', '-', '3', '+', '4'];
        const activeState = {
            ...initialGameBoardState(),
            targetExpression: givenExpression,
            targetResult: Calculator.computeResult(givenExpression),
            currentRowIndex: 4
        }

        // When
        const newState = gameBoardReducer(activeState, {
            type: GameBoardAction.SUBMIT_GAME,
            payload: givenExpression
        });
        
        // Then
        expect(newState.isWinner).toBe(true);
        expect(newState.currentRowIndex).toBe(5);
    });

    it('should submit the game for a losing result', () => {
        // Given
        const givenExpression = ['8', '+', '3', '-', '3'];
        const targetExpression = ['1', '-', '3', '+', '5'];
        const activeState = {
            ...initialGameBoardState(),
            targetExpression: targetExpression,
            targetResult: Calculator.computeResult(targetExpression),
            currentRowIndex: 5
        }

        // When
        const newState = gameBoardReducer(activeState, {
            type: GameBoardAction.SUBMIT_GAME,
            payload: givenExpression
        });
        
        // Then
        expect(newState.isWinner).toBe(false);
        expect(newState.currentRowIndex).toBe(6);
    });

    it('should not submit to advance beyond 6 rows', () => {
        // Given
        const givenExpression = ['1', '-', '3', '+', '4'];
        const targetExpression = ['1', '-', '3', '+', '5'];
        const activeState = {
            ...initialGameBoardState(),
            targetExpression: targetExpression,
            targetResult: Calculator.computeResult(targetExpression),
            currentRowIndex: 6,
            isWinner: null
        }

        // When
        const newState = gameBoardReducer(activeState, {
            type: GameBoardAction.SUBMIT_GAME,
            payload: givenExpression
        })

        // Then
        expect(newState.currentRowIndex).toBe(6);
        expect(newState.isWinner).toBe(null);
    });

    it('should not submit to advance rows when game is lost', () => {
        // Given
        const givenExpression = ['1', '-', '3', '+', '4'];
        const targetExpression = ['1', '-', '3', '+', '5'];
        const activeState = {
            ...initialGameBoardState(),
            targetExpression: targetExpression,
            targetResult: Calculator.computeResult(targetExpression),
            currentRowIndex: 5,
            isWinner: false
        }

        // When
        const newState = gameBoardReducer(activeState, {
            type: GameBoardAction.SUBMIT_GAME,
            payload: givenExpression
        })

        // Then
        expect(newState.currentRowIndex).toBe(5);
        expect(newState.isWinner).toBe(false);
    });
})