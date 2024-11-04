import React, { useState } from 'react';
import './Discord.css';
import axios from 'axios';


const Discord = () => {
  const [botType, setBotType] = useState('simple');
  const [canEmbed, setCanEmbed] = useState(false);
  const [greetMessage, setGreetMessage] = useState('');
  const [Url, setUrl] = useState('')
  const [ShowUrl, setShowUrl] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData()
    formData.append('type',botType),
    formData.append('canAttach',String(canEmbed))
    formData.append('greetMsg',greetMessage)
    axios.post('http://localhost:5000/botGenerator',formData).then(Response=>{
        setUrl(String(Response.data))
        setShowUrl(true)
    }).catch(Error=>{
        console.log(Error)
    })
  };

  return (
    <>
        <div className="discord-container">
      <div className="form-container">
        <h1 className="main-heading">
          How do we customize your <span className="neon-text">Bot!</span>
        </h1>
        
        <form onSubmit={handleSubmit} className="bot-form">
          {/* Bot Type Selection */}
          <div className="form-group">
            <label className="form-label">
              Choose Your Bot Type
            </label>
            <div className="button-group">
              <button
                type="button"
                onClick={() => setBotType('simple')}
                className={`bot-type-btn ${botType === 'simple' ? 'active' : ''}`}
              >
                Simple Bot
              </button>
              <button
                type="button"
                onClick={() => setBotType('genai')}
                className={`bot-type-btn ${botType === 'genai' ? 'active' : ''}`}
              >
                Gen.AI Bot
              </button>
            </div>
          </div>

          {/* Media Embedding Toggle */}
          <div className="form-group">
            <label className="form-label">
              Enable Media Embedding
            </label>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={canEmbed}
                onChange={(e) => setCanEmbed(e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label">
                {canEmbed ? 'Enabled' : 'Disabled'}
              </span>
            </label>
          </div>

          {/* Greeting Message */}
          <div className="form-group">
            <label className="form-label">
              Greeting Message
            </label>
            <textarea
              value={greetMessage}
              onChange={(e) => setGreetMessage(e.target.value)}
              placeholder="Enter your welcome message..."
              className="greeting-input"
              rows="4"
            />
          </div>

          {/* Submit Button */}
          {
            ShowUrl ? <>
                <p style={{color:'white'}}>the bots url ready</p><a href={Url}>click here to deploy it</a>
            </> : <button type="submit" className="submit-btn">Create Bot</button>
          }
        </form>
      </div>
    </div>
    </>
  );
};

export default Discord;