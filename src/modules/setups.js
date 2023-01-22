import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CurrentSetups from "./currentSetups";


function Setups () {
  
  const [userInfo, setUserInfo] = useState(null)
  const [newSetupSubmitted, setNewSetupSubmitted] = useState(0)

  const [formData, setFormData] = useState({
    username: userInfo,
    setup: '',
    active: true
  })

  const handleSubmit = () =>{
    console.log('submit');
    
    fetch('http://localhost:5000/newsetup', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json'}
    })
     .then(response => response.json())
     .then((data) => {
        setNewSetupSubmitted(newSetupSubmitted + 1)
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
    <div className="setup-container">
      <div><span>Setups</span></div>
      <div>
        <span>
          Add and manage trading strategy types. 
          Active strategies are available as a parameter for new trade entries.
        </span>
      </div>
      <div>
        <span>
          Create a new setup
        </span>
      </div>
      <div>
        <input type='text' name='setup' value={formData.setup} placeholder="setup name" onChange={handleInputChange}/>
        <button onClick={handleSubmit}>Add</button>
        
      </div>
      <div>
        { userInfo ? 
        <span>{`${userInfo.firstname}'s Setups`}</span> 
        : 
        null 
        }
      </div>

      <CurrentSetups userInfo={userInfo} newSetupSubmitted={newSetupSubmitted}/>
    </div>
  )
}
export default Setups;