import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
//import CurrentInstruments from "./currentInstruments";
import { ReactSVG } from "react-svg";
import plusButton from "../icons/plus-circle-outline.svg"
import CurrentInstruments from "./currentInstruments";

function Instruments () {
  
  const [userInfo, setUserInfo] = useState(null)
  const [newInstrumentSubmitted, setNewInstrumentSubmitted] = useState(0)
  
  const [userMaxInstruments, setUserMaxInstruments] = useState(false)
  const userMaxInstrumentsContext = {userMaxInstruments, setUserMaxInstruments};
  const [duplicateInstrumentError, setDuplicateInstrumentError] = useState(false)

  

  const [formData, setFormData] = useState({
    username: userInfo,
    Instrument: '',
  })

  const handleSubmit = () =>{
    
    fetch('http://localhost:5000/newinstrument', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then((data) => {
      if(data.error ){
        if(data.error === 'User reached maximum Instruments'){
          setUserMaxInstruments(true)
        }
        if(data.error.code  === 11000){
          
          setDuplicateInstrumentError(true)
        }
      } else {
        setUserMaxInstruments(false)
        setDuplicateInstrumentError(false)
      }
      setNewInstrumentSubmitted(newInstrumentSubmitted + 1)
      //just updating by 1 so that currentInstrument child component gets new props and re renders
    })
        
  }



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(()=>{
    //Once token is verified and user info is fetched, set username of form data.
    if(userInfo){
      setFormData({...formData, username: userInfo.username})
    }
    
  },[userInfo])

  useEffect(()=>{
    console.log('test');
    //Token
    const token = JSON.parse(localStorage.getItem('token'))
    
    if(token) {
      fetch('http://localhost:5000/verifytoken', {
        method: 'GET',
        headers: { 'authorization': `Bearer ${token}`}
      })
      .then(response => response.json())
      .then((data) => {
        if(data.user.user){
          setUserInfo(data.user.user)
        }
      })
      .catch(error => console.error(error))
      }
  }, [])
  return(
    <div className="Instrument-container w-full p-12 ">
      <div className="text-3xl text-black font-bold pb-8 ">
        <span>Instruments</span>
      </div>
      <div className="text-sm h-12">
        <span>
          Add and manage financial instruments. 
          These instruments will be available to choose
          when creating a new trade.
        </span>
      </div>
      <div>
        
      </div>
      <div className="">
        <div className="create-new-Instrument flex justify-center items-center
         bg-striped-150px h-16 w-96 ">
          <div className="text-white text-sm font-thin">
            <span>Add an Instrument : </span>
          </div>
          
          <input className="text-xs ml-4 h-6" type='text' name='instrument' value={formData.instrument}
           placeholder="ex. BTCUSD" onChange={handleInputChange}/>
           
          <button className='text-xs h-6 pl-2' onClick={handleSubmit}>
            <ReactSVG className='h-6 w-6 text-white fill-current  hover:text-red-700
             transition-colors delay-100' src={plusButton}/>
          </button>

        </div>
        <div className="h-6">
        {
          userMaxInstruments ?
          <div className="flex items-center" >
            <span className="text-red-500 text-xs">Maximum Instruments reached, please delete some before
            adding more, no good trader made serious money trading 20 strategies like a cunt.</span>   
          </div>
          
          :
          null 
        }

        {
          duplicateInstrumentError ?
          <div>
            <span className="text-red-500 text-xs">Instrument already exists.</span>   
          </div>
          
          :
          null 

        }
        </div>
            
      </div>
      <div>
        { userInfo ? 
        <span>{`${userInfo.firstname}'s Instruments`}</span> 
        : 
        null 
        }
      </div>
      {
        
        <CurrentInstruments userInfo={userInfo} newInstrumentSubmitted={newInstrumentSubmitted}
        userMaxInstrumentsContext={userMaxInstrumentsContext}/>
        
      }    
     
    </div>
  )
}
export default Instruments;