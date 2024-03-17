import { ExpressionValidator } from '../';

export class Calculator {
  static computeResult(expression: string[]): number {
    if (expression.length !== 5 || !(ExpressionValidator.validateExpression(expression))) {
      throw new Error('Invalid expression');
    }
    const [leftOperand, operator1, middleOperand, operator2, rightOperand] = expression;
    let result: number = 0;
    if (operator1 === "*" || operator1 === "/") {
      result = Calculator.performOperation(+leftOperand, operator1, +middleOperand);
      result = Calculator.performOperation(result, operator2, +rightOperand);
    } else if (operator2 === "*" || operator2 === "/") {
      result = Calculator.performOperation(+middleOperand, operator2, +rightOperand);
      result = Calculator.performOperation(+leftOperand, operator1, result);
    } else {
      result = Calculator.performOperation(+leftOperand, operator1, +middleOperand);
      result = Calculator.performOperation(result, operator2, +rightOperand);
    }
    return result;
  }

  static performOperation(leftOperand: number, operator: string, rightOperand: number): number {
    switch(operator) {
      case '+':
        return leftOperand + rightOperand;
      case '-':
        return leftOperand - rightOperand;
      case '*':
        return leftOperand * rightOperand;
      case '/':
        return Math.floor(leftOperand / rightOperand);
      default:
        throw new Error('Invalid operator');
    }
  }
}