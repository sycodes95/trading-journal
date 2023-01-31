import { useEffect, useRef, useState } from "react";
import moment from "moment";

import { ReactSVG } from "react-svg";
import { Triangle } from "react-loader-spinner";
import * as Dialog from '@radix-ui/react-dialog';

import editSVG from "../../../icons/edit.svg"
import trashSVG from "../../../icons/trash.svg"

import NewTrade from "../newTrade/newTrade";
import TradeDelete from "./tradeDelete";
import TradesSort from "./tradesSort";
import TradeListHead from "./tradeListHead";
import TradeListBody from "./tradeListBody";

function TradesList(props){
  const userInfo = props.userInfo
  const [trades, setTrades] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const tableRef = useRef(null);

  const tradeTrRef = useRef(null)

  

  const fetchTrades = () => {
    setIsLoading(true)
    setTimeout(()=>{
      if(userInfo && userInfo.username){
        fetch(`http://localhost:5000/trades-get?username=${userInfo.username}`)
        .then(response => response.json())
        .then((data) =>{
          console.log(data);
          setTrades(data.trades)
          setIsLoading(false)
        })
 
      }
    },666)
  }

  const searchTrades = (e) =>{
    console.log(e.target.value);
    fetch(`http://localhost:5000/trades-search?username=${userInfo.username}&searchInput=${e.target.value}`)
    .then(res => res.json())
    .then((data)=>{
      console.log(data);
    })
  }

  const handleWheelScroll = (e) => {
    
    // Get the current scroll position
    const { scrollLeft } = tableRef.current;
    // Calculate the new scroll position based on the mouse wheel event
    const newScrollLeft = scrollLeft + e.deltaY;
    // Update the scroll position
    tableRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  }
   
  useEffect(()=>{
    //once userInfo is available, fetch trades
    fetchTrades()
  },[userInfo])

  useEffect(()=>{
    console.log(trades);
  },[trades])
  return(
    <div className="trade-table-con scrollbar-color max-w-1420px min-h-600px max-h-screen
     overflow-auto z-10 bg-white" ref={tableRef} onWheel={handleWheelScroll}>
      <div className="w-full border border-black">
        
        <input className="w-full" type='text' placeholder="Search..." onChange={searchTrades}/>
      </div>
      <table>
        <TradeListHead isLoading={isLoading} tradesContext={{trades, setTrades}}
        userInfo={userInfo}/>
        <TradeListBody isLoading={isLoading} tradesContext={{trades, setTrades}} 
        userInfo={userInfo}/>
      </table> 
    </div>
  )
}
export default TradesList;