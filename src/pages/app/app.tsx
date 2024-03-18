import './app.css'
import { useState, useEffect } from 'react';
import { useAppContext } from '../../hooks';
import { GameBoard, GameOverModal, Keyboard, Scoreboard } from '../../components';
import { KeyboardKey } from '../../store/keyboard/keyboard-types';
import { ToastMessage } from '../../components/toast-message/toast-message';

export default function App() {
  const { state, dispatch } = useAppContext();
  const [isModalOpen, setModalOpen] = useState(false);
  
  useEffect(() => {
    openModal();
  }, [state.isWinner]);

  const openModal = () => {
    if (state.isWinner !== null) {
      setModalOpen(true);
    }
 }
 
  const onKeyPress = (key: KeyboardKey) => {
    switch (key.key) {
      case 'Backspace':
        dispatch.removeValue();
        break
      case 'Enter':
        dispatch.submitExpression();
        break
      default:
        dispatch.addValue(key.value);
    }
  }

  const onErrorTimeout = () => {
    dispatch.resetEntryError();
  }

  return (
    <section>
      <div className='container full-height'>
        <h2 className='text-align-center'>Mathler</h2>
        <Scoreboard targetResult={state.targetResult} remainingAttempts={state.submissions.length - state.currentRowIndex} />
        <GameBoard />
        <div className="spacer">
          <ToastMessage
            message={state.currentExpression.error?.message}
            timeout={2000}
            onTimeout={onErrorTimeout}
          />
        </div>
        <Keyboard onKeyPress={onKeyPress} />
        {isModalOpen && <GameOverModal setModalOpen={setModalOpen} isWinner={state.isWinner == true} />}
      </div>
    </section>
  );
}