import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NewTrade from "./newTrade";


function Trades () {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(()=>{
    //Token
    const token = JSON.parse(localStorage.getItem('token'))
    console.log(token);
    if(token) {
      fetch('http://localhost:5000/verifytoken', {
        method: 'GET',
        headers: { 'authorization': `Bearer ${token}`}
      })
      .then(response => response.json())
      .then((data) => {
        
        if(data.user.user){
          setUserInfo(data.user.user)
          console.log(userInfo)
        }
      })
      .catch(error => console.error(error))
      }
  }, [])
  return(
    <div className="h-screen w-full flex flex-col  items-center">
      {
        userInfo ? 
        <div>
          <div className="text-gray-400 text-2xl font-bold">{`${userInfo.username}'s trades`}</div>
          <NewTrade userInfo={userInfo}/>
        </div>
        
        :
        null
      }
      
      
      
      
    </div>
  )
}


export default Trades;