import React from 'react'
import './chatUi.css'
import upArrow from './assets/arrow.svg'
import { useState } from 'react'
import { useRef } from 'react'
import webLogo from './assets/webLogo.svg'
import userLogo from './assets/user.svg'
import axios from 'axios'
import { useLayout } from './Dashboard'


function ChatUi({ heading,isUpload }) {
  const [prompt, setprompt] = useState('')
  // const [tempPrompt, settempPrompt] = useState('')
  const inputRef = useRef(null)
  const [response, setresponse] = useState('')
  const [loading, setloading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }
  
  const handleChange = (e) => {
    setprompt(e.target.value)
  }

  let url;

  if(isUpload){
    url = 'http://localhost:5000/AITutor';
  }
  else{
    url  = 'http://localhost:5000/AI'
  }
  
  const formatCode = (input) => {
    // Replace single quote with semicolon
    let formatted = input.replace(/'/g, ';');

    // Indent braces and new lines
    formatted = formatted.split(/({)/g).join('\n');
    formatted = formatted.split(/(})/g).join('\n');



    return formatted;
  };

  const handleClick = () => {
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('file', selectedFile);
    console.log(formData)
    console.log(url)
    setloading(true)
    axios(
      {
        method: 'post',
        url: url,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    ).then((res) => {
      console.log(res.data)
      let resArray = (res.data).split("**");
      let newArray;
      for (let i = 0; i < resArray.length; i++) {
        if (i === 0 || i % 2 === 0) {
          newArray += resArray[i]
        }
        else {
          newArray += "<b style='font-size:20px'>" + resArray[i] + "</b>"
        }
      }
      newArray = newArray.split("```")
      let responseArray;
      for (let i = 0; i < newArray.length; i++) {
        if (i % 2 === 0 || i === 0) {
          responseArray += newArray[i]
        }
        else {
          
          // let code = formatCode(resArray[i])
          responseArray += "</br><div style='background-color: rgb(90,90,90); padding: 10px; border-radius: 5px; margin-bottom: 10px;'><code>" + formatCode(newArray[i]) + "</code></div></br>"

        }
      }
      let newArray2 = responseArray.split("*").join("</br>")
      newArray2 = newArray2.split("`").join("</br>")
      setresponse(newArray2.split("undefined")[2])
      setloading(false)
    })
    inputRef.current.value = ''
  }
  const { Left } = useLayout()
  console.log("ChatUi - Left state:", Left);

  return (
    <>
        
      <div className='chatContainer'   >
        <h1 style={{ textAlign: 'center',color:'white',position:'absolute',top:'22vh',left:'50%',transform:'translateX(-50%)',zIndex:'990' }}>{heading}</h1>
        <div className="uperContent" style={{width: Left ? '80vw' : '100vw',transition:'.5s all',left: Left ? '20vw' : '0vw'}}>
          <div className="userPrompt">
            {
              prompt ? <div className="info" style={{ position: 'absolute', left: '-39px' }}>
                <i><img src={userLogo} alt="" srcset="" /></i>
                <p>user</p>
              </div> : <div></div>
            }
            <p style={{ wordWrap: 'break-word' }}>{prompt}</p>
          </div>
          <div className="response">
            {
              response ? <div className="info" style={{ position: 'absolute', left:Left ? '60px' : '200px' }}>
                <i><img src={webLogo} style={{ width: '30px', height: '30px', marginLeft: '32.5px' }} /></i>
                <p>Assitant</p>
              </div> : <div></div>
            }
            {loading ? <div className="loader">
              <hr />
              <hr />
              <hr />
            </div> : <p style={{ wordWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: response }}></p>}
          </div>
          
        </div>
        <div className="inputSection" style={{width: Left ? '80vw' : '100vw',transition:'.5s all',left: Left ? '20vw' : '0vw'}}>
          <textarea  cols="30" rows="10" onChange={handleChange} ref={inputRef} placeholder="enter your query here" className='inpBox' tabindex="1"></textarea>
          <button className='upArrow' onClick={handleClick}>
            <i><img src={upArrow} /></i>
          </button>
          {
            isUpload ? <input type="file" onChange={handleFileChange} /> : ''
          }
        </div>
      </div>
    </>
  )
}

export default ChatUi