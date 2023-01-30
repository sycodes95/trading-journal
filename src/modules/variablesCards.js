import React, { useEffect, useRef, useState } from "react";
import dragIcon from "../icons/drag.svg"
import { DragDropContext, Droppable, Draggable} from "@hello-pangea/dnd";
import plusSVG from "../icons/plus.svg"

import { ReactSVG } from "react-svg";

function VariablesCards (props){
  
  const usernameProps = props.username
  const indexProps = props.index
  
  const [onlyTitleEmpty, setOnlyTitleEmpty] = useState(null)

  const [bothTitleVariablesEmpty, setBothTitleVariablesEmpty] = useState(null)

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

  const fetchDelete = () =>{
    fetch('http://localhost:5000/delete-variables-list', {
      method: 'DELETE',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      
    })

  }

  const handleAddVariable = () =>{
    setFormData({ ...formData, variables: [...formData.variables, '']})
  }

  const handleInputBlurSubmit = () =>{
    if(bothTitleVariablesEmpty) {
      fetchDelete()
    } else if (onlyTitleEmpty){
      return
    } else {
      fetchPost()
    }
    
  }

  const handleVariableDelete = (e, index) => {
    const newVariables = formData.variables
    newVariables.splice(index, 1)

    setFormData({...formData, variables: newVariables})
    
    fetchPost()
  }

  const handleInputChange = (e,index ) => {
    
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

      return setOnlyTitleEmpty(true)
    }
    if(e.key === 'Enter' && formData.title !== ''){

      setOnlyTitleEmpty(false)

      if(titleRef.current) titleRef.current.blur()
      e.target.blur()
      
    }
  }

  function handleOnDragEnd (result){
    
    if (!result.destination) return;

    const items = formData.variables;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormData({...formData, variables: items});
    fetchPost()
  }

  useEffect(()=>{
    if(formData.title === '' && formData.variables[0] !== '' ){
      setOnlyTitleEmpty(true)
    } else {
      setOnlyTitleEmpty(false);
    }  

    if(formData.title === '' && (formData.variables[0] === '' || formData.variables.length < 1)){
      setBothTitleVariablesEmpty(true)
    } else {
      setBothTitleVariablesEmpty(false);
    }  
  },[formData])
  
  useEffect(()=>{
    // once variablesList from parent component is passed down and it exists for this card, 
    // use variablesList as formData instead of default 
    if(props.variablesList[indexProps] !== null){
      let data = props.variablesList[indexProps]
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
        { onlyTitleEmpty && <span className="text-red-700 text-xs">title required *</span> }
        
        { titleDuplicate && <span className="text-red-700 text-xs">duplicate title *</span>}

      </div>
      
      <div className="flex items-center justify-between border-b h-6">
        <div className="top-left-round bg-jet w-full h-full text-white text-xs  pl-1 pr-1
        flex items-center">
          <input className="top-left-round w-full outline-none bg-jet focus:bg-white focus:text-black 
          font-bold" type='text' name="title" value={formData.title} ref={titleRef}
          onChange={(e)=>handleInputChange(e)} onKeyDown={handleKeyDownSubmit} 
          onBlur={handleInputBlurSubmit} placeholder='Custom Variable Title...' />
        </div>

        <button className="bottom-right-round border border-black h-full text-black text-xs w-12 
        flex justify-center items-center hover:text-steel-blue" onClick={handleAddVariable}>
          <ReactSVG className="h-4 w-4  transition-colors fill-current" src={plusSVG}/>
        </button>
      </div>
      {
        formData && 
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div className="droppable variables-list" {...provided.droppableProps} ref={provided.innerRef}>
                {formData.variables.map((v, index) =>{
                  return(
                    <Draggable key={index} draggableId={`${index}`} index={index}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                        className="bottom-right-round variable flex items-center justify-between
                        border-r-gray-300 border border-b-gray-300 p-1 bg-white
                        ">
                        
                          <div className="svg-container h-6 w-6 flex items-center ">
                            <ReactSVG className="text-gray-500 fill-current h-5 w-5" src={dragIcon}/>
                          </div>
                        
                          <input className=" w-full h-full  text-sm font-thin rounded-none pl-2
                           text-white font-black-outline "
                          type='text' name="variables" value={formData.variables[index]} ref={variableRef} 
                          onChange={(e)=>handleInputChange(e,index)} onKeyDown={handleKeyDownSubmit}
                          onBlur={handleInputBlurSubmit} placeholder='. . .' />
                          
                          <button className=" text-red-700 text-xs  w-8 font-bold 
                          hover:text-black" onClick={(e)=>handleVariableDelete(e, index)}>x</button>
                        </div>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      }
    </div>
  )
}

export default VariablesCards;