import { useEffect, useState } from "react"


function TradeListHead(props) {
  //PROPS
  
  const userInfo = props.userInfo

  
  const {trades, setTrades} = props.tradesContext

  const {page, setPage} = props.pageContext
  const {pageCount, setPageCount} = props.pageCountContext
  const {limitPerPage, setLimitPerPage} = props.limitPerPageContext
  const {sortValue, setSortValue} = props.sortValueContext
  const {isLoading, setIsLoading} = props.isLoadingContext

  const [tableHeadersSort, setTableHeadersSort] = useState({
    entrydate: 1, open: 1, instrument: 1,
    setup: 1, position: 1, plannedentry: 1,
    entry: 1, tp: 1, sl: 1,
    exitdate: 1, exit: 1, mfe: 1,
    mae: 1, fgl: 1, fees: 1, 
    variables: 1, comments: 1, tv: 1
    
  })
  
  const handleSort = (e, i) =>{
    setSortValue(e.field)
    if(tableHeadersSort[e.field] === -1){
      setTableHeadersSort({...tableHeadersSort, [e.field] : 1 })
    } else if (tableHeadersSort[e.field] === 1){
      setTableHeadersSort({...tableHeadersSort, [e.field] : -1 })
    }
  }

  const fetchSortedTrades = () =>{
    setIsLoading(true)
    fetch(`${process.env.REACT_APP_API_HOST}/trades-sort-get?username=${userInfo.username}&field=${sortValue}&sortBy=${tableHeadersSort[sortValue]}&limit=${limitPerPage}&skip=${page*limitPerPage}`)
    .then(res => res.json())
    .then((data)=>{
      if(!data.error){
        setIsLoading(false)
        setTrades(data.trades)
        setPageCount(Math.ceil(data.count / limitPerPage) - 1)
        
      }
      
      
    })

  }

  const tableHeadersAndField = [
    {header: 'ENTRY DATE', field:'entrydate' },
    {header: 'STATUS', field:'open' },
    {header: 'INSTRUMENT', field:'instrument' }, 
    {header: 'SETUP', field:'setup' },
    {header: 'POSITION', field:'position' }, 
    {header: 'P ENTRY', field:'plannedentry' },
    {header: 'ENTRY', field:'entry' }, 
    {header: 'TP', field:'tp' },
    {header: 'SL', field:'sl' }, 
    {header: 'EXIT DATE', field:'exitdate' },
    {header: 'EXIT', field:'exit' }, 
    {header: 'MFE', field:'mfe' },
    {header: 'MAE', field:'mae' }, 
    {header: 'GAIN/LOSS', field:'fgl' },
    {header: 'FEES', field:'fees' }, 
    {header: 'VARIABLES', field:'variables' },
    {header: 'COMMENTS', field:'comments' }, 
    {header: 'LINKS', field:'tv' }
  ]
 
  useEffect(()=>{
    // when page state changes, check sortvalue for a value, then fetch trades by that value
    sortValue && fetchSortedTrades()
    
  },[page])

  useEffect(()=>{
    //when sort value changes, reset page to the beginning
    setPage(0)
    //check if sortvalue has a value, then fetch trades by that value
    sortValue && fetchSortedTrades()
  },[sortValue])

  useEffect(()=>{
    //when sort value changes, reset page to the beginning
    setPage(0)
    //check if sortvalue has a value, then fetch trades by that value
    sortValue && fetchSortedTrades()
  },[tableHeadersSort])
  

  
  return(
    <thead className="">
      {
        isLoading ?
        <tr className="  text-xs font-bold ">
          <th colSpan="1" className=" hover:text-gray-500 hover:cursor-pointer transition-all">
            <div className="h-4 pl-4 pr-4 bg-black bg-opacity-25 border border-gray-800 top-left-round bottom-right-round"></div>
          </th>
        </tr>
        :
        <tr className=" text-black text-xs font-bold ">
          <th colSpan="1" className="  hover:text-gray-500 hover:cursor-pointer transition-all">
            <div className="h-4 pl-4 pr-4 bg-black bg-opacity-25 border border-gray-800 top-left-round bottom-right-round">d</div>
          </th>
          <th colSpan="1" className=" hover:text-gray-500 hover:cursor-pointer transition-all">
            <div className="h-4 pl-4 pr-4 bg-black bg-opacity-25 border border-gray-800 top-left-round bottom-right-round"></div>
          </th>
          <th colSpan="1" className=" hover:text-gray-500 hover:cursor-pointer transition-all">
            <div className="h-4 pl-4 pr-4 bg-black bg-opacity-25 border border-gray-800 top-left-round bottom-right-round">#</div>
          </th>
          {
            tableHeadersAndField.map((e, i) =>(
              <th colSpan="1" className=" hover:text-gray-500 hover:cursor-pointer transition-all"
              onClick={()=>handleSort(e,i)}>
                <div className="h-4 pl-4 pr-4 bg-black bg-opacity-25 text-white border border-gray-800 min-w-max min-h-max 
                top-left-round bottom-right-round hover:text-gray-500 transition-all">{e.header}</div> 
              </th>
            ))
          } 
        </tr>
      }
    </thead>
  )
}

export default TradeListHead;