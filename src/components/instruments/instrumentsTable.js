import { useEffect, useRef, useState, useContext} from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import trashSVG from '../../icons/trash.svg'

function InstrumentsTable (props) {
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

    
      <table className=" w-full bg-white">
        <thead>
            <tr className="bg-white border border-gray-300 text-black text-sm font-bold ">
                <th colSpan="1" className="border-r border-gray-300 font-thin w-16"></th>
                <th colSpan="1" className="border-r border-gray-300  w-16 font-thin">#</th>
                <th colSpan="8" className="font-thin">Instrument Name</th>
            </tr>
        </thead>
        <tbody>
          {instruments && 
            instruments.map((s, i) =>(
              <tr className="border-gray-300  h-4 text-black font-bold">
                <td colSpan="1" className="flex justify-center items-center">
                  <button onClick={()=>handleSetupDelete(s._id)}
                  className=" text-black text-sm font-bold  hover:text-gray-500
                  transition-colors">
                    <ReactSVG src={trashSVG} className="h-4 w-5  fill-current "/>
                  </button>
                </td>
                <td colSpan="1" className=" text-center text-xs" >{i+1}</td>
                <td colSpan='8' className="flex justify-between pl-4 pr-4 gap-x-12" >
                    <span className="text-sm">{s.instrument}</span>
                </td>
              </tr>
          ))
          }
        </tbody>

      </table> 

    </div>
   
  )
}
export default InstrumentsTable;