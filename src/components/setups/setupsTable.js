import { useEffect, useRef, useState, useContext} from "react";
import { Link } from "react-router-dom";
import trashSVG from '../../icons/trash.svg'
import { ReactSVG } from "react-svg";
function SetupsTable (props) {
  //PROPS contains:  {userInfo}, {newSetupSubmitted}, {userMaxSetupsContext}

  const {userMaxSetups, setUserMaxSetups} = props.userMaxSetupsContext;
  //CONTEXT of parent component's userMaxSetups STATE
  const [setups, setSetups] = useState(null)

  function getSetups () {
    if(props.userInfo){
      fetch(`http://localhost:5000/get-setups?username=${props.userInfo.username}`)
      .then(response => response.json())
      .then((data) => {
        setSetups(data.setups)
        console.log(data);
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
    <div className="w-full overflow-y-auto ">

    
      <table className=" w-full bg-white">
        <thead>
            <tr className="bg-white border border-gray-300 text-black text-sm font-bold">
              <th colSpan="1" className="border-r border-gray-300  w-16 font-thin"></th>
              <th colSpan="1" className="border-r border-gray-300  w-16 font-thin">#</th>
              <th colSpan="1" className="border-r border-gray-300  w-16 font-thin">Active</th>
              <th className="font-thin">Setup Name</th>
            </tr>
        </thead>
        <tbody>
          {setups &&
            setups.map((s, i) =>(
              <tr className="border-gray-300  h-4 text-black font-bold">
                <td colSpan="1" className=" text-center text-xs" >
                  <button onClick={()=>handleSetupDelete(s._id)} className=" text-black text-md font-bold hover:text-gray-500 transition-colors">
                    <ReactSVG src={trashSVG} className="h-4 w-5  fill-current "/>
                  </button>
                </td>
                <td colSpan="1" className=" text-center text-xs" >{i+1}</td>
                <td colSpan="1" className=" text-center " >
                    <input className="black-check" type='checkbox' name="active" checked={s.active} onChange={()=>handleSetupEditActive(s._id)}/>
                </td>
                <td colSpan='8' className="flex justify-between items-center pl-4 pr-4 gap-x-12 " >
                    <span className="text-sm">{s.setup}</span>
                    
                </td>
                
              </tr>
          ))
         
          }
        </tbody>

      </table> 

    </div>
      
  )
}
export default SetupsTable;