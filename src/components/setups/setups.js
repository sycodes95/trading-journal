import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CurrentSetups from "./setupsTable";

import { ReactSVG } from "react-svg";

import setupsSVG from "../../icons/setups.svg"
import Icon from '@mdi/react';
import { mdiPlusBox } from '@mdi/js';
import SetupsTable from "./setupsTable";

function Setups () {
  
  const [userInfo, setUserInfo] = useState(null)
  const [newSetupSubmitted, setNewSetupSubmitted] = useState(0)
  
  const [userMaxSetups, setUserMaxSetups] = useState(false)
  const userMaxSetupsContext = {userMaxSetups, setUserMaxSetups};
  const [duplicateSetupError, setDuplicateSetupError] = useState(false)

  const userMaxSetupsRef = useRef(null)

  const [formData, setFormData] = useState({
    username: userInfo,
    setup: '',
    active: true
  })

  const handleSubmit = () =>{
    
    fetch(`${process.env.REACT_APP_API_HOST}/newsetup`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then((data) => {
      if(data.error ){
        if(data.error === 'User reached maximum setups'){
          setUserMaxSetups(true)
        }
        if(data.error.code  === 11000){
          
          setDuplicateSetupError(true)
        }
      } else {
        setUserMaxSetups(false)
        setDuplicateSetupError(false)
        setFormData({...formData, setup:''})
      }
      setNewSetupSubmitted(newSetupSubmitted + 1)
      //just updating by 1 so that currentSetup child component gets new props and re renders
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
      fetch(`${process.env.REACT_APP_API_HOST}/verifytoken`, {
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
      <div className="SETUP-CONTAINER w-10/12 flex flex-col gap-y-8 ">

      
        <div className="section-info text-white p-4 bg-red-400 bg-opacity-50 rounded-sm
        grid">
          <div className="">
            <ReactSVG className="h-14 w-14 fill-current" src={setupsSVG}/>
          </div>

          <div className="pl-8">
            <div className="text-3xl">
              <span>Setups</span>
            </div>
            <div className="text-sm">
              <span>
                Add and manage trading strategy types. 
                Active strategies are available as a parameter for new trade entries.
              </span>
            </div>
          </div>
        </div>
        
        <div className="">
          <div className="create-new-setup flex justify-center items-center
          bg-red-400 bg-opacity-50 h-8 w-80 max-width-640px-w-full rounded-sm ">
            <div className="text-white text-sm font-thin">
              <span>Add New Setup : </span>
            </div>
            
            <input className="text-xs ml-4 h-5 w-32 rounded-sm bg-black bg-opacity-40 p-1 text-white caret-white"
            type='text' name='setup' value={formData.setup} placeholder="SETUP" onChange={handleInputChange}/>
            <button className='text-xs text-white h-6 pl-2 flex items-center' onClick={handleSubmit} >
              
              <Icon className="hover:text-gray-500 transition-all h-5 " path={mdiPlusBox} size={1.05} />
            </button>

          </div>
          <div className="h-6">
          {
            userMaxSetups &&
            <div className="flex items-center" ref={userMaxSetupsRef} >
              <span className="text-red-500 text-xs">Maximum setups reached, please delete some before
              adding more.</span>   
            </div>
            
          }

          {
            duplicateSetupError &&
            <div>
              <span className="text-red-500 text-xs">Setup already exists.</span>   
            </div>
          }
          </div>
              
        </div>
        
        <div className="">
          <SetupsTable userInfo={userInfo} newSetupSubmitted={newSetupSubmitted}
          userMaxSetupsContext={userMaxSetupsContext}/>
        </div>
       
      </div>
    </div>
  )
}
export default Setups;