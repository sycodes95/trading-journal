import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import earth from "../images/earth.svg"


function Signup () {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirm_password: '',
  })

  const [signUpSuccess, setSignUpSuccess] = useState(false)

  const [userNameTaken, setUserNameTaken] = useState(false)
  const [passwordNotMatch, setPasswordNotMatch] = useState(false)

  const usernameTakenRef = useRef(null)
  const passwordNotMatchRef = useRef(null)

  

  function handleSubmit(e){
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_HOST}/signup`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json'}
    })
     .then(response => response.json())
     .then((data) => {
        
        if(data.user){
          setSignUpSuccess(true)
          window.location.href = '/'
        } else {
          if(data.errors.code == 11000){
            setUserNameTaken(true)
          } else {
            setUserNameTaken(false)
          }
          if(data.errors[0].param === 'confirm_password'){
            setPasswordNotMatch(true)
            
          } else {
            setPasswordNotMatch(false)
          }
        }
        //setSignUpSuccess(true)
     
     })
     
     .catch(error => console.error(error))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  useEffect(()=>{
    userNameTaken ? usernameTakenRef.current.classList.remove('hidden') 
    : usernameTakenRef.current.classList.add('hidden')
    passwordNotMatch ? passwordNotMatchRef.current.classList.remove('hidden') 
    : passwordNotMatchRef.current.classList.add('hidden')
  }, [userNameTaken, passwordNotMatch ])
  
  useEffect(()=>{
    
  }, [formData])

  return(
    <div className=" w-full flex justify-center items-center ">
      {
      signUpSuccess ? 

      <div>Signed Up And Ready To Win!!!</div>

      :

      <form className='w-80 p-4 text-black grid  gap-y-2 bg-striped-dark-alt 
      border-4 border-black border-opacity-40 relative top-36 ' onSubmit={handleSubmit}>
        <div className="h-16 form-logo flex justify-center mt-4">
          <ReactSVG className="text-gray-500 fill-current" src={earth}/>
        </div>

        <div className="text-center text-gray-300 mt-2 font-bold font-black-outline-light">
          <span>REGISTER NEW ACCOUNT</span>
        </div>

        <label className="flex justify-center text-xs col-span-full mt-4 text-white">First Name </label>
        <input className=' outline-none col-span-full w-3/4 justify-self-center caret-white text-white
        bg-black' 
        type='text' name='firstname' value={formData.firstname} onChange={handleInputChange} maxLength='69'/>
        
        <label className="flex justify-center text-xs col-span-full text-white"> Last Name </label>
        <input className=' outline-none col-span-full w-3/4 justify-self-center caret-white text-white
        bg-black' 
        type='text' name='lastname' value={formData.lastname} onChange={handleInputChange} maxLength='69'/>
        
        <label className="flex justify-center items-center text-xs col-span-full text-white">
          <span>Email</span> <span className="hidden text-xs text-red-500 font-thin col-span-full " ref={usernameTakenRef}> Username Taken! </span>
        </label>
        <input className='outline-none col-span-full w-3/4 justify-self-center caret-white text-white
        bg-black' type='text' name='username' 
        value={formData.username} onChange={handleInputChange} maxLength='69'/>
        
        <label className="flex justify-center items-center text-xs col-span-full text-white"> 
          <span>Password</span> <span className="hidden text-xs text-red-500 font-thin col-span-full" ref={passwordNotMatchRef}> Passwords Did Not Match!</span>  
        </label>
        <input className='outline-none col-span-full w-3/4 justify-self-center caret-white text-white
        bg-black' 
        type='password' name='password' value={formData.password} onChange={handleInputChange}/>
        

        <label className="flex justify-center text-xs col-span-full text-white"> Confirm password </label>
        <input className=' outline-none col-span-full w-3/4 justify-self-center caret-white text-white
        bg-black' 
        type='password' name='confirm_password' value={formData.confirm_password} onChange={handleInputChange}/>
        
        <div className="flex justify-center mt-8 mb-8">
          <button className="col-span-full bg-opacity-70 bg-black hover:bg-opacity-90 transition-all h-10 w-3/4 justify-self-center text-white"
           type="submit">REGISTER</button>
        </div>

      </form> 

      }
      
    </div>
  )
}


export default Signup;