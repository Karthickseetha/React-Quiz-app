import React from 'react';

const ScoreCard = ({ score }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Quiz Completed!</h2>
      <p className="text-sm">Your Score: {score}</p>
    </div>
  );
};

export default ScoreCard;
