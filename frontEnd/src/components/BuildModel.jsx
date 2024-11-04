import React from 'react'
import './BuildModel.css'
import img1 from './assets/cyberImages/2.jpg'
import img2 from './assets/cyberImages/3.jpg'
import img3 from './assets/cyberImages/4.jpg'
import img4 from './assets/cyberImages/5.jpg'
import img5 from './assets/cyberImages/6.jpg'
import Choose from './Choose'
const BuildModel = () => {
    const imgArr = [img1,img2,img3,img4,img5]
    return (
        <>
            <section className="buildModel">
             
                <div className="slogenSec">
                    <div className="slogenHeading">
                      <div><span className="neon">BUILD</span> AND</div>
                      <div>SCALE <span className="neon">MODEL</span></div>
                    </div>
                    <div className="slogenPara">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga vero cupiditate ad 
                    </p>
                    </div>
                </div>
                <div className="cyber"><img src={imgArr[Math.floor(Math.random()*5)]} className="cyberImg" alt="" /></div>
                <div className="cyber"><img src={imgArr[Math.floor(Math.random()*5)]} className="cyberImg" alt="" /></div>
                <div className="cyber"><img src={imgArr[Math.floor(Math.random()*5)]} className="cyberImg" alt="" /></div>
                <div className="cyber"><img src={imgArr[Math.floor(Math.random()*5)]} className="cyberImg" alt="" /></div>
                <div className="cyber"><img src={imgArr[Math.floor(Math.random()*5)]} className="cyberImg" alt="" /></div>
            </section>
            <Choose/>
        </>
    )
}

export default BuildModel
