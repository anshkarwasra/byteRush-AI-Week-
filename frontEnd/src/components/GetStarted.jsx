import React from 'react'
import './GetStarted.css'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const GetStarted = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const hiddenState = location.state?.hideState;
  return (
    <>
        <section className="getStarted" style={{display: hiddenState ? 'none' : 'flex'}}>
            <div className="startContent">
                <h1><span className="neon">GLOBAL</span> REACH </h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro esse corrupti rerum ullam autem dolore, exercitationem quasi eos, velit reprehenderit, dolorum dolorem. Assumenda distinctio voluptatibus tempore saepe eos eius vitae!</p>
                <button className="btnClass" onClick={() => navigate('/model', { state: { hideState: true } })}>Get Started</button>
            </div>
        </section>
    </>
  )
}

export default GetStarted
