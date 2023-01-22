import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function CurrentSetups (props) {

  const [setups, setSetups] = useState(null)

  function getSetups () {
    if(props.userInfo){
      fetch(`http://localhost:5000/setups?username=${props.userInfo.username}`)
     .then(response => response.json())
     .then((data) => {
        setSetups(data.setups)
     })
    }
  }

  const handleSetupDelete = (id) =>{
    fetch('http://localhost:5000/setups', {
      method: 'DELETE' ,
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    })
      .then(response =>{
        if(!response.ok) {
          throw Error(response.statusText)
        }
        return response.json();
      })
      .then(data =>{
        console.log(data);
        getSetups()
      })
      .catch(error =>{
        console.error('Error:', error);
      })
    
  }

  const handleSetupEditActive = (id) =>{
    console.log(id);
    fetch(`http://localhost:5000/setups`, {
      method: 'PATCH',
      body: JSON.stringify({id}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log(error);
    })
    
  }
  
  useEffect(()=>{
    //GET All setups and set state as array of all setups from this user
    getSetups()
    
  },[props])

  

  useEffect(()=>{
    console.log(setups);
  },[setups])
  

  
  
  
  return(
    <div className=" m-4 h-96 border border-black overflow-y-auto">
      <div className="buttons grid grid-cols-10 border-b border-black">
        <button className=" border-r border-gray-500 min-w-fit">#</button>
        <button className=" border-r border-gray-500 min-w-fit">Active</button>
        <button className="col-start-3 col-end-11 min-w-fit">Name</button>
      </div>

      {
        setups ? 
        setups.map((s, i) =>(
          <div className="buttons grid grid-cols-10  border-gray-300 border-b">
            <div className="flex justify-self-center items-center text-xs">{i+1}</div>
            <div className="flex justify-center items-center">
              <input className="h-4" type='checkbox' name="active" defaultChecked onClick={()=>handleSetupEditActive(s._id)}/>
            </div>

            
            <div className="flex justify-between items-center col-start-3 col-end-11 pl-4 pr-4">
              <span>{s.setup}</span>
              <button onClick={()=>handleSetupDelete(s._id)} className="text-red-700 text-md font-bold hover:text-black
               transition-colors delay-100">x</button>
            </div>
          </div>
        ))
        :
        null
        
      }
      
      
      
    </div>
  )
}
export default CurrentSetups;