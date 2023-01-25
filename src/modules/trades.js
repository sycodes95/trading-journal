import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NewTrade from "./newTrade";
import TradingRules from "./tradingRules";


function Trades () {
  const [userInfo, setUserInfo] = useState(null)

  const [addTradeClicked, setAddTradeClicked] = useState(false)

  const newTradeRef = useRef(null)

  const handleAddTrade = () => {
    setAddTradeClicked(true)
  }

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
    <div className="h-screen w-full  pt-8 p-12 ">
      <div className="text-3xl text-black font-bold pb-8 ">
        <span>Journal</span>
      </div>
      <div className="text-sm h-12">
        <button className="h-16 w-32 border border-black" onClick={handleAddTrade}>New Trade</button>
      </div>
      <div>
        {
          addTradeClicked && 
          <div className="new-trade grid grid-col-2 grid-row-0 h-full w-96 border
          border-black pt-8 pb-8 " ref={newTradeRef} >
            <NewTrade userInfo={userInfo} addTradeClickedContext={{addTradeClicked, setAddTradeClicked}}/>
          </div>
        }
      </div>
    </div>
  )
}


export default Trades;