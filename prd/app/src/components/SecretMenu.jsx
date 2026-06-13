import { useState, useEffect } from 'react';
import './SecretMenu.css';

export default function SecretMenu({ students, setRiggedTarget }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  // Listen for the secret keyboard shortcut: Alt/Option + Shift + S
  useEffect(() => {
    const handleKeyDown = (e) => {
      // e.code === 'KeyS' is more reliable on Mac than e.key === 's' when Option is held down
      if (e.altKey && e.shiftKey && e.code === 'KeyS') {
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const handleApply = () => {
    setRiggedTarget(selected || null); // null means no rigging
    setIsOpen(false);
  };

  return (
    <div className="secret-menu-overlay">
      <div className="secret-menu-modal glass-panel">
        <h3 className="secret-title">🤫 Secret Teacher Menu</h3>
        <p className="secret-desc">다음 추첨에서 무조건 당첨될 학생을 선택하세요. (아무도 모르게!)</p>
        
        <select 
          className="secret-select"
          value={selected} 
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">-- 조작 안함 (Random) --</option>
          {students.map((student, idx) => (
            <option key={idx} value={student}>{student}</option>
          ))}
        </select>

        <div className="secret-actions">
          <button onClick={() => setIsOpen(false)} className="cancel-btn">취소</button>
          <button onClick={handleApply} className="apply-btn">적용하기</button>
        </div>
      </div>
    </div>
  );
}
