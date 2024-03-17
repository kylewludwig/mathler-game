import './scoreboard.css';
import React from "react";

interface ScoreboardProps {
    targetResult: number;
    remainingAttempts: number;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ targetResult, remainingAttempts }) => {
    return (
        <div className="scoreboard">
            <div className="scoreboard__remaining-attempts">
                {`Remaining Attempts: ${remainingAttempts}`}
            </div>
            <div className="scoreboard__target-result">
                {`Target Result: ${targetResult}`}
            </div>
        </div>
    );
}