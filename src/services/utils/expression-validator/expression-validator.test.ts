import { TileStatus } from "../../../store/tile/tile-types";
import { ExpressionValidator } from "./expression-validator";

describe('ExpressionValidator', () => {
    it('validates expressions with 5 characters and all single numbers and operators', () => {
      // Given
      const expression = ['1', '+', '3', '*', '5'];
  
      // When
      const result = ExpressionValidator.validateExpression(expression);
  
      // Then
      expect(result).toBe(true);
    })
  
    it('validates expressions with 5 characters and 3 numbers, an operator, and 1 number', () => {
      // Given
      const expression = ['129', '-', '8'];
  
      // When
      const result = ExpressionValidator.validateExpression(expression);
  
      // Then
      expect(result).toBe(true);
    })
  
    it('validates expressions with 5 characters and 2 numbers, an operator, and 2 numbers', () => {
      // Given
      const expression = ['12', '-', '28'];
  
      // When
      const result = ExpressionValidator.validateExpression(expression);
  
      // Then
      expect(result).toBe(true);
    })
  
    it('validates expressions with 5 characters and 1 number, an operator, and 3 numbers', () => {
      // Given
      const expression = ['1', '+', '529'];
  
      // When
      const result = ExpressionValidator.validateExpression(expression);
  
      // Then
      expect(result).toBe(true);
    })
  
    it('invalidates expressions with only 4 or less characters', () => {
      // Given
      const expression = ['12', '+', '3'];
  
      // When
      const result = ExpressionValidator.validateExpression(expression);
  
      // Then
      expect(result).toBe(false);
    })
  
    it('invalidates expressions with 6 or more characters', () => {
      // Given
      const expression = ['1', '+', '36', '*', '5'];
  
      // When
      const result = ExpressionValidator.validateExpression(expression);
  
      // Then
      expect(result).toBe(false);
    })
  
    it('invalidates expressions with 5 characters and double operators', () => {
      // Given
      const expression = ['1', '+/', '3', '*', '5'];
  
      // When
      const result = ExpressionValidator.validateExpression(expression);
  
      // Then
      expect(result).toBe(false);
    })

    it('compares expressions with correct matches with correct tiles', () => {
      // Given
      const guessedExpression = ['1', '+', '3', '*', '5'];
      const targetExpression = ['1', '+', '3', '*', '5'];

      // When
      const result = ExpressionValidator.compareExpressions(guessedExpression, targetExpression);

      // Then
      expect(result).toEqual([
        {
          value: '1',
          status: TileStatus.CORRECT
        },
        {
          value: '+',
          status: TileStatus.CORRECT
        },
        {
          value: '3',
          status: TileStatus.CORRECT
        },
        {
          value: '*',
          status: TileStatus.CORRECT
        },
        {
          value: '5',
          status: TileStatus.CORRECT
        },
      ])
    })

    it('compares expressions with matches present with present tiles', () => {
      // Given
      const guessedExpression = ['3', '*', '5', '+', '1'];
      const targetExpression = ['1', '+', '3', '*', '5'];

      // When
      const result = ExpressionValidator.compareExpressions(guessedExpression, targetExpression);

      // Then
      expect(result).toEqual([
        {
          value: '3',
          status: TileStatus.PRESENT
        },
        {
          value: '*',
          status: TileStatus.PRESENT
        },
        {
          value: '5',
          status: TileStatus.PRESENT
        },
        {
          value: '+',
          status: TileStatus.PRESENT
        },
        {
          value: '1',
          status: TileStatus.PRESENT
        },
      ])
    })

  it('compares expressions missing matches with absent tiles', () => {
    // Given
    const guessedExpression = ['6', '/', '7', '-', '8'];
    const targetExpression = ['1', '+', '3', '*', '5'];

    // When
    const result = ExpressionValidator.compareExpressions(guessedExpression, targetExpression);

    // Then
    expect(result).toEqual([
      {
        value: '6',
        status: TileStatus.ABSENT
      },
      {
        value: '/',
        status: TileStatus.ABSENT
      },
      {
        value: '7',
        status: TileStatus.ABSENT
      },
      {
        value: '-',
        status: TileStatus.ABSENT
      },
      {
        value: '8',
        status: TileStatus.ABSENT
      },
    ])
  })

  it('compares expressions with various matches with absent, present, and correct tiles', () => {
    // Given
    const guessedExpression = ['1', '*', '3', '-', '8'];
    const targetExpression = ['1', '+', '3', '*', '5'];

    // When
    const result = ExpressionValidator.compareExpressions(guessedExpression, targetExpression);

    // Then
    expect(result).toEqual([
      {
        value: '1',
        status: TileStatus.CORRECT
      },
      {
        value: '*',
        status: TileStatus.PRESENT
      },
      {
        value: '3',
        status: TileStatus.CORRECT
      },
      {
        value: '-',
        status: TileStatus.ABSENT
      },
      {
        value: '8',
        status: TileStatus.ABSENT
      },
    ])
  })

  it('compares expressions that do not have 5 characters with an empty array', () => {
    // Given
    const guessedExpression = ['1', '+', '3', '*'];
    const targetExpression = ['1', '+', '3', '*', '5'];

    // When
    const result = ExpressionValidator.compareExpressions(guessedExpression, targetExpression);

    // Then
    expect(result).empty;
  })
})