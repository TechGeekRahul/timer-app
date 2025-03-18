import React, { createContext, useContext, useReducer, useEffect } from 'react';

const TimerContext = createContext();

const initialState = {
  timers: [],
  history: [],
  categories: ['Workout', 'Study', 'Break', 'Other'],
  selectedCategory: 'all'
};

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TIMER':
      const newTimers = [...state.timers, action.payload];
      localStorage.setItem('timers', JSON.stringify(newTimers));
      return { ...state, timers: newTimers };

    case 'UPDATE_TIMER':
      const updatedTimers = state.timers.map(timer =>
        timer.id === action.payload.id ? action.payload : timer
      );
      localStorage.setItem('timers', JSON.stringify(updatedTimers));
      return { ...state, timers: updatedTimers };

    case 'ADD_TO_HISTORY':
      const newHistory = [...state.history, action.payload];
      localStorage.setItem('history', JSON.stringify(newHistory));
      return { ...state, history: newHistory };

    case 'LOAD_DATA':
      return {
        ...state,
        timers: action.payload.timers || [],
        history: action.payload.history || []
      };

    case 'SET_CATEGORY_FILTER':
      return {
        ...state,
        selectedCategory: action.payload
      };

    default:
      return state;
  }
};

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    const loadData = () => {
      const timers = JSON.parse(localStorage.getItem('timers')) || [];
      const history = JSON.parse(localStorage.getItem('history')) || [];
      dispatch({ type: 'LOAD_DATA', payload: { timers, history } });
    };

    loadData();
  }, []);

  const value = {
    timers: state.timers,
    history: state.history,
    categories: state.categories,
    selectedCategory: state.selectedCategory,
    dispatch
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
}; 