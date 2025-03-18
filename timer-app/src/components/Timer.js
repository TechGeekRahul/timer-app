import React, { useState } from 'react';
import { useTimerLogic } from '../hooks/useTimerLogic';
import Modal from './Modal';

const Timer = ({ timer }) => {
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const {
    timeLeft,
    isRunning,
    showHalfwayAlert,
    progress,
    start,
    pause,
    reset,
    setShowHalfwayAlert,
  } = useTimerLogic(timer, () => setShowCompletionModal(true));

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <div className="timer-header">
        <h3>{timer.name}</h3>
        <span className="category-badge">{timer.category}</span>
      </div>
      
      <div className="timer-body">
        <div className="time-display">{formatTime(timeLeft)}</div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="timer-controls">
          {!isRunning ? (
            <button onClick={start} className="btn btn-start">
              Start
            </button>
          ) : (
            <button onClick={pause} className="btn btn-pause">
              Pause
            </button>
          )}
          <button onClick={reset} className="btn btn-reset">
            Reset
          </button>
        </div>
      </div>

      {showHalfwayAlert && (
        <div className="halfway-alert">
          Halfway there!
          <button 
            onClick={() => setShowHalfwayAlert(false)}
            className="btn btn-close"
          >
            ×
          </button>
        </div>
      )}

      <Modal isOpen={showCompletionModal} onClose={() => setShowCompletionModal(false)}>
        <h2>🎉 Timer Complete! 🎉</h2>
        <p>Congratulations! You've completed the timer:</p>
        <h3>{timer.name}</h3>
        <p>Great job staying focused!</p>
      </Modal>
    </div>
  );
};

export default Timer; 