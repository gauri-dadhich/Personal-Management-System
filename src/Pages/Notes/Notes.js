import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Plus, Save, FileText, Trash2, Lock, Unlock } from 'lucide-react';
import './Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [currentNote, setCurrentNote] = useState({ id: '', title: '', content: '', color: '#000000', images: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  // Refs
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const emojiButtonRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes);
      if (parsedNotes.length > 0) {
        setActiveNoteId(parsedNotes[0].id);
        setCurrentNote(parsedNotes[0]);
      }
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Check if notes are locked
  useEffect(() => {
    const hasPassword = localStorage.getItem('notespassword');
    if (!hasPassword) {
      setUnlocked(true); // No password set, so unlocked by default
    }
  }, []);



  // Click outside to close emoji picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!showEmojiPicker) return;

      if (
        emojiPickerRef.current && 
        !emojiPickerRef.current.contains(event.target) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  // Generate unique ID for new notes
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Handle unlock
  const handleUnlock = () => {
    setUnlocked(true);
  };

  // Handle lock
  const handleLock = () => {
    setUnlocked(false);
  };

  // Toggle emoji picker
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(prev => !prev);
  };

  // Handle emoji click
  const handleEmojiClick = useCallback((event) => {
    const emoji = event.detail.unicode;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const newText = text.slice(0, start) + emoji + text.slice(end);
    
    setCurrentNote(prev => ({
      ...prev,
      content: newText
    }));
    
    textarea.focus();
    const newCursorPosition = start + emoji.length;
    textarea.selectionStart = textarea.selectionEnd = newCursorPosition;
    setIsEditing(true);
  }, []);

  // Handle color change
  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setCurrentNote(prev => ({
      ...prev,
      color: newColor
    }));
    setIsEditing(true);
  };

  // Handle image uploads
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    
    setCurrentNote(prev => ({
      ...prev,
      images: [...(prev.images || []), ...newImages]
    }));
    setIsEditing(true);
  };

  // Remove image
  const handleRemoveImage = (index) => {
    setCurrentNote(prev => {
      const newImages = [...(prev.images || [])];
      newImages.splice(index, 1);
      return {
        ...prev,
        images: newImages
      };
    });
    setIsEditing(true);
  };

  // Create a new note
  const createNewNote = () => {
    const newNote = {
      id: generateId(),
      title: 'Untitled Note',
      content: '',
      color: '#000000',
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setActiveNoteId(newNote.id);
    setCurrentNote(newNote);
    setIsEditing(true);
  };

  // Open an existing note
  const openNote = (note) => {
    setActiveNoteId(note.id);
    setCurrentNote(note);
    setIsEditing(false);
  };

  // Save the current note
  const saveNote = () => {
    if (!currentNote.id) return;

    const updatedNote = {
      ...currentNote,
      title: currentNote.content.split('\n')[0] || 'Untitled Note',
      updatedAt: new Date().toISOString()
    };

    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === currentNote.id ? updatedNote : note
      )
    );

    setCurrentNote(updatedNote);
    setIsEditing(false);
  };

  // Delete a note
  const deleteNote = (noteId) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    
    if (activeNoteId === noteId) {
      if (notes.length > 1) {
        const remainingNotes = notes.filter(note => note.id !== noteId);
        setActiveNoteId(remainingNotes[0].id);
        setCurrentNote(remainingNotes[0]);
      } else {
        setActiveNoteId(null);
        setCurrentNote({ id: '', title: '', content: '', color: '#000000', images: [] });
      }
    }
  };

  // Handle content changes
  const handleContentChange = (e) => {
    setCurrentNote(prev => ({
      ...prev,
      content: e.target.value
    }));
    setIsEditing(true);
  };

  // Get note preview (first line or first 20 characters)
  const getNotePreview = (content) => {
    if (!content) return 'No content';
    const firstLine = content.split('\n')[0];
    return firstLine.length > 20 ? firstLine.substring(0, 20) + '...' : firstLine;
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // If locked, show lock screen
  if (!unlocked) {
    return <NotesLock onUnlock={handleUnlock} />;
  }

  return (
    <div className="notes-container">
      {/* Sidebar */}
      <div className="notes-sidebar">
        <div className="sidebar-header">
          <h2>My Notes</h2>
          <button 
            className="new-note-btn"
            onClick={createNewNote}
          >
            <Plus size={16} />
            New Note
          </button>
        </div>
        
        <div className="notes-list">
          {notes.length === 0 ? (
            <div className="empty-state">
              <FileText size={48} />
              <p>No notes yet</p>
              <p>Create your first note!</p>
            </div>
          ) : (
            notes.map(note => (
              <div
                key={note.id}
                className={`note-item ${activeNoteId === note.id ? 'active' : ''}`}
                onClick={() => openNote(note)}
              >
                <div className="note-content">
                  <h4 className="note-title">
                    {note.title || 'Untitled Note'}
                  </h4>
                  <p className="note-preview">
                    {getNotePreview(note.content)}
                  </p>
                  <span className="note-date">
                    {formatDate(note.updatedAt)}
                  </span>
                </div>
                <button
                  className="delete-note-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="notes-editor">
        {activeNoteId ? (
          <div className="editor-content">
            <div className="editor-header">
              <h3>{currentNote.title || 'Untitled Note'}</h3>
              <div className="editor-actions">
                {isEditing && (
                  <button 
                    className="save-btn"
                    onClick={saveNote}
                  >
                    <Save size={16} />
                    Save
                  </button>
                )}
              </div>
            </div>

            {/* Tools Bar */}
            <div className="notes-tools">
              {/* Emoji button */}
              <button 
                className="tool-btn emoji-btn" 
                title="Add Emoji" 
                onClick={toggleEmojiPicker} 
                ref={emojiButtonRef}
              >
                😊
                {/* Emoji picker - positioned relative to emoji button */}
                {showEmojiPicker && (
                  <div className="emoji-picker-container">
                    <div className="emoji-grid">
                      {['😊', '😂', '🥰', '😍', '🤔', '😎', '😢', '😡', '😴', '🤗', '😋', '😇', '😈', '👻', '🤖', '👽', '💕', '💖', '💗', '💘', '💙', '💚', '💛', '💜', '🖤', '💔', '💝', '💞', '💟', '❤️', '🧡', '💯', '💢', '💥', '💫', '💦', '💨', '💬', '💭', '💤', '💢', '💣', '💤', '💥', '💦', '💧', '💨', '💩', '💪', '👈', '👉', '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙'].map((emoji, index) => (
                        <button
                          key={index}
                          className="emoji-item"
                          onClick={() => {
                            const textarea = textareaRef.current;
                            if (!textarea) return;
                            
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const text = textarea.value;
                            const newText = text.slice(0, start) + emoji + text.slice(end);
                            
                            setCurrentNote(prev => ({
                              ...prev,
                              content: newText
                            }));
                            
                            textarea.focus();
                            const newCursorPosition = start + emoji.length;
                            textarea.selectionStart = textarea.selectionEnd = newCursorPosition;
                            setIsEditing(true);
                            setShowEmojiPicker(false);
                          }}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </button>

              {/* Color picker */}
              <div className="color-pick">
                <label htmlFor="color-picker" title="Change text color">🎨</label>
                <input 
                  type="color" 
                  id="color-picker" 
                  value={currentNote.color || '#000000'} 
                  onChange={handleColorChange} 
                />
              </div>

              {/* Image upload */}
              <button 
                className="tool-btn media-btn" 
                title="Add Photo" 
                onClick={() => fileInputRef.current.click()}
              >
                📷
              </button>
              <input 
                type="file" 
                accept="image/*" 
                multiple 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleImageChange} 
              />

              {/* Lock button */}
              <button 
                className="tool-btn lock-btn" 
                title="Lock Notes" 
                onClick={handleLock}
              >
                <Lock size={16} />
              </button>
            </div>


            
            <textarea
              ref={textareaRef}
              className="note-textarea"
              value={currentNote.content}
              onChange={handleContentChange}
              placeholder="Start writing your note..."
              style={{ color: currentNote.color || '#000000' }}
              autoFocus
            />

            {/* Uploaded images */}
            {currentNote.images && currentNote.images.length > 0 && (
              <div className="notes-images">
                {currentNote.images.map((src, index) => (
                  <div key={index} className="note-img-container">
                    <img src={src} alt={`note-${index}`} className="note-img" />
                    <button 
                      className="remove-img-btn" 
                      onClick={() => handleRemoveImage(index)}
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="note-meta">
              <span>Last updated: {formatDate(currentNote.updatedAt)}</span>
            </div>
          </div>
        ) : (
          <div className="no-note-selected">
            <FileText size={64} />
            <h3>No Note Selected</h3>
            <p>Select a note from the sidebar or create a new one to get started.</p>
            <button 
              className="new-note-btn"
              onClick={createNewNote}
            >
              <Plus size={16} />
              Create New Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// NotesLock Component
const NotesLock = ({ onUnlock }) => {
  const [error, setError] = useState('');
  const [hasPassword, setHasPassword] = useState(false);

  useEffect(() => {
    const storedPassword = localStorage.getItem('notespassword');
    if (storedPassword) {
      setHasPassword(true);
    }
  }, []);

  const setPassword = () => {
    const pwd = prompt("Set your Notes Password");
    if (pwd) {
      localStorage.setItem('notespassword', pwd);
      setHasPassword(true);
      alert('Password set successfully');
      onUnlock();
    }
  };

  const checkPassword = () => {
    const entered = prompt("Enter Your Password");
    const stored = localStorage.getItem('notespassword');
    if (entered === stored) {
      onUnlock();
    } else {
      setError('❌ Incorrect Password. Please try again.');
    }
  };

  const resetPassword = () => {
    if (window.confirm('Are you sure you want to reset password?')) {
      localStorage.removeItem('notespassword');
      setHasPassword(false);
      setError('');
    }
  };

  return (
    <div className='notes-lock-screen'>
      <h2>🔒 Secure Notes</h2>
      {!hasPassword ? (
        <button onClick={setPassword}>Set Notes Password</button>
      ) : (
        <>
          <button onClick={checkPassword}>Enter Password</button>
          <button onClick={resetPassword}>Reset Password</button>
        </>
      )}
      {error && <p style={{color:'red',marginTop:'10px'}}>{error}</p>}
    </div>
  );
};

export default Notes;
