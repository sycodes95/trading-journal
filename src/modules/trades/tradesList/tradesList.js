import { useEffect, useRef, useState } from "react";

function TradesList(props){
  const userInfo = props.userInfo
  console.log(userInfo);
  useEffect(()=>{
    if(userInfo && userInfo.username){
      fetch(`http://localhost:5000/trades-get?username=${userInfo.username}`)
      .then(response => response.json())
      .then((data) =>{
        console.log(data);
      })

    }
    
  },[userInfo])
  return(
    <div>trades</div>
  )
}

export default TradesList;