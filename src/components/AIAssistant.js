import React, { useState, useRef, useEffect } from 'react';
import { CopilotChat } from '@copilotkit/react-ui';
import { MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react';
import { useAppContext } from '../Context/AppContext';
import './AIAssistant.css';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const chatRef = useRef(null);

  const appContext = useAppContext();
  const {
    getAppStats = () => ({}),
    tasks = [],
    diaryEntries = [],
    reminders = [],
  } = appContext || {};

  // Monitor route changes
  useEffect(() => {
    const updatePath = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', updatePath);
    const interval = setInterval(() => {
      if (window.location.pathname !== currentPath) updatePath();
    }, 1000);
    return () => {
      window.removeEventListener('popstate', updatePath);
      clearInterval(interval);
    };
  }, [currentPath]);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    if (isOpen) setIsMinimized(false);
  };

  const toggleMinimize = () => setIsMinimized(prev => !prev);

  const getContextData = () => {
    const basicContext = {
      currentPage: currentPath,
      currentDate: new Date().toDateString(),
      suggestions: {
        diaryPrompts: [
          "What made you smile today?",
          "Describe a challenge you overcame",
          "What are you grateful for?",
          "Reflect on a recent learning experience",
          "How are you feeling right now?"
        ],
        taskIdeas: [
          "Review and prioritize tomorrow's tasks",
          "Clean up your workspace",
          "Plan your next week",
          "Set a new personal goal"
        ]
      }
    };

    if (appContext && getAppStats) {
      try {
        const stats = getAppStats();
        return {
          ...basicContext,
          ...stats,
          tasks: (tasks || []).map(task => ({
            text: task.text,
            priority: task.priority,
            category: task.category,
            dueDate: task.date,
            completed: task.completed,
          })),
          diaryEntries: (diaryEntries || []).map(entry => ({
            title: entry.title || 'Untitled',
            content: entry.content,
            mood: entry.mood,
          })),
          reminders: (reminders || []).map(reminder => ({
            title: reminder.title,
            date: reminder.date,
            priority: reminder.priority,
          }))
        };
      } catch {
        return basicContext;
      }
    }
    return basicContext;
  };

  return (
    <>
    
      {!isOpen && (
        <button
          className="ai-fab-btn"
          onClick={toggleChat}
          title="AI Assistant"
        >
          <MessageCircle size={24} />
        </button>
      )}


      {isOpen && (
        <div className={`ai-assistant-chat ${isMinimized ? 'minimized' : ''}`}>
          {/* Header */}
          <div className="ai-assistant-header" onClick={isMinimized ? toggleMinimize : undefined}>
            <div className="ai-assistant-header-left">
              <MessageCircle size={18} />
              <span className="ai-assistant-title">AI Assistant</span>
              {!appContext && (
                <span className="ai-assistant-limited-mode">Limited Mode</span>
              )}
            </div>
            <div className="ai-assistant-header-right">
              <button onClick={toggleMinimize} className="ai-assistant-control-btn" title={isMinimized ? "Maximize" : "Minimize"}>
                {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
              </button>
              <button onClick={toggleChat} className="ai-assistant-control-btn" title="Close">
                <X size={20} />
              </button>
            </div>
          </div>


          {!isMinimized && (
            <div className="ai-assistant-chat-content">
              <CopilotChat
                ref={chatRef}
                className="ai-assistant-copilot-chat"
                placeholder={`Ask me anything...`}
                getContext={getContextData}
                instructions={`
                  You are a helpful AI assistant for a diary and task management app.
                  You can help with diary prompts, task organization, motivation, and productivity.
                  Be encouraging, practical, and context-aware in your responses.
                `}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AIAssistant;