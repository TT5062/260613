import { useState } from 'react';
import { Trash2, Plus, Users } from 'lucide-react';
import './StudentManager.css';

export default function StudentManager({ students, setStudents }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    
    // Split by comma or newline, trim, and filter out empty strings
    const newStudents = inputValue
      .split(/,|\n/)
      .map(s => s.trim())
      .filter(s => s && !students.includes(s));
    
    if (newStudents.length > 0) {
      setStudents([...students, ...newStudents]);
    }
    setInputValue('');
  };

  const handleRemove = (studentToRemove) => {
    setStudents(students.filter(s => s !== studentToRemove));
  };

  const handleClearAll = () => {
    if (confirm('정말로 모든 학생을 삭제하시겠습니까? (Are you sure you want to clear all students?)')) {
      setStudents([]);
    }
  };

  return (
    <div className="student-manager glass-panel">
      <div className="manager-header">
        <h2><Users size={24} /> 학생 명단 관리 (Student List)</h2>
        <span className="student-count">총 {students.length}명</span>
      </div>

      <div className="input-group">
        <textarea 
          placeholder="이름을 입력하세요. 쉼표(,)나 줄바꿈으로 여러 명을 동시에 추가할 수 있습니다."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows={3}
        />
        <button onClick={handleAdd} className="add-btn">
          <Plus size={20} /> 추가 (Add)
        </button>
      </div>

      <div className="student-list-container">
        {students.length === 0 ? (
          <div className="empty-state">학생을 추가해주세요.</div>
        ) : (
          <ul className="student-list">
            {students.map((student, index) => (
              <li key={`${student}-${index}`} className="student-item">
                <span>{student}</span>
                <button 
                  onClick={() => handleRemove(student)} 
                  className="icon-btn remove-btn"
                  title="삭제 (Remove)"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {students.length > 0 && (
        <button onClick={handleClearAll} className="clear-btn">
          모두 삭제 (Clear All)
        </button>
      )}
    </div>
  );
}
