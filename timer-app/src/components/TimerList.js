import React, { useState } from 'react';
import Timer from './Timer';
import { useTimer } from '../context/TimerContext';

const TimerList = () => {
  const { timers, categories, selectedCategory, dispatch } = useTimer();
  const [expandedCategories, setExpandedCategories] = useState(categories);

  const toggleCategory = (category) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleCategoryFilter = (event) => {
    dispatch({ type: 'SET_CATEGORY_FILTER', payload: event.target.value });
  };

  const getTimersByCategory = (category) => {
    return timers.filter(timer => timer.category === category);
  };

  const getFilteredCategories = () => {
    if (selectedCategory === 'all') {
      return categories;
    }
    return categories.filter(category => category === selectedCategory);
  };

  const handleBulkAction = (category, action) => {
    const categoryTimers = document.querySelectorAll(
      `[data-category="${category}"] .timer`
    );
    
    categoryTimers.forEach(timerElement => {
      const button = timerElement.querySelector(
        action === 'start' ? '.btn-start' :
        action === 'pause' ? '.btn-pause' :
        '.btn-reset'
      );
      if (button) {
        button.click();
      }
    });
  };

  return (
    <div className="timer-list">
      <div className="filter-section">
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={handleCategoryFilter}
          className="category-filter"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {getFilteredCategories().map(category => {
        const categoryTimers = getTimersByCategory(category);
        const isExpanded = expandedCategories.includes(category);

        return (
          <div key={category} className="category-section" data-category={category}>
            <div className="category-header">
              <button
                className={`expand-button ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleCategory(category)}
              >
                {isExpanded ? '▼' : '▶'}
              </button>
              <h2>{category}</h2>
              <div className="bulk-actions">
                <button
                  onClick={() => handleBulkAction(category, 'start')}
                  className="btn btn-bulk-start"
                >
                  Start All
                </button>
                <button
                  onClick={() => handleBulkAction(category, 'pause')}
                  className="btn btn-bulk-pause"
                >
                  Pause All
                </button>
                <button
                  onClick={() => handleBulkAction(category, 'reset')}
                  className="btn btn-bulk-reset"
                >
                  Reset All
                </button>
              </div>
            </div>

            {isExpanded && (
              <div className="category-timers">
                {categoryTimers.length > 0 ? (
                  categoryTimers.map(timer => (
                    <Timer key={timer.id} timer={timer} />
                  ))
                ) : (
                  <p className="no-timers">No timers in this category</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TimerList; 