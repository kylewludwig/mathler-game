import { GameOverModal } from "./game-over-modal";
import { render, fireEvent } from "@testing-library/react";

describe("GameOverModal", () => {
    it("renders without crashing", () => {
        // Given

        // When
        render(<GameOverModal setModalOpen={() => {}} isWinner={true} />);

        // Then

    });

    it('closes modal on click', () => {
        // Given
        const setModalOpen = vi.fn();
        const { getByText } = render(<GameOverModal setModalOpen={setModalOpen} isWinner={true} />);

        // When
        const closeButton = getByText('Okay');
        fireEvent.click(closeButton);

        // Then
        expect(setModalOpen).toHaveBeenCalledOnce();
    })
})