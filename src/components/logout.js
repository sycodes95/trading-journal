import { useEffect } from "react"


function Logout (){
  useEffect(()=>{
    fetch('http://localhost:5000/logout', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then((data)=>{
      
      if(!data.error) {
        localStorage.removeItem('token')
      }
      
    })

  },[])
}

export default Logout;