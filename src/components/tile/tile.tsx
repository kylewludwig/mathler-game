import React from "react";
import './tile.css';
import { TileState, TileStatus } from "../../store/tile/tile-types";
import { NumberFormatter } from "../../services/utils/number-formatter/number-formatter";

interface TileProps {
    index: number;
	tileState: TileState;
}

export const Tile: React.FC<TileProps> = ({ index, tileState }) => {
    const {value, status} = tileState;

    const tileStatusToFillColor = (status: TileStatus) => {
        switch (status) {
            case TileStatus.CORRECT:
                return "bg-green";
            case TileStatus.PRESENT:
                return "bg-yellow";
            case TileStatus.ABSENT:
                return "bg-dark-grey";
            default:
                return "bg-white";
        }
    };

    const tileStatusToString = (status: TileStatus) => {
        switch (status) {
        case TileStatus.CORRECT:
            return "correct";
        case TileStatus.PRESENT:
            return "present";
        case TileStatus.ABSENT:
            return "absent";
        default:
            return "initial";    
        }
    }

    return (
        <div
            data-testid='tile'
            className={`tile ${tileStatusToFillColor(status)}`}
            aria-roledescription='tile'
            aria-label={`${NumberFormatter.numberToOrdinal(index+1)} guess`}
            data-state={`${tileStatusToString(status)}`}
        >
            {value}
        </div>
    );
};
