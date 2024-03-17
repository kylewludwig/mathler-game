import './expression-field.css';
import React from "react";
import { useAppContext } from '../../hooks';
import { Tile } from '../';

type ExpressionFieldProps = {
  isActive: boolean,
  rowIndex: number
}

export const ExpressionField: React.FC<ExpressionFieldProps>  = ( { isActive, rowIndex }) => {
  const { state } = useAppContext();

  function renderTiles() {
    return Array.from({ length: 5 }, (_, columnIndex) => {
      return <Tile
        key={columnIndex}
        index={columnIndex}
        tileState={isActive ? state.currentExpression.tiles[columnIndex] : state.submissions[rowIndex][columnIndex]}
      />
    });
  }
  
  return (
    <div className='tile-list'>
      {renderTiles()}
    </div>
  );
};