import { useEffect, useRef, useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import TradeListHead from "./tradeListHead";
import TradeListBody from "./tradeListBody";
import NewTrade from "../newTrade/newTrade";

function TradesList(props){
  const userInfo = props.userInfo

  const [trades, setTrades] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(2)

  const [searchValue, setSearchValue] = useState(null)
  const [sortValue, setSortValue] = useState(null)

  const tableRef = useRef(null);
  const overlayRef = useRef(null);

  

  const fetchTrades = () => {
    setIsLoading(true)
    
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
    
  }

  const fetchSearchedTrades = () =>{
    if(userInfo && userInfo.username){
      setIsLoading(true)
      fetch(`http://localhost:5000/trades-search?username=${userInfo.username}&searchInput=${searchValue}&limit=${limitPerPage}&skip=${page*limitPerPage}`)
      .then(res => res.json())
      .then((data)=>{
        setIsLoading(false)
        setTrades(data.result)
        setPageCount(Math.ceil(data.count / limitPerPage) - 1)
        console.log(data);
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
    console.log('user');
  },[userInfo])

  useEffect(()=>{
    //when page changes, fetch trades according to whether search value is present or not
    !searchValue && !sortValue && fetchTrades()
    searchValue && !sortValue && fetchSearchedTrades()
  },[page])


  useEffect(()=>{
    //when search value exists, fetch searched trades
    if(searchValue && !sortValue){
      fetchSearchedTrades()
    }
    //when search value is deleted or search value doesn't exist, reset the page number to beginning and fetch default trades
    if((searchValue === '' || !searchValue) && !sortValue){
      setPage(0)
      fetchTrades()
    }
    console.log(searchValue);
    
  },[searchValue])
  return(
    <Dialog.Root>
      <div className="w-full mt-8">
        <div className="table-top-bar w-full grid grid-cols-2 mt-1 mb-5">
          <Dialog.Trigger className="" asChild>
            <button className=" h-12 w-36  bg-steel-blue bg-opacity-70
            hover:bg-opacity-50 transition-all rounded text-white shadow-md ">New Trade</button>
          </Dialog.Trigger>
          <div className="w-full flex flex-col justify-end items-end">
            <input className="trades-search-bar h-6 border border-black bg-striped-header
             bg-opacity-50 text-white rounded-sm text-xs pl-2 pr-2 shadow-md" 
            type='text' placeholder="Search..." value={searchValue} onChange={searchOnChangeSubmit}/>
          </div>
          <Dialog.Portal>
          
            <Dialog.Overlay className="DialogOverlay"/>
            <Dialog.Overlay/>
            <Dialog.Content className="DialogContent bg-white bg-opacity-80" onInteractOutside={handleOverlayClick} >
              {
              userInfo && <NewTrade username={userInfo.username}/>
              }
            </Dialog.Content>
           
          </Dialog.Portal>
          
          
        </div>

        <div className="trade-table-con scrollbar-color  min-h-600px max-h-screen
        overflow-x-scroll z-10 bg-white col-span-2" ref={tableRef} onWheel={handleWheelScroll}>
          
          <table className="trade-table-con ">
            <TradeListHead tradesContext={{trades, setTrades}} pageContext={{page, setPage}}
            pageCountContext={{pageCount, setPageCount}} limitPerPageContext={{limitPerPage, setLimitPerPage}} 
            sortValueContext={{sortValue, setSortValue}} isLoadingContext={{isLoading, setIsLoading}} userInfo={userInfo}/>
            <TradeListBody isLoading={isLoading} tradesContext={{trades, setTrades}} 
            userInfo={userInfo}/>
          </table> 
          
        </div>
        <div className="w-full flex justify-center mt-2">
          <div className=" w-16 flex justify-center">
            {
              page !== 0 &&
              <button className="font-bold text-black hover:text-steel-blue transition-colors" onClick={handlePrev}>
                Prev
              </button>
            }

          </div>
          <div className=" w-28 flex justify-center items-center gap-x-2">
            
            <div className="">
              <input className="w-8  text-center bg-striped-header text-white mr-2 rounded-md" type="number" name=""
              min="1" max={pageCount + 1} value={page + 1} onChange={handlePageInputChange}/>
              <span>of {pageCount + 1}</span>       
            </div>
          
          </div>
          
          <div className=" w-16 flex justify-center">
            {
              pageCount !== page && 
              <button className="font-bold text-black hover:text-steel-blue transition-colors" onClick={handleNext}>
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