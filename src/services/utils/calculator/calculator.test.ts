import { Calculator } from './calculator';

describe('Calculator', () => {
  it('computes result of expression with left operator precedence', () => {
    // Given
    const expression = ['9', '/', '3', '+', '5'];
      
    // When
    const result = Calculator.computeResult(expression);
  
    // Then
    expect(result).toBe(8);
  })

  it('computes result of expression with right operator precedence', () => {
    // Given
    const expression = ['1', '+', '3', '*', '5'];
    
    // When
    const result = Calculator.computeResult(expression);

    // Then
    expect(result).toBe(16);
  })

  it('computes result of expression with equal higher-level operator precedence', () => {
    // Given
    const expression = ['8', '/', '2', '*', '5'];
    
    // When
    const result = Calculator.computeResult(expression);

    // Then
    expect(result).toBe(20);
  })

  it('computes result of expression with equal lower-level operator precedence', () => {
    // Given
    const expression = ['8', '-', '2', '+', '5'];
    
    // When
    const result = Calculator.computeResult(expression);

    // Then
    expect(result).toBe(11);
  })
});
