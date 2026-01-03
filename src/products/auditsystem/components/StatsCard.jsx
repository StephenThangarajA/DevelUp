import React from 'react';
import './StatsCard.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StatsCard = ({ title, value, changeLabel, trend = 'up', color = '#1976D2' }) => {
  const showTrend = trend === 'up' || trend === 'down';

  return (
    <div className="as-stats-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="as-stats-header">
        <h3 className="as-stats-title">{title}</h3>
      </div>
      {showTrend && (
        <div className="as-stats-icon" style={{ backgroundColor: color }}>
          {trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
        </div>
      )}
      <div className="as-stats-value">{value}</div>
      {changeLabel && (
        <div className={`as-stats-change ${showTrend ? trend : ''}`}>
          {showTrend && (
            <span className="as-change-indicator">
              {trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
            </span>
          )}
          {changeLabel}
        </div>
      )}
    </div>
  );
};

export default StatsCard;