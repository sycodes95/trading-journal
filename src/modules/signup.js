import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


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
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json'}
    })
     .then(response => response.json())
     .then((data) => {
        console.log(data);
        
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
            console.log('pw');
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
    console.log(formData.password);
    console.log(formData.confirmPassword);
  }, [formData])

  return(
    <div className="h-screen w-full flex justify-center items-center">
      {
      signUpSuccess ? 

      <div>Signed Up And Ready To Win!!!</div>

      :

      <form className='w-2/5 border-b-2 text-black grid  gap-y-2' onSubmit={handleSubmit}>

        <label className="flex flex-col justify-end text-sm col-span-full">First Name: </label>
        <input className=' border-b border-blue-500 outline-none col-span-full' type='text' name='firstname' value={formData.firstname} onChange={handleInputChange} maxLength='69'/>
        
        <label className="flex flex-col justify-end text-sm col-span-full"> Last Name: </label>
        <input className='border-b border-blue-500 outline-none col-span-full' type='text' name='lastname' value={formData.lastname} onChange={handleInputChange} maxLength='69'/>
        
        <label className="flex flex-row  justify-between items-center text-sm col-span-full">
          <span>Username:</span> <span className="hidden text-xs text-red-500 font-thin col-span-full" ref={usernameTakenRef}> Username Taken! </span>
        </label>
        <input className='border-b border-blue-500 outline-none col-span-full' type='text' name='username' value={formData.username} onChange={handleInputChange} maxLength='69'/>
        
        <label className="flex flex-row  justify-between items-center text-sm col-span-full"> 
          <span>Password:</span> <span className="hidden text-xs text-red-500 font-thin col-span-full" ref={passwordNotMatchRef}> Passwords Did Not Match!</span>  
        </label>
        <input className='border-b border-blue-500 outline-none col-span-full' type='password' name='password' value={formData.password} onChange={handleInputChange}/>
        

        <label className="flex flex-col justify-end text-sm col-span-full"> Confirm password: </label>
        <input className='border-b border-blue-500 outline-none col-span-full' type='password' name='confirm_password' value={formData.confirm_password} onChange={handleInputChange}/>
        
        <button className="col-span-full" type="submit">Submit</button>

      </form> 

      }
      
    </div>
  )
}


export default Signup;