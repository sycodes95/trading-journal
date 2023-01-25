import { useEffect, useRef, useState, useContext} from "react";
import { Link } from "react-router-dom";


function CurrentSetups (props) {
  //PROPS contains:  {userInfo}, {newSetupSubmitted}, {userMaxSetupsContext}

  const {userMaxSetups, setUserMaxSetups} = props.userMaxSetupsContext;
  //CONTEXT of parent component's userMaxSetups STATE
  const [setups, setSetups] = useState(null)

  function getSetups () {
    if(props.userInfo){
      fetch(`http://localhost:5000/getsetups?username=${props.userInfo.username}`)
      .then(response => response.json())
      .then((data) => {
        setSetups(data.setups)
      })
    }
  }

  const handleSetupDelete = (id) =>{
    setSetups(setups.filter(s => s._id !== id))
    fetch('http://localhost:5000/deletesetups', {
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
        
        
        //UPDATES setups after a set up is finished deleting
      })
      .catch(error =>{
        console.error('Error:', error);
      })
  }

  const handleSetupEditActive = (id) =>{
    
    fetch(`http://localhost:5000/patchsetups`, {
      method: 'PATCH',
      body: JSON.stringify({id}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      getSetups()
      //UPDATES setups after a set up is finished updating
    })
    .catch(error => {
    })
  }

  useEffect(()=>{
    
  },[setups])
  
  useEffect(()=>{
    
    getSetups()
    //UPDATES setups after PROPS are passed down from parent component and
    // new setup is submitted
  },[props])
  
  return(
    <div className="current-setup-con w-full  overflow-y-auto ">

    
      <table className=" w-full ">
        <thead>
            <tr className="bg-red-700 text-black text-sm font-bold">
                <th colSpan="1" className="border-r border-black  w-16 font-thin">#</th>
                <th colSpan="1" className="border-r border-black  w-16 font-thin">Active</th>
                <th className="font-thin">Name</th>
            </tr>
        </thead>
        <tbody>
          {setups ? 
            setups.map((s, i) =>(
              <tr className="border-gray-300  h-4 ">
                <td colSpan="1" className=" text-center text-xs" >{i+1}</td>
                <td colSpan="1" className=" text-center " >
                    <input className="" type='checkbox' name="active" checked={s.active} onClick={()=>handleSetupEditActive(s._id)}/>
                </td>
                <td colSpan='8' className="flex justify-between pl-4 pr-4 gap-x-12 " >
                    <span className="text-sm">{s.setup}</span>
                    <button onClick={()=>handleSetupDelete(s._id)} className=" text-red-700 text-md font-bold hover:text-black transition-colors delay-100">x</button>
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