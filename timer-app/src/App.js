import React, { useState } from 'react';
import { TimerProvider } from './context/TimerContext';
import TimerList from './components/TimerList';
import AddTimer from './components/AddTimer';
import History from './components/History';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('timers');
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <TimerProvider>
      <div className={`app ${theme}`}>
        <header className="app-header">
          <h1>Timer App</h1>
          <div className="header-controls">
            <button onClick={toggleTheme} className="btn btn-theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <nav>
              <button
                className={`btn ${currentView === 'timers' ? 'active' : ''}`}
                onClick={() => setCurrentView('timers')}
              >
                Timers
              </button>
              <button
                className={`btn ${currentView === 'history' ? 'active' : ''}`}
                onClick={() => setCurrentView('history')}
              >
                History
              </button>
            </nav>
          </div>
        </header>

        <main className="app-main">
          {currentView === 'timers' ? (
            <>
              <AddTimer />
              <TimerList />
            </>
          ) : (
            <History />
          )}
        </main>
      </div>
    </TimerProvider>
  );
}

export default App; 