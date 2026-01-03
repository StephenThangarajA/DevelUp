import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, icon, color = 'primary', trend }) => {
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-content">
        <div className="stats-info">
          <h3 className="stats-title">{title}</h3>
          <div className="stats-value">{value}</div>
          {trend && (
            <div className={`stats-trend ${trend.direction}`}>
              <span className="trend-icon">
                {trend.direction === 'up' ? '↗️' : '↘️'}
              </span>
              <span className="trend-value">{trend.value}</span>
            </div>
          )}
        </div>
        <div className="stats-icon">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;