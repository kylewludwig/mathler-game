import { Scoreboard } from "./scoreboard";
import { render, screen } from "@testing-library/react";

describe("Scoreboard", () => {
    it("renders without crashing", () => {
        // Given

        // When
        render(<Scoreboard targetResult={0} remainingAttempts={0} />);

        // Then

    });

    it("renders values from props", () => {
        // Given
        const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
        const targetResult = randomIntFromInterval(0, 100);
        const remainingAttempts =  randomIntFromInterval(0, 100);

        // When
        render(<Scoreboard targetResult={targetResult} remainingAttempts={remainingAttempts} />);

        // Then
        const targetResultElement = screen.getByText(`Target Result: ${targetResult}`);
        expect(targetResultElement).toBeDefined();

        const remainingAttemptsElement = screen.getByText(`Remaining Attempts: ${remainingAttempts}`)
        expect(remainingAttemptsElement).toBeDefined();
    })
});