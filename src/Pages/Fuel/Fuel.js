// import React ,{useState}from 'react'
// import "./Fuel.css"
// import 'boxicons/css/boxicons.min.css';





// export default function Fuel() {
//   let quotes=[];
//   async function loadquotes(){
//     const response=await fetch("https://api.api-ninjas.com/v1/quotes?category=success",
//       {
//         headers:{
//           "X-Api-Key":"8hBXZ/sW+uxdqJl/hewmMg==yfNcV2lZMOcOsNgJ",
//         },
//       }
//     );
//     quotes=await response.json();
    
//   }

//   const[quote,setquote]=useState({
// text:"difficulties increase the nearer we get to goal",
// author:"johann wolfgang von Goethe",
//     });
// const random=()=>{
//   const select=quotes[Math.floor(Math.random()*quotes.length)];
//   setquote(select);
// }
// loadquotes();
//   return (
//     <div className='container'>
//     <div className='quote'>{quote.text}</div>
//     <div className='line'></div>
//     <div className='bottom'>
//       <div className='author'>{quote.author}</div>
//       <div className='icons'>
//         <i className='bx bx-rocket' onClick={()=>{random}} ></i> 
        
//       </div>
//     </div>
//     </div>
//   )
// }
import React, { useState } from 'react';
import { Rocket } from 'lucide-react';

const cssStyles = `
/* Import Google Font for a clean look */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

/* Basic body and app container styles */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.app-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
}

/* Quote card styling */
.quote-card {
  max-width: 600px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2.5rem;
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.quote-card:hover {
  transform: scale(1.02);
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
}

.quote-text {
  font-size: 1.25rem;
  font-style: italic;
  margin-bottom: 0.5rem;
  color: #333;
  transition: opacity 0.5s ease, transform 0.5s ease;
  will-change: opacity, transform;
}

.quote-author {
  font-size: 0.875rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Button styling */
.new-quote-btn {
  background-color: #6d28d9;
  color: #fff;
  border: none;
  border-radius: 9999px;
  padding: 0.75rem;
  margin-top: 1.5rem;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.new-quote-btn:hover {
  background-color: #5b21b6;
  transform: scale(1.1);
}

.new-quote-btn:active {
  transform: scale(0.95);
}

.icon {
  width: 24px;
  height: 24px;
}
`;


const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle Onassis" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Keep your eyes on the stars, and your feet on the ground.", author: "Theodore Roosevelt" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "Change your thoughts and you change your world.", author: "Norman Vincent Peale" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis" },
  { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
  { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
  { text: "The best revenge is massive success.", author: "Frank Sinatra" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas A. Edison" },
  { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
  { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
  { text: "The successful warrior is the average man, with laser-like focus.", author: "Bruce Lee" },
  { text: "If you want to achieve greatness stop asking for permission.", author: "Unknown" },
  { text: "Things work out best for those who make the best of how things work out.", author: "John Wooden" },
  { text: "To live a creative life, we must lose our fear of being wrong.", author: "Joseph Chilton Pearce" },
  { text: "If you are not willing to risk the usual, you will have to settle for the ordinary.", author: "Jim Rohn" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
  { text: "The starting point of all achievement is desire.", author: "Napoleon Hill" },
  { text: "Success is the sum of small efforts, repeated day-in and day-out.", author: "Robert Collier" },
  { text: "All our dreams can come true, if we have the courage to pursue them.", author: "Walt Disney" },
  { text: "The future belongs to the competent. Get good, get better, be the best!", author: "Brian Tracy" },
  { text: "You may have to fight a battle more than once to win it.", author: "Margaret Thatcher" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "The two most important days in your life are the day you are born and the day you find out why.", author: "Mark Twain" },
  { text: "Nothing is impossible, the word itself says 'I'm possible'!", author: "Audrey Hepburn" },
  { text: "The best preparation for tomorrow is doing your best today.", author: "H. Jackson Brown, Jr." },
  { text: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", author: "Maya Angelou" },
  { text: "If you can dream it, you can do it.", author: "Walt Disney" },
  { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "Always deliver more than expected.", author: "Larry Page" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "It's hard to beat a person who never gives up.", author: "Babe Ruth" },
  { text: "I am not a product of my circumstances. I am a product of my decisions.", author: "Stephen Covey" },
  { text: "You've got to get up every morning with determination if you're going to go to bed with satisfaction.", author: "George Lorimer" },
  { text: "Go confidently in the direction of your dreams. Live the life you have imagined.", author: "Henry David Thoreau" },
  { text: "Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless.", author: "Jamie Paolinetti" },
  { text: "The best way to appreciate your job is to imagine yourself without one.", author: "Oscar Wilde" }
];

export default function App() {
 
  const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];
  
  const [quote, setQuote] = useState(getRandomQuote());


  const handleNewQuote = () => {
    let newQuote = getRandomQuote();

    while (newQuote.text === quote.text) {
      newQuote = getRandomQuote();
    }
    setQuote(newQuote);
  };

  return (
    <>
      {/* We are placing the CSS inside a <style> tag to make the component self-contained */}
      <style>{cssStyles}</style>
      <div className="app-container">
        <div className="quote-card">
          <h2 className="title">✨ Daily Motivation ✨</h2>
          <p className="quote-text">“{quote.text}”</p>
          <p className="quote-author">— {quote.author}</p>
          <button onClick={handleNewQuote} className="new-quote-btn">
            <Rocket className="icon" />
          </button>
        </div>
      </div>
    </>
  );
}
