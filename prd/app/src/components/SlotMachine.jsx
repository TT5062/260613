import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './SlotMachine.css';

export default function SlotMachine({ students, presentersCount, riggedTarget, onSpinEnd }) {
  const [spinning, setSpinning] = useState(false);
  const [results, setResults] = useState([]);
  const controls = useAnimation();
  
  // Create a randomized array of students for the slot strip
  const generateStrip = () => {
    if (students.length === 0) return ['?'];
    // We need a long strip to simulate fast spinning
    let strip = [];
    for (let i = 0; i < 20; i++) {
      strip = strip.concat([...students].sort(() => Math.random() - 0.5));
    }
    return strip;
  };

  const handleSpin = async () => {
    if (students.length === 0) {
      alert("학생을 먼저 추가해주세요!");
      return;
    }
    if (presentersCount < 1 || presentersCount > students.length) {
      alert(`추출할 발표자 수는 1명부터 ${students.length}명 사이여야 합니다.`);
      return;
    }

    setSpinning(true);
    setResults([]);

    // Determine the winners
    let winners = [];
    if (riggedTarget && students.includes(riggedTarget)) {
      winners.push(riggedTarget);
      const remaining = [...students].filter(s => s !== riggedTarget).sort(() => Math.random() - 0.5);
      winners = winners.concat(remaining.slice(0, presentersCount - 1));
    } else {
      winners = [...students].sort(() => Math.random() - 0.5).slice(0, presentersCount);
    }

    setResults(winners);

    // Give a short delay to let state update
    setTimeout(() => {
      onSpinEnd();
      setSpinning(false);
    }, 3000); // Simulate 3 seconds of spinning
  };

  return (
    <div className="slot-machine-container glass-panel">
      <div className="machine-header">
        <h2 className="gradient-text">발표자 추첨 (Random Picker)</h2>
      </div>

      <div className="slots-wrapper">
        {results.length > 0 ? (
          <div className="winners-display">
            {results.map((winner, idx) => (
              <motion.div 
                key={idx}
                className="winner-card"
                initial={{ scale: 0, opacity: 0, rotateX: 90 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: idx * 0.5 }}
              >
                <div className="winner-label">발표자 {idx + 1}</div>
                <div className="winner-name">{winner}</div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={`slot-placeholder ${spinning ? 'spinning-fast' : ''}`}>
            {spinning ? '운명의 룰렛이 돌아가는 중...' : '추첨 버튼을 눌러주세요!'}
          </div>
        )}
      </div>

      <button 
        className="spin-btn" 
        onClick={handleSpin}
        disabled={spinning || students.length === 0}
      >
        {spinning ? '추첨 중...' : '추첨 시작! (Spin)'}
      </button>
    </div>
  );
}
