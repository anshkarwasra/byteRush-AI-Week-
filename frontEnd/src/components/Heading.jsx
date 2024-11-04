import React from 'react'
import './Heading.css'
import fox from './assets/roboFox.png'
import { useNavigate } from 'react-router-dom'
const Heading = () => {
  const navigate = useNavigate()
  return (
    <section style={{overflow: 'hidden'}} className='heading'>
      <div className="text">
        <p>Providing outstanding AI services</p>
        <h1>WELCOME TO <div>THE <span className='neon'>INQUISITOR</span></div></h1>
        <button className="btnClass" style={{position:'relative',top: '15rem',left:'8rem'}}onClick={() => navigate('/model', { state: { hideState: true } })}>Get Started</button>  
    </div>
      <div className="img">
        <img src={fox} alt="" srcset="" />
      </div>
    </section>
  )
}

export default Heading
