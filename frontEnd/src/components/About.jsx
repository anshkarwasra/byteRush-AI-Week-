import React from 'react'
import './About.css'
import img1 from './assets/1.jpg'
import img2 from './assets/2.png'
import img3 from './assets/3.png'
import img4 from './assets/4.jpg'
import img5 from './assets/5.png'
import img6 from './assets/6.png'
const About = () => {
    const imgArr = [img1,img2,img3,img4,img5,img6]
  return (
    <section className='about'>
        <div className="left">
            <div className="header">
                <h1>ABOUT <span>US</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus distinctio illum ad ducimus dolor aspernatur natus illo? Totam adipisci molestiae qui eveniet illo, ullam rerum optio laborum blanditiis neque quod?</p>
            </div>
            <div className="para">
                <h2>What Do We Do ?</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem mollitia, ratione, deleniti quibusdam sed non exercitationem expedita ex distinctio quaerat odio doloribus nihil molestias excepturi aliquam voluptates voluptate consequatur dolores?</p>
                <p style={{marginTop:'1rem'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto sunt suscipit sed ut, doloremque modi harum, quis consequatur aspernatur unde </p>
            </div>
        </div>
        <div className="right">
            <div className="imageContainer">
                {
                    imgArr.map((img,index)=>{
                        let topMargin = 0;
                        if(index%2 == 0){
                            topMargin = '3.5rem';
                        }
                        return(

                            <div className="imgBox" style={{marginTop:topMargin}}>
                                <img src={img} alt="img" key={index}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default About
