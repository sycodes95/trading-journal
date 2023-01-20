import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function Profile () {
  

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('token'))
    console.log(token);
    if(token) {
      fetch('http://localhost:5000/verifytoken', {
        method: 'GET',
        headers: { 'authorization': `Bearer ${token}`}
      })
      .then(response => response.json())
      .then((data) => {
          console.log(data);
          if(data.user.user){
            console.log(data.user.user.firstname);
          }
      })
      .catch(error => console.error(error))
      }
  }, [])
  return(
    <div className="h-screen w-full flex justify-center items-center">
      
      <div>This is Profile</div>
      
    </div>
  )
}


export default Profile;