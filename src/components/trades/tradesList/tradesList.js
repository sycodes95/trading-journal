import { useEffect, useRef, useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import TradeListHead from "./tradeListHead";
import TradeListBody from "./tradeListBody";
import NewTrade from "../newTrade/newTrade";
import useDebounce from "../../hooks/useDebounce";

import { Oval, Triangle, InfinitySpin } from "react-loader-spinner";

function TradesList(props){
  const userInfo = props.userInfo

  const [trades, setTrades] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(5)
  

  const [searchValue, setSearchValue] = useState(null)
  const debouncedSearch = useDebounce(searchValue, 500)
  
  const [sortValue, setSortValue] = useState(null)

  const tableRef = useRef(null);

  const fetchTrades = () => {
    if(userInfo && userInfo.username){
      setIsLoading(true)
      fetch(`${process.env.REACT_APP_API_HOST}/trades-get?username=${userInfo.username}&limit=${limitPerPage}&skip=${page*limitPerPage}`)
      .then(response => response.json())
      .then((data) =>{
        
        if(!data.error){
          setTrades(data.trades)
          setPageCount(Math.ceil(data.count / limitPerPage) - 1)
          setIsLoading(false)
          
        }
      })
    }
  }

  const fetchSearchedTrades = () =>{
    if(userInfo && userInfo.username){
      setIsLoading(true)
      fetch(`${process.env.REACT_APP_API_HOST}/trades-search?username=${userInfo.username}&searchInput=${debouncedSearch}&limit=${limitPerPage}&skip=${page*limitPerPage}`)
      .then(res => res.json())
      .then((data)=>{
        
        if(!data.error){
          setTrades(data.result)
          setPageCount(Math.ceil(data.count / limitPerPage) - 1)
          setIsLoading(false)
          
        }
      })
    }
  }
  const searchOnChangeSubmit = (e) =>{
    setSortValue(false)
    setSearchValue(e.target.value)
  }

  const handlePageInputChange = (e) =>{
    if(e.target.value < 1){
      setPage(0)
    } else if (e.target.value > (pageCount)){
      setPage(pageCount)
    } else {
      setPage(e.target.value - 1)
    }
  }

  const handleWheelScroll = (e) => {
    //enables ability to use mouse scroll horizontally for trade table
    
    const { scrollLeft } = tableRef.current;
    
    const newScrollLeft = scrollLeft + e.deltaY;
    
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

  const handleOverlayClick = (event) => {
    event.preventDefault();
  };
   
  useEffect(()=>{
    //once userInfo is available, fetch trades
    fetchTrades()
  },[userInfo])
  
  useEffect(()=>{
    //when page changes, fetch trades according to whether search value is present or not
    if((!searchValue || searchValue == '') && !sortValue){
      return fetchTrades()
    }
    if(searchValue && searchValue !== '' && !sortValue){
      return fetchSearchedTrades()
    }
    
    
  },[page])
  
  useEffect(()=>{
    if(debouncedSearch && !sortValue){
      setPage(0)
      fetchSearchedTrades()
    }
    if(!debouncedSearch && !sortValue){
      setPage(0)
      fetchTrades()
    }
  },[debouncedSearch])

  return(
    <Dialog.Root>
      <div className="w-full mt-8">
        <div className="table-top-bar w-full grid grid-cols-2 mt-1 mb-5">
          <Dialog.Trigger className="cols-span-1 " asChild>
            
            <button className=" h-12 w-36  bg-green-800 bg-opacity-50
            hover:bg-opacity-30 transition-all rounded text-white shadow-md ">New Trade</button>
          </Dialog.Trigger>
          <div className="cols-span-1 w-full flex flex-row justify-end items-end ">
            <div className="trades-search-bar-container p-1 flex bg-black bg-opacity-25 rounded-sm">
              <input className="trades-search-bar h-6   bg-black bg-opacity-30
               text-white rounded-sm text-xs pl-2 pr-2  caret-white" 
              type='text' placeholder="Search..."  onChange={searchOnChangeSubmit}/>
              <div className="h-5 w-5">
                {
                  isLoading && debouncedSearch &&
                  <Oval height="20" width="20" csolor="#000000" secondaryColor="#FFFFFF"
                  strokeWidth="8" ariaLabel="triangle-loading" wrapperStyle={{}}
                  visible={true}/>
                }
                

              </div>
              
            </div>
            
          </div>
          <Dialog.Portal>
          
            <Dialog.Overlay className="DialogOverlay"/>
            <Dialog.Overlay/>
            <Dialog.Content className="DialogContent" onInteractOutside={handleOverlayClick} >
              {
              userInfo && <NewTrade username={userInfo.username}/>
              }
            </Dialog.Content>
           
          </Dialog.Portal>
          
          
        </div>
        
        <div className="trade-table-con w-full  scrollbar-color min-h-500px
         bg-black bg-opacity-25 col-span-2 relative overflow-x-auto" ref={tableRef} onWheel={handleWheelScroll}>
          
          <table className="absolute w-full">
            <TradeListHead tradesContext={{trades, setTrades}} pageContext={{page, setPage}}
            pageCountContext={{pageCount, setPageCount}} limitPerPageContext={{limitPerPage, setLimitPerPage}} 
            sortValueContext={{sortValue, setSortValue}} isLoadingContext={{isLoading, setIsLoading}} userInfo={userInfo}/>
            <TradeListBody isLoading={isLoading} tradesContext={{trades, setTrades}} 
            userInfo={userInfo}/>
            
          </table> 
          
        </div>
        
        <div className="w-full flex justify-center mt-2">
          <div className=" w-16 flex justify-center text-white">
            {
              page !== 0 &&
              <button className="font-bold hover:text-green-700 transition-colors" onClick={handlePrev}>
                Prev
              </button>
            }

          </div>
          <div className=" w-28 flex justify-center items-center gap-x-2">
            
            <div className="text-white">
              <input className="w-8  text-center bg-striped-dark-alt  mr-2 rounded-md" type="number" name=""
              min="1" max={pageCount + 1} value={page + 1} onChange={handlePageInputChange}/>
              <span>of {pageCount + 1}</span>       
            </div>
          
          </div>
          
          <div className=" w-16 flex justify-center text-white">
            {
              pageCount !== page && 
              <button className="font-bold hover:text-gray-400 transition-colors" onClick={handleNext}>
                Next
              </button>
            }
          </div>
          
        </div>
      </div>
    </Dialog.Root>
  )
}
export default TradesList;