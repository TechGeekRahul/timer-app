import React, { useState } from 'react';
import { useTimer } from '../context/TimerContext';

const AddTimer = () => {
  const { categories, dispatch } = useTimer();
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    category: categories[0],
    halfwayAlert: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTimer = {
      id: Date.now(),
      name: formData.name,
      duration: parseInt(formData.duration, 10),
      category: formData.category,
      halfwayAlert: formData.halfwayAlert,
      status: 'idle'
    };

    dispatch({
      type: 'ADD_TIMER',
      payload: newTimer
    });

    setFormData({
      name: '',
      duration: '',
      category: categories[0],
      halfwayAlert: false
    });
  };

  return (
    <div className="add-timer">
      <h2>Add New Timer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Timer Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., Workout Timer"
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration (seconds):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min="1"
            placeholder="Enter duration in seconds"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="halfwayAlert"
              checked={formData.halfwayAlert}
              onChange={handleChange}
            />
            Enable halfway alert
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Timer
        </button>
      </form>
    </div>
  );
};

export default AddTimer; 