import { ExpressionLoader } from './expression-loader';

describe('ExpressionLoader', () => {
  it('loads an expression of the day', () => {
    // Given

    // When
    const expressionOfTheDay = ExpressionLoader.loadExpressionOfTheDay();

    // Then
    expect(expressionOfTheDay.length).toBeGreaterThan(0);
  })

  it('loads expression strings from json file', () => {
    // Given

    // When
    const expressions = ExpressionLoader.loadExpressions();

    // Then
    expect(expressions.length).toBeGreaterThan(0);
    expressions.forEach((expression: string) => {
        expect(expression.length).toBeGreaterThan(0)
        expectTypeOf(expression).toBeString();
    });
  })

  it('finds a random number of the day less than the number of answers', () => {
    // Given
    const numberOfAnswers = 39;

    // When
    const numberOfTheDay = ExpressionLoader.findNumberOfTheDay(numberOfAnswers);

    // Then
    expect(numberOfTheDay).toBeLessThan(numberOfAnswers);
  });
});


