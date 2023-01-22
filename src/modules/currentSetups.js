import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function CurrentSetups (props) {

  const [setups, setSetups] = useState(null)

  const handleSetupDelete = (id) =>{
    fetch('http://localhost:5000/setups', {
      method: 'DELETE' ,
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:id})
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
  
  useEffect(()=>{
    //GET All setups and set state as array of all setups from this user
    getSetups()
    
  },[props])

  function getSetups () {
    if(props.userInfo){
      fetch(`http://localhost:5000/setups?username=${props.userInfo.username}`)
     .then(response => response.json())
     .then((data) => {
        setSetups(data.setups)
     })
    }
  }

  useEffect(()=>{
    console.log(setups);
  },[setups])
  

  
  
  
  return(
    <div className=" m-4 h-96 border border-black overflow-y-auto">
      <div className="buttons grid grid-cols-10 border-b border-black">
        <button className=" border-r border-gray-500">#</button>
        <button className=" border-r border-gray-500">Active</button>
        <button className="col-start-3 col-end-11">Name</button>
      </div>

      {
        setups ? 
        setups.map((s, i) =>(
          <div className="buttons grid grid-cols-10  border-black">
            <div className="justify-self-center">{i+1}</div>
            <input type='checkbox' name="active" value={true} />
            <div className="flex justify-between col-start-3 col-end-11 pl-4 pr-4">
              <span>{s.setup}</span>
              <button onClick={()=>handleSetupDelete(s._id)} className="text-red-700 font-bold">x</button>
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