import { useEffect, useRef, useState, useContext} from "react";
import { Link } from "react-router-dom";


function CurrentInstruments (props) {
  //PROPS contains:  {userInfo}, {newSetupSubmitted}, {userMaxInstrumentsContext}

  const {userMaxInstruments, setUserMaxInstruments} = props.userMaxInstrumentsContext;
  //CONTEXT of parent component's userMaxInstruments STATE
  const [instruments, setInstruments] = useState(null)

  function getInstruments () {
    if(props.userInfo){
      fetch(`http://localhost:5000/getinstruments?username=${props.userInfo.username}`)
      .then(response => response.json())
      .then((data) => {
          
        setInstruments(data.instruments)
      })
    }
  }

  const handleSetupDelete = (id) =>{
    setInstruments(instruments.filter(s => s._id !== id))
    fetch('http://localhost:5000/deleteinstruments', {
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
        
        
        //UPDATES instruments after a set up is finished deleting
      })
      .catch(error =>{
        console.error('Error:', error);
      })
    
  }

  useEffect(()=>{
   
  },[instruments])
  
  useEffect(()=>{
    
    getInstruments()
    //UPDATES instruments after PROPS are passed down from parent component and
    // new setup is submitted
  },[props])
  
  return(
    <div className="current-setup-con w-full  overflow-y-auto ">

    
      <table className=" w-full ">
        <thead>
            <tr className="bg-jet text-white text-sm font-bold">
                <th colSpan="1" className="border-r border-black  w-16 font-thin">#</th>
                <th className="font-thin">Name</th>
            </tr>
        </thead>
        <tbody>
          {instruments ? 
            instruments.map((s, i) =>(
              <tr className="border-gray-300  h-4 ">
                <td colSpan="1" className=" text-center text-xs" >{i+1}</td>
                <td colSpan='8' className="flex justify-between pl-4 pr-4 gap-x-12 " >
                    <span className="text-sm">{s.instrument}</span>
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
export default CurrentInstruments;