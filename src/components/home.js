import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function Home () {
  const [firstname, setFirstName] = useState(null)

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('token'))
    
    if(token) {
      fetch(`${process.env.REACT_APP_API_HOST}/verifytoken`, {
        method: 'GET',
        headers: { 'authorization': `Bearer ${token}`}
      })
      .then(response => response.json())
      .then((data) => {
          if(data.user.user){
            setFirstName(data.user.user.firstname)
          }
          
      })
      
      .catch(error => console.error(error))
      }
  }, [])
  return(
    <div className=" w-full flex justify-center items-center">
      {firstname ? <div className="text-black">{`Welcome back, ${firstname}`}</div> : null}
      <div>This is home</div>
      
    </div>
  )
}


export default Home;