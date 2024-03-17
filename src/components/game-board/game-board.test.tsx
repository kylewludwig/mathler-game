import { GameBoard } from "./game-board";
import { render } from "@testing-library/react";
import { StoreProvider } from "../../store/store";

describe("GameBoard", () => {
    it("renders without crashing", () => {
        // Given

        // When
        render(
            <StoreProvider>
                <GameBoard />
            </StoreProvider>
        );

        // Then

    });

    it("renders 6 expression fields", () => {
        // Given
        const { container } = render(
            <StoreProvider>
                <GameBoard />
            </StoreProvider>
        );

        // When
        const expressionFields = container.getElementsByClassName('tile-list');

        // Then
        expect(expressionFields).toHaveLength(6);
    })
})