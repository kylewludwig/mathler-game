import './toast-message.css';
import React, {useEffect, useState} from "react";

interface ToastMessageProps {
    message: string | undefined;
    timeout: number;
    onTimeout: () => void;
}

export const ToastMessage: React.FC<ToastMessageProps> = ({ message, timeout, onTimeout }) => {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (message) {
            setOpacity(1);
            setTimeout(() => {
                setOpacity(0);
                onTimeout();
            }, timeout);
        }
    }, [message]);

    return (
        <>
        {message &&
            <div className="toast-message" style={{opacity: opacity}}>
                <p>{message}</p>
            </div>
        }
        </>
    )
}