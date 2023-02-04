import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CurrentSetups from "./currentSetups";

import { ReactSVG } from "react-svg";
import plusButton from "../icons/plus-circle-outline.svg"
import setupsSVG from "../icons/setups.svg"

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
    
    fetch('http://localhost:5000/newsetup', {
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
    <div className=" w-full p-12 ">
      <div className="section-info text-black p-4 bg-orange-600 bg-opacity-70 rounded-sm
      grid">
        <div className="">
          <ReactSVG className="h-14 w-14 " src={setupsSVG}/>
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
      
      <div className="mt-12">
        <div className="create-new-setup flex justify-center items-center
         v h-14 w-80 top-right-round bg-striped-150px">
          <div className="text-white text-sm">
            <span>Create New Setup : </span>
          </div>
          
          <input className="text-xs ml-4 h-5 w-32 top-right-round"
           type='text' name='setup' value={formData.setup} placeholder="setup name" onChange={handleInputChange}/>
          <button className='text-xs h-6 pl-2' onClick={handleSubmit}>
            <ReactSVG className='h-6 w-6 text-white fill-current  hover:text-red-700
             transition-colors delay-100' src={plusButton}/>
          </button>

        </div>
        <div className="h-6">
        {
          userMaxSetups &&
          <div className="flex items-center" ref={userMaxSetupsRef} >
            <span className="text-red-500 text-xs">Maximum setups reached, please delete some before
            adding more, no good trader made serious money trading 20 strategies like a cunt.</span>   
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
      <div>
        { userInfo &&
        <span>{`${userInfo.firstname}'s Setups`}</span> 
        }
      </div>

      <CurrentSetups userInfo={userInfo} newSetupSubmitted={newSetupSubmitted}
      userMaxSetupsContext={userMaxSetupsContext}/>
    </div>
  )
}
export default Setups;