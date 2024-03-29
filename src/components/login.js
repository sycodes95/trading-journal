import { useEffect, useRef, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { ReactSVG } from "react-svg";
import earth from "../images/earth.svg"
import stockmarketvisual from '../images/stockmarketvisual.png'
function Login () {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  
  const [logInSuccess, setLogInSuccess] = useState(false)
  const [infoIncorrect, setInfoIncorrect] = useState(false)

  const [demoAcc, setDemoAcc] = useState(false)

  const infoIncorrectRef = useRef(null)

  function handleSubmit(e){
    e && e.preventDefault();
    fetch(`${process.env.REACT_APP_API_HOST}/login`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json'}
    })
     .then(response => response.json())
     .then((data) => {
        
        
        if(data.token){
          setLogInSuccess(true)
          localStorage.setItem('token', JSON.stringify(data.token))
          window.location.href = '/'
        } else {
          setInfoIncorrect(true)
        }
        //setSignUpSuccess(true)
     
     })
     
     .catch(error => console.error(error))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDemoAccount = () =>{
    setFormData({
      username: process.env.REACT_APP_DEMO_EMAIL,
      password: process.env.REACT_APP_DEMO_PASSWORD
    })

    setDemoAcc(true)

  }
  useEffect(()=>{
    demoAcc && handleSubmit()
    //window.location.reload()
  },[demoAcc])

  useEffect(()=>{
    //show error message if username or pw is incorrect, hide error message other wise.
    infoIncorrect ? infoIncorrectRef.current.classList.remove('hidden') 
    : infoIncorrectRef.current.classList.add('hidden')
  }, [infoIncorrect])

  return(
    <div className=" w-full h-full flex justify-center mt-24 overflow-visible">
      <img className='absolute h-full w-full bottom-0 opacity-5 grayscale object-cover' src={stockmarketvisual} alt=""/>
      {
      logInSuccess ? 

      <div className="w-80 h-96 p-4  text-black flex flex-col gap-y-2 bg-black bg-opacity-40 relative top-36 text-xs
      ">
        Fetching Data...
      </div>

      :

      <form className='w-80 h-fit p-4  text-white flex flex-col gap-y-2 bg-black bg-opacity-40 relative
      border border-black rounded-md ' 
      onSubmit={handleSubmit}>

       
        <div className="h-16 form-logo flex justify-center mt-4">
          <ReactSVG className="text-gray-500 fill-current" src={earth}/>
        </div>
        <div className="text-center text-gray-300 mt-2 font-bold font-black-outline-light">
          <span>AUTHORIZATION</span>
        </div>
        <label className="flex flex-row justify-center items-center col-span-full text-xs mt-4">
          <span>EMAIL</span> 
          <span className="hidden text-xs text-red-500 font-thin col-span-full" ref={infoIncorrectRef} > Username or Password is incorrect </span>
        </label>
        <div className="flex justify-center">
          <input className='outline-none col-span-full h-6 w-3/4 justify-self-center bg-black caret-white' 
          type='text' name='username' value={formData.username} onChange={handleInputChange} maxLength='69'/>

        </div>
        
        
        <label className="flex flex-row justify-center items-center col-span-full text-xs"> 
          <span>PASSWORD</span> 
        </label>
        <div className="flex justify-center">
          <input className=' outline-none col-span-full h-6 w-3/4 justify-self-center bg-black caret-white' 
          type='password' name='password' value={formData.password} onChange={handleInputChange}/>
            
        </div>
       
        

        
        <div className="flex justify-center mt-8">
          <button className="col-span-full bg-opacity-50 bg-black hover:bg-opacity-90 transition-all h-10 w-3/4 justify-self-center text-white"
           type="submit">LOGIN</button>
        </div>

        <div className="flex justify-center mt-4 mb-4">
          <button className="col-span-full bg-opacity-70 bg-red-500 hover:bg-opacity-90 transition-all h-5 w-3/4 justify-self-center text-white text-xs" 
          onClick={handleDemoAccount}>USE DEMO ACCOUNT</button>
        </div>
        

      </form> 

      }
      
    </div>
  )
}


export default Login;