import React from 'react';

const colorMap = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  orange: 'bg-orange-100 text-orange-700',
  red: 'bg-red-100 text-red-700',
};

const StatsCard = ({ title, value, icon, color = 'blue' }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
      <div className={`p-2 rounded-full ${colorMap[color]} flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
