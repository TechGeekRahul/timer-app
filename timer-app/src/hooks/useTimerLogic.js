import { useState, useEffect, useCallback } from 'react';
import { useTimer } from '../context/TimerContext';

export const useTimerLogic = (timer, onComplete) => {
  const [timeLeft, setTimeLeft] = useState(timer.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [showHalfwayAlert, setShowHalfwayAlert] = useState(false);
  const { dispatch } = useTimer();

  const calculateProgress = useCallback(() => {
    return ((timer.duration - timeLeft) / timer.duration) * 100;
  }, [timer.duration, timeLeft]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(timer.duration);
    setShowHalfwayAlert(false);
  }, [timer.duration]);

  const complete = useCallback(() => {
    setIsRunning(false);
    dispatch({
      type: 'ADD_TO_HISTORY',
      payload: {
        id: Date.now(),
        timerId: timer.id,
        name: timer.name,
        completedAt: new Date().toISOString(),
      },
    });
    dispatch({
      type: 'UPDATE_TIMER',
      payload: { ...timer, status: 'completed' },
    });
    if (onComplete) {
      onComplete();
    }
  }, [dispatch, timer, onComplete]);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          if (newTime === Math.floor(timer.duration / 2) && timer.halfwayAlert) {
            setShowHalfwayAlert(true);
          }
          if (newTime === 0) {
            complete();
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, timer.duration, timer.halfwayAlert, complete]);

  return {
    timeLeft,
    isRunning,
    showHalfwayAlert,
    progress: calculateProgress(),
    start,
    pause,
    reset,
    setShowHalfwayAlert,
  };
}; 