import './game-board.css';
import React from "react";
import { useAppContext } from '../../hooks';
import { ExpressionField } from "..";

interface GameBoardProps {}

export const GameBoard: React.FC<GameBoardProps> = () => {
  const { state } = useAppContext();
  
  function renderFields() {
    return Array.from({ length: 6 }, (_, rowIndex) => {
      return <ExpressionField 
        key={rowIndex}
        rowIndex={rowIndex}
        isActive={rowIndex === state.currentRowIndex && state.isWinner === null}
      />
    });
  }

  return (
    <div className="tile-grid">    
      {renderFields()}
    </div>
  );
};