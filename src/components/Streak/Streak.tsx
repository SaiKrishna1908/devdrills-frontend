import { useEffect, useState } from "react";
import "./Streak.css";

type StreakProps = {
  streak: number;
};

export default function Streak({ streak }: StreakProps) {
  const [animateFlame, setAnimateFlame] = useState(false);

  useEffect(() => {
    if (streak > 0) {
      setAnimateFlame(true);
      const timer = setTimeout(() => setAnimateFlame(false), 600);
      return () => clearTimeout(timer);
    }
  }, [streak]);

  // Fixed matchstick height
  const matchstickHeight = 120;

  // Calculate flame size and intensity based on streak
  const baseFlameWidth = 30;
  const baseFlameHeight = 40;
  const flameGrowth = Math.min(streak * 8, 60); // Grow up to 60px more
  const flameWidth = baseFlameWidth + flameGrowth;
  const flameHeight = baseFlameHeight + flameGrowth * 1.5;
  
  // Flame opacity - starts at 0.7 and goes to full opacity
  const flameOpacity = Math.min(0.7 + (streak * 0.1), 1);

  return (
    <div className="streak-container">            
      <div className="matchstick-wrapper">
        {/* Flame - appears when streak > 0, grows with streak */}
        {streak > 0 && (
          <div 
            className={`flame ${animateFlame ? 'flame-pulse' : ''}`}
            style={{ 
              opacity: flameOpacity,
              width: `${flameWidth}px`,
              height: `${flameHeight}px`
            }}
          >
            <div className="flame-inner"></div>
            {/* Additional flame layers for intensity */}
            {streak > 3 && <div className="flame-outer"></div>}
            {streak > 6 && <div className="flame-glow"></div>}
          </div>
        )}
        
        {/* Matchstick stick - fixed height */}
        <div 
          className="matchstick"
          style={{ height: `${matchstickHeight}px` }}
        >
          {/* Wood texture lines */}
          <div className="wood-texture"></div>
        </div>
        
        {/* Matchstick head */}
        <div className="matchstick-head"></div>
      </div>
      <div className="streak-counter">
        <span className="streak-number">{streak}</span>
        <span className="streak-label">Streak</span>
      </div>
    </div>
  );
}
