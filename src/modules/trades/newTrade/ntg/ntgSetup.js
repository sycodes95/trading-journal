import { useEffect, useRef, useState } from "react";


function NtgSetup (props) {

  const {formData, setFormData} = props.formDataContext

  const [setups, setSetups] = useState(null)

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
   
    getSetups()
    
  },[])
  
  

  return(
    <div className="setup-container pl-4 pr-4 grid grid-cols-1 pt-4 w-40">
      <div className="flex justify-between">
        <label>Setup</label>
        {
          !formData.setup && <span className="text-red-700">*</span>
        }
      </div>
      
      <div className="flex">
        <select className="w-4" name="setup" onClick={handleInputChange} size="1">
          <option value='' hidden></option>
          {
            setups && setups.map((el, index) =>(
              <option className="" value={el.setup}>{`${el.setup}`}</option>
            ))
          }
        </select>
        <input className="border border-r-0 border-l-0 border-gray-300 w-28 top-left-round h-6"
         type='text' name="setup" value={formData.setup} onChange={handleInputChange}/>
        
      </div>
    </div>
  )
}

export default NtgSetup;