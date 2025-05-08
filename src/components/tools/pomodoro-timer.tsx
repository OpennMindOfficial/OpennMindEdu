
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = React.useState(25 * 60); // 25 minutes
  const [isActive, setIsActive] = React.useState(false);
  const [isBreak, setIsBreak] = React.useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Handle timer end (e.g., switch to break/work, play sound)
      setIsActive(false);
      // Basic toggle logic
      if (!isBreak) {
        setTimeLeft(5 * 60); // 5 min break
      } else {
        setTimeLeft(25 * 60); // Back to work
      }
      setIsBreak(!isBreak);
      // Add notification logic here if desired
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isBreak]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full bg-background text-foreground">
      <h3 className="font-semibold mb-4">{isBreak ? 'Break Time' : 'Focus Time'}</h3>
      <div className="text-6xl font-mono font-bold mb-6">
        {formatTime(timeLeft)}
      </div>
      <div className="flex space-x-4">
        <Button onClick={toggleTimer} size="icon" variant="ghost">
          {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </Button>
        <Button onClick={resetTimer} size="icon" variant="ghost">
          <RotateCcw className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
