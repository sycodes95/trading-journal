import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function NewTrade (props) {
  const [formData, setFormData] = useState({
    username: props.userInfo.username,
    current: true,
    setup: '',
    position: 'long',
    entry: '',
    tp: '',
    sl: '',
    mfe: '',
    mae: '',
    result: '',
    fgl: '',
    rgl: '',
    comments: '',
    tv: '',
    public: '',
  })

  const formRef = useRef(null)
  const leftBorder = useRef(null)
  const rightBorder = useRef(null)
  const tradeStatusTextRef = useRef(null)

  const [tradeOpen, setTradeOpen] = useState(true)
  const [tradeStatus, setTradeStatus] = useState('open')

  const handleTradeOpenToggle = (e) =>{
    
    setTradeOpen(!tradeOpen)
    
  }
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) =>{
    
  }

  useEffect(()=>{
    if(formData.current == true){

    }
  }, [formData])

  useEffect(()=>{
    if(tradeOpen == true){
      setTradeStatus('open')
      setFormData({ ...formData, current: true })
    } else {
      setTradeStatus('closed')
      setFormData({ ...formData, current: false })
    }
    
    console.log(tradeOpen);
  }, [tradeOpen])

  useEffect(()=>{
    // Changes trade status "Open" "Closed" text colors depending on trade status state.
    if(tradeStatus === 'open'){
      tradeStatusTextRef.current.style.color = 'green'
    } else if(tradeStatus === 'closed'){
      tradeStatusTextRef.current.style.color = 'black'
    }
  }, [tradeStatus])
  
  useEffect(()=>{
    console.log(formData);
    if(formData.position === 'long'){
      leftBorder.current.style.borderColor = 'green'
    } else if(formData.position === 'short'){
      leftBorder.current.style.borderColor = 'red'
    } 
    
  }, [formData])
  
  
  return(
    <form className="new-trade  h-16 w-96  grid grid-cols-7 grid-rows-3" 
    ref={formRef} onSubmit={handleSubmit}>

      <input className='newtrade-username hidden border border-gray-300' type='text' name='username' value={props.userInfo.username}/>

      <div className="trade-status col-start-1 col-end-3 row-start-1 row-end-4 grid justify-center border-l-8 rounded-lg border-gray-500 "
      ref={leftBorder}>

        <span className="no-highlight text-xs text-center flex justify-center items-center hover:cursor-pointer" ref={tradeStatusTextRef}
         onClick={handleTradeOpenToggle}>{tradeStatus}</span>

        <div className="toggle-button-container relative h-1 w-12 rounded-lg bg-gray-400" >

            <button type='button'className={`toggle-button ${tradeOpen ? "on" : "off"}`}
            onClick={handleTradeOpenToggle}>
            </button>

        </div>

      </div>
      
      <input className='newtrade-setup text-xs border-b-0 border-r-0' type='text' name='setup' value={formData.setup} 
      placeholder='SETUP' required onChange={handleInputChange}/>

      <select className='newtrade-position text-xs border-b-0 border-r-0' name='position' value={formData.position}
       onChange={handleInputChange}>
        <option value="long">Long</option>
        <option value="short">Short</option>
      </select>
      <input className='newtrade-entry text-xs border-b-0 border-r-0' type='number' name='entry' value={formData.entry} 
      placeholder='ENTRY $' required onChange={handleInputChange}/>
      <input className='newtrade-tp text-xs border-b-0' type='number' name='tp' value={formData.tp}
      placeholder='TP $' onChange={handleInputChange}/>
      <input className='newtrade-sl text-xs border-b-0 border-r-0' type='number' name='sl' value={formData.sl}
      placeholder='SL $' onChange={handleInputChange}/>
      <input className='newtrade-mfe text-xs border-b-0 border-r-0' type='number' name='mfe' value={formData.mfe} 
      placeholder='MFE' onChange={handleInputChange}/>
      <input className='newtrade-mae text-xs border-b-0 border-r-0' type='number' name='mae' value={formData.mae}
      placeholder='MAE' onChange={handleInputChange}/>
      <select className='newtrade-result  text-xs border-b-0 '  type='text' name='result' value={formData.result} onChange={handleInputChange}>
        <option value="none"></option>
        <option value="win">Win</option>
        <option value="loss">Loss</option>
      </select>
      <input className='newtrade-fgl text-xs  border-r-0' type='number' name='fgl' value={formData.fgl}
      placeholder='($) G/L' onChange={handleInputChange}/>
      <input className='newtrade-rgl text-xs  border-r-0' type='number' name='rgl' value={formData.rgl}
      placeholder='(R) G/L' onChange={handleInputChange}/>
      <input className='newtrade-comments text-xs  border-r-0' type='text' name='comments' value={formData.comments}
       placeholder='COMMENT' onChange={handleInputChange}/>
      <input className='newtrade-tv text-xs ' type='text' name='tv' value={formData.tv} 
      placeholder='TV LINK' onChange={handleInputChange}/>
      <button className=" col-start-7 col-end-8 row-start-1 row-end-4 border-r-8 border-blue-400 rounded-lg" ref={rightBorder}>O</button>
    </form>
  )
}


export default NewTrade;