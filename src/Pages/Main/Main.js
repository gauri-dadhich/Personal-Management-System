// import React, { useState, useEffect } from 'react';
// import Sidebar from '../../components/Sideb';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faTrash, faCalendarDays, faBolt, faFolder } from "@fortawesome/free-solid-svg-icons";
// import './Main.css';
// import { useCopilotAction } from '@copilotkit/react-core';
// import { CopilotChat } from "@copilotkit/react-ui";
// const MainPage = () => {
//   // Load tasks from localStorage or empty array
//   const [tasks, setTasks] = useState(() => {
//     const savedTasks = localStorage.getItem('tasks');
//     return savedTasks ? JSON.parse(savedTasks) : [];
//   });

//   const [taskText, setTaskText] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [priority, setPriority] = useState("low");
//   const [category, setCategory] = useState("personal"); 
//   const [filterCategory, setFilterCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestion, setSuggestion] = useState("");

//   // CopilotKit generate text action
//   const generateText = useCopilotAction("generateText");

//   // Save tasks to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   // Add a new task
//   const handleAddTask = () => {
//     if (!taskText.trim()) return; 
//     const newTask = {
//       id: Date.now(),
//       text: taskText,
//       date: dueDate,
//       priority,
//       category,
//       completed: false
//     };
//     setTasks([...tasks, newTask]);
//     setTaskText("");
//     setDueDate("");
//     setPriority("low");
//     setCategory("personal");
//   };

//   // Toggle completed
//   const toggleComplete = (id) => {
//     setTasks(tasks.map(task =>
//       task.id === id ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   // Delete task
//   const handleDeleteTask = (id) => {
//     setTasks(tasks.filter(task => task.id !== id));
//   };

//   // Filtered tasks
//   const filteredTasks = tasks.filter(task => {
//     const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
//     const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });


//   // Automatically suggest a task as user types
//   useEffect(() => {
//     let ignore = false;
//     async function fetchSuggestion() {
//       if (taskText.trim().length === 0) {
//         try {
//           const result = await generateText("Suggest a task I should do today:");
//           if (!ignore) setSuggestion(result);
//         } catch (error) {
//           if (!ignore) setSuggestion("");
//         }
//       } else {
//         setSuggestion("");
//       }
//     }
//     fetchSuggestion();
//     return () => { ignore = true; };
//   }, [taskText, generateText]);

//   return (
//     <div>
//       <Sidebar />
//       <div className="main-content">
//         <div id="goal">
//           <i><h1>Today's Goal</h1></i>

//           <div id="task-counter">
//             Total Tasks: {filteredTasks.length} | Completed: {filteredTasks.filter(t => t.completed).length}
//           </div>

//           <div className="filters">
//             <input
//               type="text"
//               id="search"
//               placeholder="Search tasks..."
//               value={searchQuery}
//               onChange={e => setSearchQuery(e.target.value)}
//             />
//             <select
//               id="category-filter"
//               value={filterCategory}
//               onChange={e => setFilterCategory(e.target.value)}
//             >
//               <option value="all">All Categories</option>
//               <option value="personal">Personal</option>
//               <option value="work">Work</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           <div id="task-container">
//             {filteredTasks.map(task => (
//               <div key={task.id} className={`task priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
//                 <input
//                   type="checkbox"
//                   checked={task.completed}
//                   onChange={() => toggleComplete(task.id)}
//                 />
//                 <div className="task-label">
//                   <span className="task-text">{task.text}</span>
//                   <div className="task-meta">
//                     {task.date && (
//                       <span><FontAwesomeIcon icon={faCalendarDays} /> Due: {task.date}</span>
//                     )}
//                     <span><FontAwesomeIcon icon={faBolt} /> {task.priority}</span>
//                     <span><FontAwesomeIcon icon={faFolder} /> {task.category}</span>
//                   </div>
//                 </div>
//                 <FontAwesomeIcon
//                   icon={faTrash}
//                   className="task-delete"
//                   onClick={() => handleDeleteTask(task.id)}
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="task-input-row">
//             <input
//               type="text"
//               placeholder="Enter New Task..."
//               value={taskText}
//               onChange={e => setTaskText(e.target.value)}
//             />
//             {suggestion
//               ? (
//                   <div style={{ marginTop: "5px", background: "#f3f3f3", padding: "8px", borderRadius: "8px", cursor: "pointer", fontStyle: "italic" }} onClick={() => setTaskText(suggestion)}>
//                     💡 Suggested: {suggestion}
//                   </div>
//                 )
//               : (
//                   <div style={{ marginTop: "5px", color: "#aaa", fontStyle: "italic" }}>
//                     <span>Copilot is thinking...</span>
//                   </div>
//                 )
//             }
//             <input
//               type="date"
//               value={dueDate}
//               onChange={e => setDueDate(e.target.value)}
//             />
//             <select value={priority} onChange={e => setPriority(e.target.value)}>
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//             <select value={category} onChange={e => setCategory(e.target.value)}>
//               <option value="personal">Personal</option>
//               <option value="work">Work</option>
//               <option value="other">Other</option>
//             </select>
//             <FontAwesomeIcon
//               icon={faPlus}
//               className="fa-plus"
//               onClick={handleAddTask}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainPage;
// import React, { useState, useEffect } from 'react';
// import Sidebar from '../../components/Sideb';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faTrash, faCalendarDays, faBolt, faFolder } from "@fortawesome/free-solid-svg-icons";
// import './Main.css';
// import { useCopilotAction } from '@copilotkit/react-core';
// import { CopilotChat } from "@copilotkit/react-ui";
// import { CopilotTextarea } from "@copilotkit/react-textarea";
// const MainPage = () => {
//   // Load tasks from localStorage or empty array
//   const [tasks, setTasks] = useState(() => {
//     const savedTasks = localStorage.getItem('tasks');
//     return savedTasks ? JSON.parse(savedTasks) : [];
//   });

