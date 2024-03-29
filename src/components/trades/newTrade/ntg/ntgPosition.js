import { useEffect, useRef, useState } from "react";

//PARENT -> newTradeGeneral

function NtgPosition(props){
  const {formData, setFormData} = props.formDataContext

  const [isLong, setIsLong] = useState(false)
  const [isShort, setIsShort] = useState(false)

  const longCheckboxRef = useRef(null)
  const shortCheckboxRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if(e.target.value === 'LONG'){
      setIsLong(true)
      setIsShort(false)
    }
    if(e.target.value === 'SHORT'){
      setIsLong(false)
      setIsShort(true)
    }
  };

  useEffect(()=>{
    if(formData.position === ''){
      setIsLong(false)
      setIsShort(false)
    } 
    if(formData.position === 'LONG'){
      setIsLong(true)
      setIsShort(false)
    }
    if(formData.position === 'SHORT'){
      setIsLong(false)
      setIsShort(true)
    }
  },[formData.position])

  return(
    <div className=" pl-4 pr-4 grid grid-cols-2 pt-4 w-full text-white">
      <div className="col-span-2 flex justify-between">
        <label>Position</label>  
        {
          !isLong && !isShort && <span className="text-red-700">*</span>
        }
      </div>
      <div className="position-long flex items-center gap-x-2 h-6 border-t border-gray-800 ">
        <label >Long</label>
        <input className="checkboxLong w-full border border-gray-300 transition-all" type='checkbox'
        name="position" value={'LONG'} checked={isLong} onChange={handleInputChange}
        ref={longCheckboxRef} />
        {
          
        }
      </div>
      <div className="position-short flex items-center gap-x-2 h-6 border-t border-gray-800">
        <label >Short</label>
        <input className="checkboxShort w-full border border-gray-300 transition-all" type='checkbox'
        name="position" value='SHORT' checked={isShort}  onChange={handleInputChange}
        ref={shortCheckboxRef} />
      </div>
      
    </div>
  )
}

export default NtgPosition;