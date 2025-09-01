import React, { createContext, useContext, useState, useEffect } from 'react';


const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

export const AppContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [currentPage, setCurrentPage] = useState('/');

  console.log('🔧 AppContextProvider initialized');

  // Load data from localStorage on mount
  useEffect(() => {
    console.log('📥 Loading data from localStorage');
    const savedTasks = localStorage.getItem('tasks');
    const savedDiaryEntries = localStorage.getItem('diaryEntries');
    const savedReminders = localStorage.getItem('reminders');

    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
        console.log('✅ Loaded tasks:', parsedTasks.length);
      } catch (error) {
        console.error('❌ Error parsing tasks:', error);
        setTasks([]);
      }
    }

    if (savedDiaryEntries) {
      try {
        const parsedEntries = JSON.parse(savedDiaryEntries);
        setDiaryEntries(parsedEntries);
        console.log('✅ Loaded diary entries:', parsedEntries.length);
      } catch (error) {
        console.error('❌ Error parsing diary entries:', error);
        setDiaryEntries([]);
      }
    }

    if (savedReminders) {
      try {
        const parsedReminders = JSON.parse(savedReminders);
        setReminders(parsedReminders);
        console.log('✅ Loaded reminders:', parsedReminders.length);
      } catch (error) {
        console.error('❌ Error parsing reminders:', error);
        setReminders([]);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save diary entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
  }, [diaryEntries]);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Update current page when route changes
  useEffect(() => {
    const updateCurrentPage = () => {
      const path = window.location.pathname;
      console.log('🔄 Route changed to:', path);
      setCurrentPage(path);
    };

    // Set initial page
    updateCurrentPage();

    // Listen for route changes
    window.addEventListener('popstate', updateCurrentPage);
    
    // Create a custom event listener for route changes
    const handleRouteChange = () => {
      setTimeout(updateCurrentPage, 100); // Small delay to ensure route is updated
    };

    // Listen for navigation events
    window.addEventListener('beforeunload', updateCurrentPage);
    
    // Use a MutationObserver to detect route changes
    const observer = new MutationObserver(handleRouteChange);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('popstate', updateCurrentPage);
      window.removeEventListener('beforeunload', updateCurrentPage);
      observer.disconnect();
    };
  }, []);

  // Task management functions
  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTaskComplete = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Diary entry management functions
  const addDiaryEntry = (entry) => {
    const newEntry = {
      id: Date.now(),
      ...entry,
      createdAt: new Date().toISOString()
    };
    setDiaryEntries(prev => [...prev, newEntry]);
  };

  const updateDiaryEntry = (id, updates) => {
    setDiaryEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    ));
  };

  const deleteDiaryEntry = (id) => {
    setDiaryEntries(prev => prev.filter(entry => entry.id !== id));
  };

  // Reminder management functions
  const addReminder = (reminder) => {
    const newReminder = {
      id: Date.now(),
      ...reminder,
      createdAt: new Date().toISOString()
    };
    setReminders(prev => [...prev, newReminder]);
  };

  const updateReminder = (id, updates) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, ...updates } : reminder
    ));
  };

  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  // Get app statistics for AI context
  const getAppStats = () => {
    const today = new Date().toDateString();
    const todayTasks = tasks.filter(task => 
      new Date(task.date).toDateString() === today
    );
    const todayEntries = diaryEntries.filter(entry => 
      new Date(entry.createdAt).toDateString() === today
    );
    const todayReminders = reminders.filter(reminder => 
      new Date(reminder.date).toDateString() === today
    );

    const stats = {
      currentDate: today,
      currentPage,
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.completed).length,
      pendingTasks: tasks.filter(t => !t.completed).length,
      todayTasks: todayTasks.length,
      totalDiaryEntries: diaryEntries.length,
      todayDiaryEntries: todayEntries.length,
      totalReminders: reminders.length,
      todayReminders: todayReminders.length,
      taskCategories: [...new Set(tasks.map(t => t.category))],
      taskPriorities: [...new Set(tasks.map(t => t.priority))]
    };

    console.log('📊 App stats generated:', stats);
    return stats;
  };

  const value = {
    // State
    tasks,
    diaryEntries,
    reminders,
    currentPage,
    
    // Task functions
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    
    // Diary functions
    addDiaryEntry,
    updateDiaryEntry,
    deleteDiaryEntry,
    
    // Reminder functions
    addReminder,
    updateReminder,
    deleteReminder,
    
    // Utility functions
    getAppStats,
    setCurrentPage
  };

  console.log('🔧 AppContext value updated:', {
    currentPage,
    tasksCount: tasks.length,
    diaryCount: diaryEntries.length,
    remindersCount: reminders.length
  });

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
