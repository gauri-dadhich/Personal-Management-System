import React, { useState, useRef, useEffect } from 'react';
import { useCopilotContext } from '@copilotkit/react-core';
import { CopilotChat } from '@copilotkit/react-ui';
import { MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react';
import { useAppContext } from '../Context/AppContext';
import './AIAssistant.css';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: Math.max(300, window.innerWidth - 450), y: 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const chatRef = useRef(null);
  const buttonRef = useRef(null);

  // Get context from CopilotKit and App - these must be called unconditionally
  const appContext = useAppContext();
  
  // Destructure context values with fallbacks
  const { 
    getAppStats = () => ({}), 
    tasks = [], 
    diaryEntries = [], 
    reminders = [], 
    currentPage = window.location.pathname 
  } = appContext || {};

  // Monitor route changes more actively
  useEffect(() => {
    const updatePath = () => {
      const newPath = window.location.pathname;
      console.log('🔄 Route changed to:', newPath);
      setCurrentPath(newPath);
    };

    // Set initial path
    updatePath();

    // Listen for route changes
    const handleRouteChange = () => {
      setTimeout(updatePath, 100);
    };

    // Multiple ways to detect route changes
    window.addEventListener('popstate', updatePath);
    window.addEventListener('pushstate', updatePath);
    window.addEventListener('replacestate', updatePath);
    
    // Use MutationObserver to detect DOM changes
    const observer = new MutationObserver(handleRouteChange);
    observer.observe(document.body, { childList: true, subtree: true });

    // Check periodically for route changes
    const interval = setInterval(() => {
      if (window.location.pathname !== currentPath) {
        updatePath();
      }
    }, 1000);

    return () => {
      window.removeEventListener('popstate', updatePath);
      window.removeEventListener('pushstate', updatePath);
      window.removeEventListener('replacestate', updatePath);
      observer.disconnect();
      clearInterval(interval);
    };
  }, [currentPath]);

  // Handle window resize to keep AI Assistant in view
  useEffect(() => {
    const handleResize = () => {
      const newX = Math.max(300, window.innerWidth - 450);
      const newY = Math.min(position.y, window.innerHeight - 120);
      
      setPosition(prev => ({
        x: newX,
        y: newY
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position.y]);

  // Debug logging
  useEffect(() => {
    console.log('🎯 AIAssistant mounted/updated');
    console.log('📍 Current path:', currentPath);
    console.log('📍 Current page from context:', currentPage);
    console.log('📍 Window location:', window.location.pathname);
    console.log('📊 Tasks count:', tasks?.length || 0);
    console.log('📊 Diary entries count:', diaryEntries?.length || 0);
    console.log('📊 Reminders count:', reminders?.length || 0);
    console.log('🔗 AppContext available:', !!appContext);
    console.log('🔗 AppContext keys:', appContext ? Object.keys(appContext) : 'None');
  }, [currentPath, currentPage, tasks, diaryEntries, reminders, appContext]);

  // Handle drag start
  const handleMouseDown = (e) => {
    if (e.target.closest('.chat-content')) return; // Don't drag when clicking on chat content
    
    setIsDragging(true);
    const rect = buttonRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Handle drag
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Keep within viewport bounds and avoid sidebar area
    const minX = 300; // Avoid left sidebar area
    const maxX = window.innerWidth - 420; // Keep chat interface fully in view
    const maxY = window.innerHeight - 620;
    
    setPosition({
      x: Math.max(minX, Math.min(newX, maxX)),
      y: Math.max(20, Math.min(newY, maxY))
    });
  };

  // Handle drag end
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // Prevent text selection while dragging
  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.userSelect = 'auto';
    }
    
    return () => {
      document.body.style.userSelect = 'auto';
    };
  }, [isDragging]);

  const toggleChat = () => {
    console.log('💬 Toggle chat clicked');
    console.log('📍 Current page:', currentPath);
    console.log('📍 Context available:', !!appContext);
    console.log('📍 Is open:', isOpen);
    
    setIsOpen(!isOpen);
    if (isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const getContextData = () => {
    try {
      console.log('🔍 Getting context data for page:', currentPath);
      
      // Always provide basic context data
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

      // If we have app context, add it
      if (appContext && getAppStats) {
        try {
          const stats = getAppStats();
          console.log('📊 App stats:', stats);
          
          return {
            ...basicContext,
            ...stats,
            tasks: (tasks || []).map(task => ({
              text: task.text,
              priority: task.priority,
              category: task.category,
              dueDate: task.date,
              completed: task.completed,
              createdAt: task.createdAt
            })),
            diaryEntries: (diaryEntries || []).map(entry => ({
              title: entry.title || 'Untitled',
              content: entry.content,
              mood: entry.mood,
              createdAt: entry.createdAt
            })),
            reminders: (reminders || []).map(reminder => ({
              title: reminder.title,
              description: reminder.description,
              date: reminder.date,
              priority: reminder.priority,
              createdAt: reminder.createdAt
            }))
          };
        } catch (error) {
          console.warn('⚠️ Error getting app stats, using basic context:', error);
          return basicContext;
        }
      }

      console.log('📝 Using basic context');
      return basicContext;
    } catch (error) {
      console.error('❌ Error getting context data:', error);
      return {
        currentPage: currentPath,
        currentDate: new Date().toDateString(),
        tasks: [],
        diaryEntries: [],
        reminders: [],
        error: 'Context not available'
      };
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div
        ref={buttonRef}
        className="ai-assistant-button"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
        onMouseDown={handleMouseDown}
      >
        <button
          onClick={toggleChat}
          className="ai-assistant-toggle-btn"
          title={`AI Assistant - ${currentPath}`}
        >
          <MessageCircle size={24} />
        </button>
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div
          className="ai-assistant-chat"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: '400px',
            height: isMinimized ? '64px' : '600px'
          }}
        >
          {/* Header */}
          <div className="ai-assistant-header">
            <div className="ai-assistant-header-left">
              <MessageCircle size={20} />
              <span className="ai-assistant-title">AI Assistant</span>
              <span className="ai-assistant-page-indicator">({currentPath})</span>
              {!appContext && (
                <span className="ai-assistant-limited-mode">(Limited Mode)</span>
              )}
            </div>
            <div className="ai-assistant-header-right">
              <button
                onClick={toggleMinimize}
                className="ai-assistant-control-btn"
                title={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                onClick={toggleChat}
                className="ai-assistant-control-btn"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <div className="ai-assistant-chat-content">
              <CopilotChat
                ref={chatRef}
                className="ai-assistant-copilot-chat"
                placeholder={`Ask me about your ${currentPath === '/Diary' ? 'diary entries' : currentPath === '/Calendar' ? 'calendar and reminders' : currentPath === '/Main' ? 'daily tasks' : 'app'}...`}
                getContext={getContextData}
                instructions={`
                  You are a helpful AI assistant for a diary and task management app. 
                  
                  You can help with:
                  - Suggesting diary prompts and writing ideas based on the user's mood and history
                  - Organizing and prioritizing tasks by analyzing current workload and priorities
                  - Providing motivational quotes and advice based on the user's progress
                  - Summarizing daily progress and suggesting improvements
                  - Answering questions about productivity, wellness, and personal development
                  - Helping with goal setting and time management
                  
                  Current context includes:
                  - User's tasks (completed and pending) with priorities and categories
                  - Diary entries with content and mood
                  - Reminders and important dates
                  - Current page and app usage statistics
                  - Task completion patterns and productivity insights
                  
                  Be encouraging, practical, and context-aware in your responses. 
                  Use the user's actual data to provide personalized suggestions.
                  When suggesting diary prompts, consider their current mood and recent entries.
                  When helping with tasks, consider their priorities and current workload.
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
