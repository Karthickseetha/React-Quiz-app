import React, { useEffect, useState } from 'react';

const Timer = ({ time, onTimeout, isTiming }) => {
  const [secondsLeft, setSecondsLeft] = useState(time);

  useEffect(() => {
    if (isTiming) {
      const timer = setTimeout(() => {
        if (secondsLeft > 0) {
          setSecondsLeft(secondsLeft - 1);
        } else {
          onTimeout();
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [secondsLeft, isTiming, onTimeout]);

  return <div className="text-red-500 font-bold">Time Left: {secondsLeft} seconds</div>;
};

export default Timer;
