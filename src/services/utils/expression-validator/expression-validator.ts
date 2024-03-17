import { TileState, TileStatus } from "../../../store/tile/tile-types";

export class ExpressionValidator {
  /**
  /* Verify if the given five-digit expression string array is in the correct format, validated by the regular expression.
  /* Valid formats include:
  /* 1. Three digits, one operator, one digit
  /* 2. Two digits, one operator, two digits
  /* 3. One digit, one operator, one digit, one operator, one digit
  /* 4. One digit, one operator, three digits
  /*
  /* @param {string[]} expression - the array of strings representing the expression
  /* @return {boolean} true if the expression string array matches the specified format, false otherwise
   */
  static validateExpression(expression: string[]): boolean {
    const expressionString = expression.join('');
    const regex = /^(?:\d[+\-*/]\d{3}|\d{3}[+\-*/]\d|\d[+\-*/]\d[+\-*/]\d|\d{2}[+\-*/]\d{2})$/;
    return regex.test(expressionString);
  }

  static compareExpressions(givenExpression: string[], targetExpression: string[]): TileState[] {
    if (givenExpression.length !== targetExpression.length) {
      return [];
    }
    const resultingExpression = givenExpression.map((value, index) => {
      if (value === targetExpression[index]) {
        return {
            value: value,
            status: TileStatus.CORRECT
        }
      } else if (targetExpression.includes(value)) {
        return {
            value: value,
            status: TileStatus.PRESENT
        }
      } else {
        return {
            value: value,
            status: TileStatus.ABSENT
        }
      }
    }, [] as TileState[]);

    return resultingExpression;
  }
}