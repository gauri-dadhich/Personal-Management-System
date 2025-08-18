import React from "react";
import './Ho.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home">
            <div className="header">
<div className="home-title">

            <img src="/to-do-list.gif" alt='sayurday' />
            <h1 className="sub">Say-ur-Day...</h1>
</div>
            
            <div className="links">
                <a href='#about'><button>Features</button></a>
                <a href='#features'><button>About Project</button></a>
<Link to="/login"><button >Login</button></Link>
            <Link to="/Signip"><button>Sign-Up</button></Link>
<a href="#review"><button>Reviews</button></a>
                <a href='#contact'><button>Contact Us</button></a>
            </div>
            </div>
     <div className="content">
  <div className="content-card box">
    <img src="todo.gif" alt="todo" className="top-image" />
    <h1 className="box-heading">Come Create Daily Tasks with Me</h1>
    <img src="blink.gif" alt="emoji" className="bottom-image" />
  </div>

  <div className="c2 box">
    <img src="d.gif" alt="diary" className="top-image" />
    <h1 className="box-heading">Write Your Diary with Me</h1>
    <img src="writing.gif" alt="writing" className="bottom-image" />
  </div>

  <div className="c3 box">
    <img src="cakendar.gif" alt="calendar" className="top-image" />
    <h1 className="box-heading">What's special Hmmmmm</h1>
    <img src="eye.gif" alt="eye" className="bottom-image" />
  </div>

  <div className="c4 box">
    <img src="fuel.gif" alt="fuel" className="top-image" />
    <h1 className="box-heading">Let's Fuel Our Mind</h1>
    <img src="cool.gif" alt="cool" className="bottom-image" />
  </div>
</div>
     
            <section id="about">
        <h2>Why To Use?</h2>
        <div className="features-container">

            <div>
                <img src="diary.webp" alt="o"/>
                <h3>Password Protection</h3>
                <p>Protect Your Entries with Password</p>
            </div>
<div>
    <img src="emojis.jpg" alt="o"/>
    <h3> Emojis</h3>
    <p>Decorate notes with Emojis.</p>
    
</div>
<div>
    <img src="color.jpg" alt="o"/>
    <h3>Personal Colors</h3>
    <p>Have your diary in your favorite color.</p>
    
</div>
<div>
    <img src="up.png" alt="o"/>
    <h3>Easy to Use</h3>
    <p>It's extremely easy to use!</p>
    
</div>
</div>
</section>
            <section id="features" className="section">

                 <div className="features-grid">
        
        <div className="features-column">
            <div className="feature-item">
                <div className="feature-text">
                    <h4>Codelock Security</h4>
                    <p>Secure your diary with a personal PIN, code or password.</p>
                </div>
                <div className="feature-icon">
                    <span>🔒</span>
                </div>
            </div>
            <div className="feature-item">
                <div className="feature-text">
                    <h4>Custom Colors</h4>
                    <p>Apply your favorite background color, font style, and text color.</p>
                </div>
                <div className="feature-icon">
                    <span>🎨</span>
                </div>
            </div>
            <div className="feature-item">
                <div className="feature-text">
                    <h4>Synchronize Devices</h4>
                    <p>Sync entries between your phone and computer seamlessly.</p>
                </div>
                <div className="feature-icon">
                    <span>🔄</span>
                </div>
            </div>
        </div>
        
        <div className="features-phone">
            <img src="Screenshot 2025-07-23 191644.png" alt="App screenshot on a phone"/>
        </div>
        
        <div className="features-column">
            <div className="feature-item right">
                <div className="feature-icon">
                    <span>🔍</span>
                </div>
                <div className="feature-text">
                    <h4>Search</h4>
                    <p>Quickly find old entries by searching for keywords.</p>
                </div>
            </div>
            <div className="feature-item right">
                <div className="feature-icon">
                    <span>☁️</span>
                </div>
                <div className="feature-text">
                    <h4>Cloud Storage</h4>
                    <p>Keep your notes synced with our cloud (works as backup).</p>
                </div>
            </div>
            <div className="feature-item right">
                <div className="feature-icon">
                    <span>🔔</span>
                </div>
                <div className="feature-text">
                    <h4>Daily Reminder</h4>
                    <p>Setup a reminder to notify you when you forgot to write.</p>
                </div>
            </div>
        </div>
    </div>


            </section>
<section id="review">
    <h1>
        Review-Us
    </h1>
    <div id="form">
        
        <span>For more information,Feel free to contact us</span>
        <form>
            <input type="text" placeholder="Your Name..."/>
            <input type="text" placeholder="Your Email..."/>
        </form>    
        <textarea id="msg" placeholder="Your Message..."></textarea>
        <button>SEND</button>
    </div>
</section>

<section id="contact">
    <div className="contact-wrapper">
        <div className="section-header">
            <h2>Contact Us</h2>
            <p>Have a question or want to say hello? We'd love to hear from you.</p>
        </div>
        
        <div className="contact-content">
            
            <div className="contact-info">
                <h3>Get in Touch</h3>
                <p>Feel free to reach out through any of the methods below.</p>
                
                <div className="info-item">
                    <span className="icon">📍</span>
                    <div className="info-text">
                        <h4>Our Location</h4>
                        <p>PIET,Jaipur</p>
                    </div>
                </div>
                
                <div className="info-item">
                    <span className="icon">✉️</span>
                    <div className="info-text">
                        <h4>Email Us</h4>
                        <p>2023pietad********@poornima.org</p>
                    </div>
                </div>
                
                <div className="info-item">
                    <span className="icon">📞</span>
                    <div className="info-text">
                        <h4>Call Us</h4>
                        <p>+91 **********</p>
                    </div>
                </div>
            </div>
            
           </div>
           </div>
     
        </section>
        </div>


    );
};
export default Home;