import React from 'react'
import roboModel from './assets/miniRobo.png'
import './CreateModel.css'
// import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// import { createBrowserRouter } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Discord from './Discord'
// import { createBrowserRouter } from 'react-router-dom'


function CreateModelLayout(){
    return(
        <>
            <CreateModel/>
            <Outlet/>
        </>
    )
}

const CreateModel = () => {
    
  return (
        <>
            <section className="createModel">
                <div className="modelHeader">
                    <div className="headerText">
                    <h1>SCALE YOUR AUTOMATION PROGRAM WITH <span className="neon">INQUISITOR</span></h1>
                    <p>Your community marketplace to speed discovery, development of intelligent automation</p>
                    </div>
                    <div className="roboImg"><img src={roboModel} alt=""  /></div>
                </div>
            </section>
        </>
  )
}

function CardSection(){
    const botPipeline = [
        {
            title:'Discord',
            img: 'img1',
        },
       
   
    ]
    const navigate = useNavigate()
    return(
        <>
            <div className="cardSection">
                        {
                            botPipeline.map((element,index)=>{
                                return(
                                    <div class="card" key={index}>
                            <h3 class="card-title neon-text">{element.title}</h3>
                            <div class="card-content">
                                Your card content goes here
                            </div>
                            <button class="card-button" onClick={() => navigate('/model/discord', { state: { hideState: true } })}>
                                Action
                            </button>
                        </div>
                                )
                            })
                        }
                    </div>
        </>
    )
}

const modelRoutes = 
    [
        {
            path:'/model',
            element: <CreateModelLayout/>,
            children:[
                {
                    path:'',
                    element:<CardSection/>
                },
                {
                    path:'discord',
                    element:   <Discord />
                     

                },
            ]
        }
    ]


export { modelRoutes }

export default CreateModel