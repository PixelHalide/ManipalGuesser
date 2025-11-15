'use client'

import { useState, useEffect } from 'react';

interface ProgressBarProps {
  targetProgress: number;
  intervalTime: number;
}

const ProgressBar = ({ targetProgress, intervalTime}: ProgressBarProps) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if (currentProgress >= targetProgress) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentProgress((prevProgress) => {
        const nextProgress = prevProgress + 1;
        if (nextProgress >= targetProgress) {
          clearInterval(interval);
          return targetProgress;
        }
        return nextProgress;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [currentProgress, targetProgress, intervalTime]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden mt-4 mb-2">
      <div
        className="bg-blue-500 h-8 rounded-full"
        style={{ width: `${currentProgress.toFixed(0)}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-800">
        {Math.round(currentProgress)}%
      </span>
    </div>
  );
};

export default ProgressBar;