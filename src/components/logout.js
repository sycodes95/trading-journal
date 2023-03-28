import { useEffect } from "react"


function Logout (){
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_HOST}/logout`, {
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