//   const [taskText, setTaskText] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [priority, setPriority] = useState("low");
//   const [category, setCategory] = useState("personal"); 
//   const [filterCategory, setFilterCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestion, setSuggestion] = useState("");

  

//   // Save tasks to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   // Add a new task
//   const handleAddTask = () => {
//     if (!taskText.trim()) return; 
//     const newTask = {
//       id: Date.now(),
//       text: taskText,
//       date: dueDate,
//       priority,
//       category,
//       completed: false
//     };
//     setTasks([...tasks, newTask]);
//     setTaskText("");
//     setDueDate("");
//     setPriority("low");
//     setCategory("personal");
//   };

//   // Toggle completed
//   const toggleComplete = (id) => {
//     setTasks(tasks.map(task =>
//       task.id === id ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   // Delete task
//   const handleDeleteTask = (id) => {
//     setTasks(tasks.filter(task => task.id !== id));
//   };

//   // Filtered tasks
//   const filteredTasks = tasks.filter(task => {
//     const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
//     const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });


  
//   return (
//     <div className="main-page">
//       <Sidebar />
//       <div className="main-content">
//         <div id="goal">
//           <i><h1>Today's Goal</h1></i>

//           <div id="task-counter">
//             Total Tasks: {filteredTasks.length} | Completed: {filteredTasks.filter(t => t.completed).length}
//           </div>

//           <div className="filters">
//             <input
//               type="text"
//               id="search"
//               placeholder="Search tasks..."
//               value={searchQuery}
//               onChange={e => setSearchQuery(e.target.value)}
//             />
//             <select
//               id="category-filter"
//               value={filterCategory}
//               onChange={e => setFilterCategory(e.target.value)}
//             >
//               <option value="all">All Categories</option>
//               <option value="personal">Personal</option>
//               <option value="work">Work</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           <div id="task-container">
//             {filteredTasks.map(task => (
//               <div key={task.id} className={`task priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
//                 <input
//                   type="checkbox"
//                   checked={task.completed}
//                   onChange={() => toggleComplete(task.id)}
//                 />
//                 <div className="task-label">
//                   <span className="task-text">{task.text}</span>
//                   <div className="task-meta">
//                     {task.date && (
//                       <span><FontAwesomeIcon icon={faCalendarDays} /> Due: {task.date}</span>
//                     )}
//                     <span><FontAwesomeIcon icon={faBolt} /> {task.priority}</span>
//                     <span><FontAwesomeIcon icon={faFolder} /> {task.category}</span>
//                   </div>
//                 </div>
//                 <FontAwesomeIcon
//                   icon={faTrash}
//                   className="task-delete"
//                   onClick={() => handleDeleteTask(task.id)}
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="task-input-row">
//             <input
//               type="text"
//               placeholder="Enter New Task..."
//               value={taskText}
//               onChange={e => setTaskText(e.target.value)}
//             />
//             {suggestion
//               ? (
//                   <div style={{ marginTop: "5px", background: "#f3f3f3", padding: "8px", borderRadius: "8px", cursor: "pointer", fontStyle: "italic" }} 
//                     onClick={() => setTaskText(suggestion)}>
//                     💡 Suggested: {suggestion}
//                   </div>
//                 )
//               : (
//                   <div style={{ marginTop: "5px", color: "#aaa", fontStyle: "italic" }}>
//                     <span>Copilot is thinking...</span>
//                   </div>
//                 )
//             }
//             <input
//               type="date"
//               value={dueDate}
//               onChange={e => setDueDate(e.target.value)}
//             />
//             <select value={priority} onChange={e => setPriority(e.target.value)}>
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//             <select value={category} onChange={e => setCategory(e.target.value)}>
//               <option value="personal">Personal</option>
//               <option value="work">Work</option>
//               <option value="other">Other</option>
//             </select>
//             <FontAwesomeIcon
//               icon={faPlus}
//               className="fa-plus"
//               onClick={handleAddTask}
//             />
//           </div>

