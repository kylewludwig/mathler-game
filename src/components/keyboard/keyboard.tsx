import './keyboard.css';
import React from 'react';
import { keyboardNumericKeys, keyboardOperatorKeys, keyboardControlKeys, KeyboardKey } from '../../store/keyboard/keyboard-types';

interface KeyboardProps {
  onKeyPress: (key: KeyboardKey) => void
}

export const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {

  return (
    <div id='keyboard'>
      <div className='keyboard__row'>
        { keyboardNumericKeys.map((key) => (
          <button className='keyboard__key' data-key={key.key} aria-label={`Add ${key.key}`} aria-disabled='false' key={key.value} onClick={() => onKeyPress(key)}>
            {key.key}
          </button>
        ))}
      </div>
      <div className='keyboard__row'>
        { keyboardControlKeys.slice(0, 1).map((key) => (
          <button className='keyboard__key' data-key={key.key} aria-label={key.key} aria-disabled='false' key={key.value} onClick={() => onKeyPress(key)}>
            {key.key}
          </button>
        ))}
        { keyboardOperatorKeys.map((key) => (
          <button className='keyboard__key' data-key={key.key} aria-label={`Add ${key.key}`} aria-disabled='false' key={key.value} onClick={() => onKeyPress(key)}>
            {key.key}
          </button>
        ))}
        { keyboardControlKeys.slice(-1).map((key) => (
          <button className='keyboard__key' data-key={key.key} aria-label={key.key} aria-disabled='false' key={key.value} onClick={() => onKeyPress(key)}>
            {key.key}
          </button>
        ))}
      </div>
    </div>
  );
};