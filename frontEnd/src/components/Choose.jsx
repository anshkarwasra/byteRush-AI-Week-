import React from 'react'
import './Choose.css'
import cyberMan from './assets/cyberImages/cyberMan.png'
import { useRef } from 'react';
const Choose = () => {

    const cardRef1 = useRef(null);
    const cardRef2 = useRef(null);
    const cardRef3 = useRef(null);
    const cardRef4 = useRef(null);
    const setBg = (ref)=>{
        if(ref.current.style.background === 'rgb(1, 234, 249)'){
            ref.current.style.background = 'linear-gradient(#062A44, #06131E)';
            const h1Elimnet = ref.current.querySelector('h1');
            h1Elimnet.style.color = 'rgb(1, 234, 249)';
        }
        else{  
            ref.current.style.background = '#01EAF9';
            const h1Elimnet = ref.current.querySelector('h1');
            h1Elimnet.style.color = '#062A44';
        }
        console.log('done');
    }
    return (
        <section className="choose">
            <div className="questionHeading">
                <h1>WHY <span className="neon">CHOOSE US</span></h1>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores ea a possimus sequi tempore accusantium aliquam odit delectus vero in. Tempora, aperiam? Quod nesciunt dolores mollitia quidem illo. Beatae, non.
                </p>
            </div>

            <div className="cardGroup">
                <div className="card" ref={cardRef1} onClickCapture={()=>setBg(cardRef1)}>
                    <h1 className="neon">Card 01</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, possimus nihil optio a ut autem repudiandae, alias magnam tenetur eligendi corporis illo vitae quisquam totam illum quis dolorum impedit ipsam?
                    </p>
                </div>

                <div className="card" ref={cardRef2} onClickCapture={()=>setBg(cardRef2)}>
                    <h1 className="neon">Card 02</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, possimus nihil optio a ut autem repudiandae, alias magnam tenetur eligendi corporis illo vitae quisquam totam illum quis dolorum impedit ipsam?
                    </p>
                </div>

                <div className="card" ref={cardRef3} onClickCapture={()=>setBg(cardRef3)}>
                    <h1 className="neon">Card 03</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, possimus nihil optio a ut autem repudiandae, alias magnam tenetur eligendi corporis illo vitae quisquam totam illum quis dolorum impedit ipsam?
                    </p>
                </div>

                <div className="card" ref={cardRef4} onClickCapture={()=>setBg(cardRef4)}>
                    <h1 className="neon">Card 04</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, possimus nihil optio a ut autem repudiandae, alias magnam tenetur eligendi corporis illo vitae quisquam totam illum quis dolorum impedit ipsam?
                    </p>
                </div>
            </div>

            <div className="cyberMan">
                <img src={cyberMan} alt="" srcset="" />
            </div>
        </section>
    );
};

export default Choose
