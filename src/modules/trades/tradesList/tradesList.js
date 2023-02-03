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

  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(1)

  const [searchValue, setSearchValue] = useState(null)

  const tableRef = useRef(null);

  const tradeTrRef = useRef(null)

  const fetchTrades = () => {
    setIsLoading(true)
    setTimeout(()=>{
      if(userInfo && userInfo.username){
        fetch(`http://localhost:5000/trades-get?username=${userInfo.username}&limit=${limitPerPage}&skip=${page*limitPerPage}`)
        .then(response => response.json())
        .then((data) =>{
          console.log(data);
          if(!data.error){
            setTrades(data.trades)
            setIsLoading(false)
            setPageCount(Math.ceil(data.count / limitPerPage) - 1)
          }
        })
      }
    },666)
  }

  const fetchSearchTrades = () =>{
    if(userInfo && userInfo.username){
      fetch(`http://localhost:5000/trades-search?username=${userInfo.username}&searchInput=${searchValue}&limit=${limitPerPage}&skip=${page*limitPerPage}`)
      .then(res => res.json())
      .then((data)=>{
        setTrades(data.result)
        setPageCount(Math.ceil(data.count / limitPerPage) - 1)
        console.log(data);
      })
    }

  }
  const searchTrades = (e) =>{
    setSearchValue(e.target.value)
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

  const handlePrev = () =>{
    setPage((page)=>{
      return page - 1
    })

  }
  const handleNext = () =>{
    setPage((page)=>{
      return page + 1
    })

  }
   
  useEffect(()=>{
    //once userInfo is available, fetch trades
    fetchTrades()
    console.log('user');
  },[userInfo])

  useEffect(()=>{
    !searchValue && fetchTrades()
    searchValue && fetchSearchTrades()
    console.log('page');
  },[page])


  useEffect(()=>{
    if(searchValue){
      fetchSearchTrades()
    }
    if(searchValue === '' || !searchValue){
      setPage(0)
      fetchTrades()
    }
    console.log(searchValue);
    
  },[searchValue])
  return(
    <div className="w-full ">
      <div className="w-full flex justify-end">
        <input className="w-80 border border-yellow-500" type='text' placeholder="Search..."
         value={searchValue} onChange={searchTrades}/>
      </div>

      <div className="trade-table-con scrollbar-color  min-h-600px max-h-screen
      overflow-x-scroll z-10 bg-white col-span-2" ref={tableRef} onWheel={handleWheelScroll}>
        
        <table className="trade-table-con ">
          <TradeListHead isLoading={isLoading} tradesContext={{trades, setTrades}}
          userInfo={userInfo}/>
          <TradeListBody isLoading={isLoading} tradesContext={{trades, setTrades}} 
          userInfo={userInfo}/>
        </table> 
        
      </div>
      <div className="w-full flex justify-end">
        {
          page !== 0 &&
          <button onClick={handlePrev}>
            Prev
          </button>
        }
        {
          pageCount !== page && 
          <button onClick={handleNext}>
            Next
          </button>
        }
        
      </div>
    </div>
  )
}
export default TradesList;