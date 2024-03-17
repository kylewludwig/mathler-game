import './game-over-modal.css'
import React from "react";

interface GameOverModalProps {
    setModalOpen: (modalOpen:boolean) => void;
    isWinner: boolean;
}
export const GameOverModal: React.FC<GameOverModalProps> = ({ setModalOpen, isWinner }) => {
    
    const renderContent = () => {
        if (isWinner) {
            return "You won!";
        } else {
            return "You lost!";
        }
    }

    return (
        <div className="game-over-modal__background">
            <div className="game-over-modal">
                <div className='game-over-modal__content'>
                    <h3>{renderContent()}</h3>
                    <button onClick={() => setModalOpen(false)}>Okay</button>
                </div>
            </div>
        </div>
    )
}