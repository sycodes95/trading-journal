import { useEffect, useRef, useState } from "react";

function NtgOpen(props){
  const [tradeOpen, setTradeOpen] = useState(true)
  const [tradeStatus, setTradeStatus] = useState('OPEN')

  const {formData, setFormData} = props.formDataContext

  const tradeStatusTextRef = useRef(null)

  const handleTradeOpenToggle = (e) =>{
    setTradeOpen(!tradeOpen)
  }

  useEffect(()=>{
    console.log(tradeOpen);
    if(tradeOpen == true){
      setTradeStatus('OPEN')
      setFormData({ ...formData, open: 'OPEN' })
    } else {
      setTradeStatus('CLOSED')
      setFormData({ ...formData, open: 'CLOSED' })
    }

    
  }, [tradeOpen])

  useEffect(()=>{
    // Changes trade status "Open" "Closed" text colors depending on trade status state.
    if(tradeStatus === 'OPEN'){
      tradeStatusTextRef.current.style.color = 'green'
    } else if(tradeStatus === 'CLOSED'){
      tradeStatusTextRef.current.style.color = 'black'
    }
  }, [tradeStatus])

  useEffect(()=>{
    console.log(formData);
    if(formData.open === '' || formData.open === 'OPEN'){
      setTradeOpen(true)
      setTradeStatus('OPEN')
    } else {
      setTradeOpen(false)
      setTradeStatus('CLOSED')
    }
  },[formData.entry])

  return(
    <div className="pt-4 pl-4 pr-4 grid grid-cols-1 pt-4 ">
      <div className="">
        <span>Trade Status</span>
      </div>
      <div className="trade-status col-span-1 row-start-2 grid justify-center border border-gray-300
      border-dotted w-32 h-20">
        <div className="pt-4 h-4">
          <span className="no-highlight text-xs text-center flex justify-center items-center hover:cursor-pointer
          "ref={tradeStatusTextRef} onClick={handleTradeOpenToggle}>{tradeStatus}</span>
           
        </div>
        

        <div className="toggle-button-container relative h-4 w-12 rounded-lg bg-gray-300 pt-2" >
          <button type='button'className={`toggle-button ${tradeOpen ? "on" : "off"}`}
          onClick={handleTradeOpenToggle}>
          </button>
        </div>

      </div>

    </div>
    
  )
}

export default NtgOpen;