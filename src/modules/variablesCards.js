import { useEffect, useRef, useState } from "react";
import dragIcon from "../icons/drag.svg"

import { ReactSVG } from "react-svg";

function VariablesCards (props){
  
  const usernameProps = props.username
  const indexProps = props.index
  
  const [titleEmpty, setTitleEmpty] = useState(null)

  const [titleDuplicate, setTitleDuplicate] = useState(null)

  const [formData, setFormData] = useState({
    username: usernameProps,
    title: '',
    variables: [''],
    listIndex: indexProps
  })

  const titleRef = useRef(null)

  const variableRef = useRef(null)

  const fetchPost = () =>{
    fetch('http://localhost:5000/new-variables-list', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if(data && data.error && data.error.code){
        if(data.error.code === 11000){
          setTitleDuplicate(true)
        } else {
          setTitleDuplicate(false)
        }
      } else {
        setTitleDuplicate(false)
      }
      
      
    })
  }


  const handleAddVariable = () =>{
    
    setFormData({ ...formData, variables: [...formData.variables, '']})
    
  }

  const handleInputBlurSubmit = () =>{
    fetchPost()
  }

  const handleVariableDelete = (e, index) => {
    const newVariables = formData.variables
    newVariables.splice(index, 1)

    setFormData({...formData, variables: newVariables})
    
    fetchPost()
  }

  const handleInputChange = (e,index ) => {
    formData.title === '' ? setTitleEmpty(true) : setTitleEmpty(false);
    const { name, value } = e.target;
    
    if(name == 'variables'){
      //if handling variables input change
      const variables = [...formData.variables];
      variables[index] = value;
      setFormData({ ...formData, variables });
      
      
    } else {
      //if handling title input change
      setFormData({ ...formData, [name]: value });
    }
    
  };

  const handleKeyDownSubmit = (e) =>{
    if(e.key === 'Enter' && formData.title === ''){

      return setTitleEmpty(true)
    }
    if(e.key === 'Enter' && formData.title !== ''){

      setTitleEmpty(false)

      if(titleRef.current) titleRef.current.blur()

      if(variableRef.current) variableRef.current.blur()  
      
    }

  }

  
  
  useEffect(()=>{
    // once variablesList from parent component is passed down and it exists for this card, 
    // use variablesList as formData instead of default 
    if(props.variablesList[indexProps] !== null){
      let data = props.variablesList[indexProps]
      console.log(data);
      setFormData({
        username: data.username,
        title: data.title,
        variables: data.variables,
        listIndex: data.listIndex 
      }) 
    }
  }, [props.variablesList]) 
  
  return(
    <div className="variables-card w-64 h-auto text-sm ">
      <div className="input-errors h-6">
        {
          titleEmpty &&
          <span className="text-red-700 text-xs">title required *</span>
        }
        {
          titleDuplicate &&
          <span className="text-red-700 text-xs">duplicate title *</span>
        }

      </div>
      
      <div className="flex items-center justify-between border-b h-6">
        <div className="top-left-round bg-red-700 w-full h-full text-white text-xs font-thin  pl-1 pr-1
        flex items-center">
          <input className="top-left-round bg-red-700 focus2 border-steel-blue focus:bg-white focus:text-black 
           w-full" type='text' name="title" value={formData.title} ref={titleRef}
          onChange={(e)=>handleInputChange(e)} onKeyDown={handleKeyDownSubmit} draggable='true'
          onBlur={handleInputBlurSubmit} placeholder='Custom Variable Title...' />
        </div>
        

        <button className="bottom-right-round bg-steel-blue h-full text-white text-xs  w-24" 
        onClick={handleAddVariable}>Add Variable</button>
      </div>
      <div className="variables-list ">
        {
          
          formData.variables.map((v,index) =>(
            <div className="bottom-right-round variable flex items-center justify-between
            border-r-gray-300 border border-b-gray-300 pl-2">
              <div className="svg-container h-6 w-6 flex items-center ">
                <ReactSVG className="text-gray-500 fill-current h-5 w-5" src={dragIcon}/>
              </div>
             
              <input className=" w-full h-full  text-sm font-thin rounded-none pl-2 "
              type='text' name="variables" value={formData.variables[index]} ref={variableRef} 
              onChange={(e)=>handleInputChange(e,index)} onKeyDown={handleKeyDownSubmit}
               onBlur={handleInputBlurSubmit} placeholder='Variable...' />
              
              <button className=" text-red-700 text-xs p-2 w-8 font-bold 
              hover:text-black" onClick={(e)=>handleVariableDelete(e, index)}>x</button>
            </div>
          ))
          
        }
      </div>
    </div>
  )
}

export default VariablesCards;