import data from '../../seed-data/expressions.json';

export class ExpressionLoader {
    static loadExpressionOfTheDay(): string[] {
        const allExpressions = this.loadExpressions();
        const randomIndex = this.findNumberOfTheDay(allExpressions.length)
        const randomExpression = allExpressions[randomIndex];

        const expressionOfTheDay = randomExpression.split('');
        return expressionOfTheDay
    }

    static loadExpressions(): string[] {
        const jsonData = data.expressions as string[];
        return jsonData.map((s) => s as string);
    };

    static findNumberOfTheDay(lessThanNumber: number): number {
        const now = new Date()
        const start = new Date(2024, 0, 0)
        const diff = Number(now) - Number(start)

        let day = Math.floor(diff / (1000 * 60 * 60 * 24))

        while (day > lessThanNumber) {
            day -= lessThanNumber
        }
        return day
    }
};