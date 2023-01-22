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
      getSetups()
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
    <div className=" w-full border border-black overflow-y-auto">

    
      <table className=" w-full ">
        <thead>
            <tr className="border-b border-black">
                <th colSpan="1" className="border-r border-gray-500  w-16">#</th>
                <th colSpan="1" className="border-r border-gray-500  w-16">Active</th>
                <th className="">Name</th>
            </tr>
        </thead>
        <tbody>
          {setups ? 
            setups.map((s, i) =>(
              <tr className="border-gray-300 border-b h-4">
                <td colSpan="1" className=" text-center " >{i+1}</td>
                <td colSpan="1" className=" text-center " >
                    <input className="" type='checkbox' name="active" checked={s.active} onClick={()=>handleSetupEditActive(s._id)}/>
                </td>
                <td colSpan='8' className="flex justify-between pl-4 pr-4 " >
                    <span>{s.setup}</span>
                    <button onClick={()=>handleSetupDelete(s._id)} className="text-red-700 text-md font-bold hover:text-black transition-colors delay-100">x</button>
                </td>
              </tr>
          ))
          :
          null
          }
        </tbody>

      </table> 

    </div>
      
      
      
   
  )
}
export default CurrentSetups;