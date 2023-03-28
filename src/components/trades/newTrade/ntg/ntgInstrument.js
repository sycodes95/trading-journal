import { useEffect, useRef, useState } from "react";

function NtgInstrument (props){
  const {formData, setFormData} = props.formDataContext

  const [instruments, setInstruments] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function getInstruments () {
    if(formData){
      fetch(`${process.env.REACT_APP_API_HOST}/getinstruments?username=${formData.username}`)
      .then(response => response.json())
      .then((data) => {
        setInstruments(data.instruments)
      })
    }
  }
  useEffect(()=>{
    getInstruments()
  },[])
  return(
    <div className="instrument-container pl-4 pr-4 grid grid-cols-1 pt-4 w-40">
      <div className="grid grid-cols-2 ">
        <label className="text-white">Instrument</label>
        {
          !formData.instrument && 
          <span className="text-red-700 text-md justify-self-end">*</span>
        }

      </div>
      
      <div className="flex w-full">
        <select className="w-4 border border-gray-800 h-6 bg-black caret-white text-white" name="instrument" onClick={handleInputChange}>
          <option value='' hidden></option>
          {
            instruments && instruments.map((el, index) =>(
              <option value={el.instrument}>{`${el.instrument}`}</option>
            ))
          }
        </select>
        <input className="border border-gray-800 w-28 top-left-round h-6 bg-black caret-white text-white"
         type='text' name="instrument" value={formData.instrument} onChange={handleInputChange}/>
        
      </div>
    </div>
  )
}
export default NtgInstrument;