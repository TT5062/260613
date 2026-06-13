import { useState, useEffect } from 'react'
import StudentManager from './components/StudentManager'
import SlotMachine from './components/SlotMachine'
import SecretMenu from './components/SecretMenu'
import './App.css'

function App() {
  // Load students from localStorage or use empty array
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('presenter_students')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        return []
      }
    }
    return []
  })

  const [presentersCount, setPresentersCount] = useState(1)
  const [riggedTarget, setRiggedTarget] = useState(null)
  const [showSettings, setShowSettings] = useState(true)

  // Save to localStorage whenever students array changes
  useEffect(() => {
    localStorage.setItem('presenter_students', JSON.stringify(students))
  }, [students])

  // Handle spin end
  const handleSpinEnd = () => {
    // If there was a rigged target, clear it after it's used
    if (riggedTarget) {
      setRiggedTarget(null)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="gradient-text">운명의 룰렛</h1>
        <div className="header-controls">
          <label className="count-label">
            뽑을 인원수:
            <input 
              type="number" 
              min="1" 
              max={Math.max(1, students.length)}
              value={presentersCount}
              onChange={(e) => setPresentersCount(parseInt(e.target.value) || 1)}
              className="count-input"
            />
          </label>
          <button 
            className="toggle-settings-btn"
            onClick={() => setShowSettings(!showSettings)}
          >
            {showSettings ? '추첨 화면만 보기' : '명단 관리 열기'}
          </button>
        </div>
      </header>

      <main className={`app-main ${!showSettings ? 'full-screen-slot' : ''}`}>
        {showSettings && (
          <aside className="sidebar">
            <StudentManager 
              students={students} 
              setStudents={setStudents} 
            />
          </aside>
        )}
        
        <section className="slot-section">
          <SlotMachine 
            students={students}
            presentersCount={presentersCount}
            riggedTarget={riggedTarget}
            onSpinEnd={handleSpinEnd}
          />
        </section>
      </main>

      <SecretMenu 
        students={students}
        setRiggedTarget={setRiggedTarget}
      />
    </div>
  )
}

export default App
