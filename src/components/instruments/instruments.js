import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
//import CurrentInstruments from "./currentInstruments";
import { ReactSVG } from "react-svg";
import plusButton from "../../icons/plus-circle-outline.svg"
import instrumentsSVG from "../../icons/instruments.svg"

import Icon from '@mdi/react';
import { mdiPlusBox } from '@mdi/js';
import InstrumentsTable from "./instrumentsTable";


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
    <div className=" w-full p-8 flex justify-center">
      <div className="INSTRUMENT-CONTAINER flex flex-col gap-y-8 w-10/12 ">
        <div className="section-info text-white p-4 bg-blue-400 bg-opacity-30 rounded-sm
        grid">
          <div className="">
            <ReactSVG className="h-14 w-14 fill-current" src={instrumentsSVG}/>
          </div>

          <div className="pl-8">
            <div className="text-3xl">
              <span>Instruments</span>
            </div>
            <div className="text-sm">
              <span>
                Add and manage financial instruments. 
                These instruments will be available to choose
                when creating a new trade.
              </span>
            </div>
          </div>
        </div>
          
        
        <div className="">
          <div className="create-new-Instrument flex justify-center items-center
          bg-blue-400 bg-opacity-30 h-8 w-80 rounded-sm ">
            <div className="text-white text-sm font-thin">
              <span>Add Instrument : </span>
            </div>
            
            <input className="text-xs text-white ml-4 h-5 w-32 rounded-sm bg-black bg-opacity-25 caret-white p-1" 
            type='text' name='instrument' value={formData.instrument}
            placeholder="ex. BTCUSD" onChange={handleInputChange}/>
            
            <button className='text-xs text-white h-6 pl-2 flex items-center' onClick={handleSubmit}>
            <Icon className="hover:text-gray-500 transition-all h-5 " path={mdiPlusBox} size={1.05} />
            </button>

          </div>
          <div className="h-6">
          {
            userMaxInstruments &&
            <div className="flex items-center" >
              <span className="text-red-500 text-xs">Maximum Instruments reached, please delete some before
              adding more, no good trader made serious money trading 20 strategies like a cunt.</span>   
            </div>
          }

          {
            duplicateInstrumentError &&
            <div>
              <span className="text-red-500 text-xs">Instrument already exists.</span>   
            </div>
          }
          </div>
              
        </div>
      
      {
        <InstrumentsTable userInfo={userInfo} newInstrumentSubmitted={newInstrumentSubmitted}
        userMaxInstrumentsContext={userMaxInstrumentsContext}/>
      }    
      </div>
    </div>
  )
}
export default Instruments;