//           {/* Full Copilot Chat UI */}
//           <div className="copilot-chat-container" style={{ marginTop: "30px" }}>
//             <CopilotChat
//               instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
//               labels={{
//                 title: "Your Assistant",
//                 initial: "Hi! 👋 How can I assist you today?",
//               }}
//             />
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainPage;
// import React, { useState, useEffect } from 'react';
// import Sidebar from '../../components/Sideb';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faTrash, faCalendarDays, faBolt, faFolder } from "@fortawesome/free-solid-svg-icons";
// import './Main.css';
// import { CopilotChat } from "@copilotkit/react-ui";
// import { CopilotTextarea } from "@copilotkit/react-textarea";
// import { useCopilotAction } from "@copilotkit/react-core";

// const MainPage = () => {
//   // Load tasks from localStorage or empty array
//   const [tasks, setTasks] = useState(() => {
//     const savedTasks = localStorage.getItem('tasks');
//     try {
//       const parsed = savedTasks ? JSON.parse(savedTasks) : [];
//       return Array.isArray(parsed) ? parsed : [];
//     } catch {
//       return [];
//     }
//   });

//   const [taskText, setTaskText] = useState("");
//   const [suggestion, setSuggestion] = useState("");
//   const generateText = useCopilotAction("generateText");
//   // Automatically suggest a task as user types
//   useEffect(() => {
//     let ignore = false;
//     async function fetchSuggestion() {
//       if (taskText.trim().length === 0) {
//         try {
//           const result = await generateText("Suggest a task I should do today:");
//           if (!ignore) setSuggestion(result);
//         } catch (error) {
//           if (!ignore) setSuggestion("");
//         }
//       } else {
//         setSuggestion("");
//       }
//     }
//     fetchSuggestion();
//     return () => { ignore = true; };
//   }, [taskText, generateText]);
//   const [dueDate, setDueDate] = useState("");
//   const [priority, setPriority] = useState("low");
//   const [category, setCategory] = useState("personal"); 
//   const [filterCategory, setFilterCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   // Save tasks to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   // Add a new task
//   const handleAddTask = () => {
//     if (!taskText.trim()) return; 
//     const newTask = {
//       id: Date.now(),
//       text: taskText,
//       date: dueDate,
//       priority,
//       category,
//       completed: false
//     };
//     setTasks([...tasks, newTask]);
//     setTaskText("");
//     setDueDate("");
//     setPriority("low");
//     setCategory("personal");
//   };

//   // Toggle completed
//   const toggleComplete = (id) => {
//     setTasks(tasks.map(task =>
//       task.id === id ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   // Delete task
//   const handleDeleteTask = (id) => {
//     setTasks(tasks.filter(task => task.id !== id));
//   };

//   // Filtered tasks
//   const filteredTasks = tasks.filter(task => {
//     const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
//     const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <div className="main-page">
//       <Sidebar />
//       <div className="main-content">
//         <div id="goal">
//           <i><h1>Today's Goal</h1></i>

//           <div id="task-counter">
//             Total Tasks: {filteredTasks.length} | Completed: {filteredTasks.filter(t => t.completed).length}
//           </div>

