import React from 'react';
import { useTimer } from '../context/TimerContext';

const History = () => {
  const { history, timers } = useTimer();

  const getTimerName = (timerId) => {
    const timer = timers.find(t => t.id === timerId);
    return timer ? timer.name : 'Unknown Timer';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const exportHistory = () => {
    const historyData = JSON.stringify(history, null, 2);
    const blob = new Blob([historyData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'timer-history.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="history">
      <div className="history-header">
        <h2>Timer History</h2>
        <button onClick={exportHistory} className="btn btn-export">
          Export History
        </button>
      </div>

      {history.length === 0 ? (
        <p className="no-history">No completed timers yet</p>
      ) : (
        <div className="history-list">
          {history.map(entry => (
            <div key={entry.id} className="history-item">
              <div className="history-item-header">
                <h3>{getTimerName(entry.timerId)}</h3>
                <span className="completion-time">
                  {formatDate(entry.completedAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History; 