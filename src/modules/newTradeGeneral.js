import { useEffect, useRef, useState } from "react";

function NewTradeGeneral (props){
  const {formData, setFormData} = props.formDataContext
  const [instruments, setInstruments] = useState(null)
  const [setups, setSetups] = useState(null)

  function getInstruments () {
    if(formData){
      fetch(`http://localhost:5000/getinstruments?username=${formData.username}`)
      .then(response => response.json())
      .then((data) => {
        setInstruments(data.instruments)
      })
    }
  }
  function getSetups () {
    if(formData){
      fetch(`http://localhost:5000/getsetups?username=${formData.username}`)
      .then(response => response.json())
      .then((data) => {
        setSetups(data.setups)
      })
    }
  }

  const handleInputChange = (e) => {
    
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    
  };

  useEffect(()=>{
    
  },[props.formDataContext])

  useEffect(()=>{
    if(instruments && setups){
      console.log(instruments, setups);
    }
    
  },[instruments,setups])

  useEffect(()=>{
    console.log(formData);
  },[formData])

  useEffect(()=>{
    getInstruments()
    getSetups()
  },[])
  return(
    <div className="new-trade-general text-xs">
      <div className="new-trade-data ">
        <div className="bg-red-700 pl-4 pr-4 text-black text-center">
          <span>Trade Data</span>
        </div>
        <div className=" pl-4 pr-4 grid grid-cols-1 pt-4">
          <label>Entry Date & Time</label>
          <input className="w-fit border border-gray-300" type='datetime-local'/>
        </div>
        <div className="instrument-container pl-4 pr-4 grid grid-cols-1 pt-4">
          <label>Instrument</label>
          <div className="flex">
            <select className="w-4" name="instrument" onClick={handleInputChange}>
              <option value='' hidden></option>
              {
                instruments && instruments.map((el, index) =>(
                  <option value={el.instrument}>{`${el.instrument}`}</option>
                ))
              }
            </select>
            <input className="w-fit border border-gray-300" type='text' name="instrument" 
            value={formData.instrument} onChange={handleInputChange}/>
          </div>
        </div>
        <div className="setup-container pl-4 pr-4 grid grid-cols-1 pt-4">
          <label>Setup</label>
          <div className="flex">
            <select className="w-4 h-4 overflow-scroll" name="setup" onClick={handleInputChange} size="1">
              <option value='' hidden></option>
              {
                setups && setups.map((el, index) =>(
                  <option className="" value={el.setup}>{`${el.setup}`}</option>
                ))
              }
            </select>
            <input className="w-fit border border-gray-300" type='text' name="setup" 
            value={formData.setup} onChange={handleInputChange}/>
          </div>
        </div>
        
      </div>
    </div>
  )
}
export default NewTradeGeneral;