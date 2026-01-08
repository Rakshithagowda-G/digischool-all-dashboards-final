// StatCard component 
import React from 'react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="p-5 bg-white rounded-lg shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium text-gray-500 uppercase">{title}</h4>
        <span className="text-3xl font-bold text-gray-800">{value}</span>
      </div>
      <div className={`p-3 rounded-full bg-gray-100 ${color}`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

export default StatCard;
