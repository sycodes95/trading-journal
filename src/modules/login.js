import { useEffect, useRef, useState } from "react";
import { Link, redirect } from "react-router-dom";


function Login () {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  
  const [logInSuccess, setLogInSuccess] = useState(false)
  const [infoIncorrect, setInfoIncorrect] = useState(false)

  const infoIncorrectRef = useRef(null)

  function handleSubmit(e){
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json'}
    })
     .then(response => response.json())
     .then((data) => {
        console.log(data);
        
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

  useEffect(()=>{
    
    //window.location.reload()
  },[logInSuccess])

  useEffect(()=>{
    //show error message if username or pw is incorrect, hide error message other wise.
    infoIncorrect ? infoIncorrectRef.current.classList.remove('hidden') 
    : infoIncorrectRef.current.classList.add('hidden')
  }, [infoIncorrect])

  return(
    <div className="h-screen w-full flex justify-center items-center">
      {
      logInSuccess ? 

      <div>Log in successful</div>

      :

      <form className='w-2/5 border-b-2 text-black grid  gap-y-2' onSubmit={handleSubmit}>

       
        
        <label className="flex flex-row  justify-between items-center text-sm col-span-full">
          <span>Username:</span> 
          <span className="hidden text-xs text-red-500 font-thin col-span-full" ref={infoIncorrectRef} > Username or Password is incorrect </span>
        </label>
        <input className='border-b border-blue-500 outline-none col-span-full' type='text' name='username' value={formData.username} onChange={handleInputChange} maxLength='69'/>
        
        <label className="flex flex-row  justify-between items-center text-sm col-span-full"> 
          
        </label>
        <input className='border-b border-blue-500 outline-none col-span-full' type='password' name='password' value={formData.password} onChange={handleInputChange}/>
        

        
        
        <button className="col-span-full" type="submit">Submit</button>

      </form> 

      }
      
    </div>
  )
}


export default Login;