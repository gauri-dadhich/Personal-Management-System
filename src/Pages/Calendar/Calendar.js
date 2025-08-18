import React,{useState,useEffect} from 'react';



// CSS for the entire component. It is placed here to make the code self-contained.
const cssStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  :root {
    --primary-color: #4f46e5;
    --primary-light: #818cf8;
    --secondary-color: #6366f1;
    --bg-light: #f9fafb;
    --card-bg: #ffffff;
    --text-color: #374151;
    --text-light: #6b7280;
    --border-color: #e5e7eb;
    --today-bg: #eef2ff;
  }

  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    background-color: var(--bg-light);
    color: var(--text-color);
  }

  .calendar-app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    gap: 1rem;
  }
  
  .header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-color);
    margin: 0;
  }
  
  .navigation {
    display: flex;
    gap: 0.5rem;
  }
  
  .navigation button {
    background-color: var(--card-bg);
    color: var(--text-light);
    border: 1px solid var(--border-color);
    padding: 0.75rem 1.5rem;
    border-radius: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
  }
  
  .navigation button:hover {
    background-color: #f3f4f6;
    transform: translateY(-2px);
  }
  
  .months-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
  }

  .month-card {
    background-color: var(--card-bg);
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    padding: 1.5rem;
    transition: transform 0.3s ease;
  }

  .month-card:hover {
    transform: translateY(-5px);
  }
  
  .month-name {
    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
    color: var(--text-color);
    margin-bottom: 1rem;
  }
  
  .day-names {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: 600;
    color: var(--text-light);
    margin-bottom: 0.5rem;
  }
  
  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.25rem;
  }
  
  .day-cell {
    position: relative;
    padding: 0.5rem 0.25rem;
    aspect-ratio: 1 / 1;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    overflow: hidden;
  }
  
  .day-cell:hover:not(.empty) {
    background-color: var(--primary-light);
    transform: scale(1.05);
  }

  .day-number {
    font-weight: 600;
  }

  .day-cell.today {
    background-color: var(--today-bg);
    border: 2px solid var(--primary-color);
  }
  
  .day-cell.empty {
    color: var(--text-light);
    cursor: default;
    background-color: transparent;
  }
  
  .reminder {
    background-color: var(--secondary-color);
    color: white;
    font-size: 0.625rem;
    font-weight: 500;
    border-radius: 0.25rem;
    padding: 0.125rem 0.25rem;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .reminder-title {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .reminder-delete {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    margin-left: 0.25rem;
    padding: 0;
    font-size: 0.75rem;
    line-height: 1;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal {
    background-color: var(--card-bg);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    width: 90%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .modal h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: var(--text-color);
  }
  
  .modal input, .modal textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    font-size: 1rem;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1rem;
  }
  
  .modal-actions button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .modal-actions .cancel {
    background-color: #e5e7eb;
    color: var(--text-color);
  }
  
  .modal-actions .cancel:hover {
    background-color: #d1d5db;
  }
  
  .modal-actions .save {
    background-color: var(--primary-color);
    color: white;
  }
  
  .modal-actions .save:hover {
    background-color: var(--secondary-color);
  }

  @media (max-width: 640px) {
    .calendar-app {
      padding: 1rem;
    }
    .header h1 {
      font-size: 2rem;
    }
    .navigation {
      width: 100%;
      justify-content: space-between;
    }
    .navigation button {
      flex: 1;
    }
  }
`;


const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
const getMonthName = (month) => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month];


const App = () => {

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [reminders, setReminders] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newReminder, setNewReminder] = useState({ title: '', time: '', description: '' });

  
  useEffect(() => {
    try {
      const storedReminders = localStorage.getItem('calendarReminders');
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
      }
    } catch (e) {
      console.error("Failed to load reminders from local storage", e);
    }
  }, []);

 
  useEffect(() => {
    try {
      localStorage.setItem('calendarReminders', JSON.stringify(reminders));
    } catch (e) {
      console.error("Failed to save reminders to local storage", e);
    }
  }, [reminders]);

  const handlePrevYear = () => setCurrentYear(currentYear - 1);
  const handleNextYear = () => setCurrentYear(currentYear + 1);


  const handleDayClick = (year, month, day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setIsModalOpen(true);
  };

  // Add a new reminder to the state
  const handleAddReminder = () => {
    if (newReminder.title.trim() === '') return;
    setReminders(prevReminders => {
      const updatedReminders = { ...prevReminders };
      if (!updatedReminders[selectedDate]) {
        updatedReminders[selectedDate] = [];
      }
      updatedReminders[selectedDate] = [...updatedReminders[selectedDate], newReminder];
      return updatedReminders;
    });
    setIsModalOpen(false);
    setNewReminder({ title: '', time: '', description: '' });
  };


  const handleDeleteReminder = (dateStr, reminderIndex) => {
    setReminders(prevReminders => {
      const updatedReminders = { ...prevReminders };
      updatedReminders[dateStr] = updatedReminders[dateStr].filter((_, index) => index !== reminderIndex);
      if (updatedReminders[dateStr].length === 0) {
        delete updatedReminders[dateStr];
      }
      return updatedReminders;
    });
  };


  const renderMonth = (month) => {
    const totalDays = getDaysInMonth(currentYear, month);
    const firstDay = getFirstDayOfMonth(currentYear, month); 
    const days = [];

 
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${month}-${i}`} className="day-cell empty"></div>);
    }


    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentYear, month, day);
      const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
      const dateStr = `${currentYear}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayReminders = reminders[dateStr] || [];

      days.push(
        <div 
          key={dateStr}
          className={`day-cell ${isToday ? 'today' : ''}`}
          onClick={() => handleDayClick(currentYear, month, day)}
        >
          <div className="day-number">{day}</div>
          {dayReminders.map((r, index) => (
            <div key={index} className="reminder">
              <span className="reminder-title">{r.title}</span>
              <button 
                className="reminder-delete"
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleDeleteReminder(dateStr, index);
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      );
    }
    
    return (
      <div className="month-card">
        <div className="month-name">{getMonthName(month)} {currentYear}</div>
        <div className="day-names">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="days-grid">
          {days}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{cssStyles}</style>
      <div className="calendar-app">
        <header className="header">
          <h1>Calendar</h1>
          <div className="navigation">
            <button onClick={handlePrevYear}>&lt; Prev Year</button>
            <button onClick={handleNextYear}>Next Year &gt;</button>
          </div>
        </header>

        <main className="months-grid">
          {[...Array(12).keys()].map(month => renderMonth(month))}
        </main>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Add Reminder</h3>
            <input
              type="text"
              placeholder="Title"
              value={newReminder.title}
              onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
            />
            <input
              type="time"
              placeholder="Time"
              value={newReminder.time}
              onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newReminder.description}
              onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
            ></textarea>
            <div className="modal-actions">
              <button className="cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="save" onClick={handleAddReminder}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
