import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Diary.css';
import 'emoji-picker-element';
import DiaryLock from '../Diarylock/DiaryLock'; 

export default function Diary() {
    const [unlocked, setUnlocked] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [images, setImages] = useState([]);   
    const textarearef = useRef(null);
    const emojipickerRef = useRef(null);
    const emojiButtonRef = useRef(null); 
    const fileInputRef = useRef(null);

    const handleunlock = () => {
        setUnlocked(true);
    };

    const toggleemojipicker = () => {
        setShowEmojiPicker(prev => !prev);
    };

    const handleEmojiClick = useCallback((event) => {
        const emoji = event.detail.unicode;
        const textarea = textarearef.current;
        if (!textarea) return; 

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        textarea.value = text.slice(0, start) + emoji + text.slice(end);
        
        textarea.focus();
        const newCursorPosition = start + emoji.length;
        textarea.selectionStart = textarea.selectionEnd = newCursorPosition;
    }, []); 

    const handlecolorchange = (event) => {
        if (textarearef.current) {
            textarearef.current.style.color = event.target.value;
        }
    };

    // ✅ handle image uploads
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setImages(prev => [...prev, ...newImages]);
    };

    // ✅ remove photo
    const handleRemoveImage = (index) => {
    const newImages = [...images];  // make a copy
    newImages.splice(index, 1);     // remove the image at given index
    setImages(newImages);           // update state
};

    useEffect(() => {
        const picker = emojipickerRef.current;
        if (picker) {
            picker.addEventListener('emoji-click', handleEmojiClick);
            return () => {
                picker.removeEventListener('emoji-click', handleEmojiClick);
            };
        }
    }, [showEmojiPicker, handleEmojiClick]); 

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!showEmojiPicker) return;

            if (
                emojipickerRef.current && 
                !emojipickerRef.current.contains(event.target) &&
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

    return (
        <>
        {!unlocked ? (
            <DiaryLock onUnlock={handleunlock} />
        ) : (
            <div className='diary-section'>
                <div className="diary-tool">
                    {/* Emoji button */}
                    <button id="emoji" title="Add Emoji" onClick={toggleemojipicker} ref={emojiButtonRef}>😊</button>

                    {/* Color picker */}
                    <div className="color-pick">
                        <label htmlFor="color-picker" title="change text color">🎨</label>
                        <input type="color" id="color-picker" defaultValue="#000000" onChange={handlecolorchange} />
                    </div>

                    {/* Media picker */}
                    <button 
                        id="media-btn" 
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
                    <button id="lock-btn" title="Lock Diary">🔒</button>

                    {/* Emoji picker */}
                    {showEmojiPicker && <emoji-picker ref={emojipickerRef}></emoji-picker>}
                </div>
                
                {/* Text area */}
                <textarea id="diary-entry" placeholder="Start Writing..." ref={textarearef}></textarea>

                {/* Uploaded images with remove button */}
                <div className="diary-images">
                    {images.map((src, index) => (
                        <div key={index} className="diary-img-container">
                            <img src={src} alt={`uploaded-${index}`} className="diary-img" />
                            <button 
                                className="remove-img-btn" 
                                onClick={() => handleRemoveImage(index)}
                            >
                                ❌
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )}
        </>
    );
}