//           {/* Filters */}
//           <div className="filters">
//             <input
//               type="text"
//               id="search"
//               placeholder="Search tasks..."
//               value={searchQuery}
//               onChange={e => setSearchQuery(e.target.value)}
//             />
//             <select
//               id="category-filter"
//               value={filterCategory}
//               onChange={e => setFilterCategory(e.target.value)}
//             >
//               <option value="all">All Categories</option>
//               <option value="personal">Personal</option>
//               <option value="work">Work</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           {/* Task list */}
//           <div id="task-container">
//             {filteredTasks.map(task => (
//               <div key={task.id} className={`task priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
//                 <input
//                   type="checkbox"
//                   checked={task.completed}
//                   onChange={() => toggleComplete(task.id)}
//                 />
//                 <div className="task-label">
//                   <span className="task-text">{task.text}</span>
//                   <div className="task-meta">
//                     {task.date && (
//                       <span><FontAwesomeIcon icon={faCalendarDays} /> Due: {task.date}</span>
//                     )}
//                     <span><FontAwesomeIcon icon={faBolt} /> {task.priority}</span>
//                     <span><FontAwesomeIcon icon={faFolder} /> {task.category}</span>
//                   </div>
//                 </div>
//                 <FontAwesomeIcon
//                   icon={faTrash}
//                   className="task-delete"
//                   onClick={() => handleDeleteTask(task.id)}
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Task input with CopilotTextarea and suggestion */}
//           <div className="task-input-row">
//             <CopilotTextarea
//               value={taskText}
//               onChange={val => setTaskText(typeof val === 'string' ? val : '')}
//               placeholder="Enter New Task..."
//               className="todo-input"
//               instructions={
//                 "Autocomplete short, practical to-do tasks (3–7 words). " +
//                 "Examples: Buy groceries, Call mom, Finish project report."
//               }
//             />
//             {suggestion
//               ? (
//                   <div style={{ marginTop: "5px", background: "#f3f3f3", padding: "8px", borderRadius: "8px", cursor: "pointer", fontStyle: "italic" }} onClick={() => setTaskText(suggestion)}>
//                     💡 Suggested: {suggestion}
//                   </div>
//                 )
//               : (
//                   <div style={{ marginTop: "5px", color: "#aaa", fontStyle: "italic" }}>
//                     <span>Copilot is thinking...</span>
//                   </div>
//                 )
//             }
//             <input
//               type="date"
//               value={dueDate}
//               onChange={e => setDueDate(e.target.value)}
//             />
//             <select value={priority} onChange={e => setPriority(e.target.value)}>
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//             <select value={category} onChange={e => setCategory(e.target.value)}>
//               <option value="personal">Personal</option>
//               <option value="work">Work</option>
//               <option value="other">Other</option>
//             </select>
//             <FontAwesomeIcon
//               icon={faPlus}
//               className="fa-plus"
//               onClick={handleAddTask}
//             />
//           </div>

//           {/* Full Copilot Chat UI */}
//           <div className="copilot-chat-container" style={{ marginTop: "30px" }}>
//             <CopilotChat
//               instructions={
//                 "You are assisting the user with their tasks. " +
//                 "Suggest productivity ideas, short motivational notes, and help with planning."
//               }
//               labels={{
//                 title: "Your Assistant",
//                 initial: "Hi! 👋 How can I help you stay productive?",
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainPage;

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sideb';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faCalendarDays, faBolt, faFolder } from "@fortawesome/free-solid-svg-icons";
import './Main.css';

const MainPage = () => {
  // Load tasks from localStorage or empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    try {
      const parsed = savedTasks ? JSON.parse(savedTasks) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [taskText, setTaskText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [category, setCategory] = useState("personal"); 
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const handleAddTask = () => {
    if (!taskText.trim()) return; 
    const newTask = {
      id: Date.now(),
      text: taskText,
      date: dueDate,
      priority,
      category,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setTaskText("");
    setDueDate("");
    setPriority("low");
    setCategory("personal");
  };

  // Toggle completed
  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filtered tasks
  const filteredTasks = tasks.filter(task => {
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="main-page">
      <Sidebar />
      <div className="main-content">
        <div id="goal">
          <i><h1>Today's Goal</h1></i>

          <div id="task-counter">
            Total Tasks: {filteredTasks.length} | Completed: {filteredTasks.filter(t => t.completed).length}
          </div>

          {/* Filters */}
          <div className="filters">
            <input
              type="text"
              id="search"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <select
              id="category-filter"
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Task list */}
          <div id="task-container">
            {filteredTasks.map(task => (
              <div key={task.id} className={`task priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <div className="task-label">
                  <span className="task-text">{task.text}</span>
                  <div className="task-meta">
                    {task.date && (
                      <span><FontAwesomeIcon icon={faCalendarDays} /> Due: {task.date}</span>
                    )}
                    <span><FontAwesomeIcon icon={faBolt} /> {task.priority}</span>
                    <span><FontAwesomeIcon icon={faFolder} /> {task.category}</span>
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="task-delete"
                  onClick={() => handleDeleteTask(task.id)}
                />
              </div>
            ))}
          </div>

          {/* Task input */}
          <div className="task-input-row">
            <input
              type="text"
              placeholder="Enter New Task..."
              value={taskText}
              onChange={e => setTaskText(e.target.value)}
            />
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />
            <select value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
            <FontAwesomeIcon
              icon={faPlus}
              className="fa-plus"
              onClick={handleAddTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
