import { useState } from "react"


function TradeListHead(props) {
  //PROPS
  const isLoading = props.isLoading
  const userInfo = props.userInfo
  const {trades, setTrades} = props.tradesContext

  const [tableHeadersSort, setTableHeadersSort] = useState({
    entrydate: -1, open: -1, instrument: -1,
    setup: -1, position: -1, plannedentry: -1,
    entry: -1, tp: -1, sl: -1,
    exitdate: -1, exit: -1, mfe: -1,
    mae: -1, fgl: -1, fees: -1, 
    variables: -1, comments: -1, tv: -1
    
  })
  /*
  const tableHeaders = [
    'ENTRY DATE', 'STATUS', 'INSTRUMENT',
    'SETUP', 'POSITION', 'P ENTRY', 
    'ENTRY', 'TP', 'SL', 
    'EXIT DATE', 'EXIT', 'MFE', 
    'MAE', 'GAIN/LOSS', 'FEES', 
    'VARIABLES', 'COMMENTS', 'LINKS', 
  ] 
  */
  const handleSort = (e, i) =>{
    console.log(tableHeadersSort[e.field]);
    console.log(userInfo.username);
    fetch(`http://localhost:5000/trades-sort-get?username=${userInfo.username}&field=${e.field}&sortBy=${tableHeadersSort[e.field]}`)
    .then(res => res.json())
    .then((data)=>{
      if(!data.error){
        setTrades(data.trades)
      }
      if(tableHeadersSort[e.field] === -1){
        setTableHeadersSort({...tableHeadersSort, [e.field] : 1 })
      } else if (tableHeadersSort[e.field] === 1){
        setTableHeadersSort({...tableHeadersSort, [e.field] : -1 })
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

  return(
    <thead className="bg-striped-content ">
      {
        isLoading ?
        <tr className=" text-white text-xs font-bold ">
          <th colSpan="1" className=" th-wrapper hover:text-desert hover:cursor-pointer transition-all">
            <div className="h-4 slant-start pl-4 pr-4 bg-striped"></div>
          </th>
        </tr>
        :
        <tr className=" text-white text-xs font-bold ">
          <th colSpan="1" className=" th-wrapper hover:text-desert hover:cursor-pointer transition-all">
            <div className="h-4 slant-start pl-4 pr-4 bg-striped">d</div>
          </th>
          <th colSpan="1" className=" th-wrapper hover:text-desert hover:cursor-pointer transition-all">
            <div className="h-4 slant-right pl-4 pr-4 bg-striped"></div>
          </th>
          <th colSpan="1" className=" th-wrapper hover:text-desert hover:cursor-pointer transition-all">
            <div className="h-4 slant-right pl-4 pr-4 bg-striped">#</div>
          </th>
          {
            tableHeadersAndField.map((e, i) =>(
              <th colSpan="1" className="th-wrapper hover:text-desert hover:cursor-pointer transition-all"
              onClick={()=>handleSort(e,i)}>
                <div className="h-4 slant-right pl-4 pr-4 bg-striped min-w-max min-h-max ">{e.header}</div> 
              </th>
            ))
          } 
        </tr>
      }
    </thead>
  )
}

export default TradeListHead;