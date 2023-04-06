import React, { useEffect, useRef, useState } from "react";
import dragIcon from "../../icons/drag.svg"
import { DragDropContext, Droppable, Draggable} from "@hello-pangea/dnd";
import plusSVG from "../../icons/plus.svg"
import Icon from '@mdi/react';
import { mdiArchive, mdiCheckBold } from '@mdi/js';
import { Oval, Triangle, InfinitySpin } from "react-loader-spinner";



import { ReactSVG } from "react-svg";

function VariablesCards (props){
  
  const usernameProps = props.username
  const indexProps = props.index
  
  const [onlyTitleEmpty, setOnlyTitleEmpty] = useState(null)

  const [bothTitleVariablesEmpty, setBothTitleVariablesEmpty] = useState(null)

  const [titleDuplicate, setTitleDuplicate] = useState(null)

  const [previousVariable, setPreviousVariable] = useState(null)

  const [archiveLoading, setArchiveLoading] = useState(false)
  const [archiveSuccess, setArchiveSuccess] = useState(false)

  const [formData, setFormData] = useState({
    username: usernameProps,
    title: '',
    variables: [''],
    listIndex: indexProps
  })

  

  const titleRef = useRef(null)

  const variableRef = useRef(null)

  const fetchPost = () =>{
    
    fetch(`${process.env.REACT_APP_API_HOST}/new-variables-list`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then((data) => {
      
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

  const fetchAndUpdateTrades = () =>{
    
    fetch(`${process.env.REACT_APP_API_HOST}/trades-edit-variables?username=${usernameProps}`, {
      method: 'PUT',
      body: JSON.stringify({ variables: { previousTitle: previousVariable.title, newTitle: formData.title }}),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then((data) => {
      
      if(data && data.error){
      } 
    })
  }
  ///trades-edit-variables
  const fetchDelete = () =>{
    console.log('delete');
    fetch(`${process.env.REACT_APP_API_HOST}/delete-variables-list`, {
      method: 'DELETE',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then((data) => {
    })

  }

  const fetchArchivePost = () =>{
      setArchiveLoading(true)
      const formatted = {
        username: formData.username,
        title: formData.title,
        variables: formData.variables,
        date: new Date ()
      }
      fetch(`${process.env.REACT_APP_API_HOST}/post-variables-archive`, {
        method: 'POST',
        body: JSON.stringify(formatted),
        headers: { 'Content-Type': 'application/json'}

      })
      .then(response => response.json())
      .then((data) => {
        if(data && !data.error){
          setArchiveLoading(false)
          setArchiveSuccess(true)
          setTimeout(()=>{
            setArchiveSuccess(false)
          },1000)
          
        }
      })

  }

  const handleAddVariable = () =>{
    setFormData({ ...formData, variables: [...formData.variables, '']})
    
  }

  const handleVariableDelete = (e, index) => {
    
    const newVariables = formData.variables
    newVariables.splice(index, 1)
    if(!formData.title) console.log('hi');
    if(formData.variables.length === 0 && (formData.title === '' || !formData.title)){
      return fetchDelete()
    } 
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

  const handleInputBlurSubmit = () =>{
    console.log('test');
    if(bothTitleVariablesEmpty) {
      
      fetchDelete()
    } else if (onlyTitleEmpty){
      return 
    } 
    if(formData.title.length && formData.title !== '' && formData.variables.length && formData.variables[0] !== ''){
      console.log('fetchpost');
      //if title and variables exists
      if(previousVariable) fetchAndUpdateTrades()

      fetchPost()
    } 
  }

  const handleKeyDownSubmit = (e) =>{
    
    if(e.key === 'Enter' && formData.title !== ''){
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
    
    
    if(formData.title === '' && formData.variables[0] !== '' && formData.variables.length !== 0){
      setOnlyTitleEmpty(true)
    } else {
      setOnlyTitleEmpty(false);
    }  

    if((formData.title === '' && formData.variables[0] === '') || (formData.title === '' && formData.variables.length === 0)){
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
      setPreviousVariable({
        username: data.username,
        title: data.title,
        variables: data.variables,
        date: new Date ()
      })
    }
  }, [props.variablesList, indexProps]) 

  useEffect(()=>{
    
  },[previousVariable ])
  
  return(
    
    <div className="variables-card w-full h-auto text-sm ">
      
      <div className="input-errors h-6">
        { onlyTitleEmpty && <span className="text-red-700 text-xs">title required *</span> }
        
        { titleDuplicate && <span className="text-red-700 text-xs">duplicate title *</span>}

      </div>
      
      
      <div className="flex items-center justify-between h-6 ">
        <div className="top-left-round bg-striped-dark-alt w-full h-full text-white text-xs  pl-1 pr-1
        flex items-center">
          <input className="top-left-round w-full outline-none bg-black bg-opacity-0 focus:bg-black focus:bg-opacity-30 
          font-bold caret-white" type='text' name="title" value={formData.title} ref={titleRef}
          onChange={(e)=>handleInputChange(e)} onKeyDown={handleKeyDownSubmit} 
          onBlur={handleInputBlurSubmit} placeholder='Custom Variable Title...' />
        </div>

        <button className="bottom-right-round border border-gray-800 h-full text-black text-xs w-9
        flex justify-center items-center bg-green-800 bg-opacity-40 hover:bg-opacity-80 transition-all" 
        onClick={handleAddVariable}>
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
                         border-r border-b border-gray-900 bg-black bg-opacity-30 
                        ">
                        
                          <div className="svg-container h-5 w-5 flex items-center ">
                            <ReactSVG className="text-gray-500 fill-current h-5 w-5" src={dragIcon}/>
                          </div>
                        
                          <input className=" w-full h-7  text-xs font-thin rounded-none pl-2
                           text-white bg-black bg-opacity-30 caret-white"
                          type='text' name="variables" value={formData.variables[index]} ref={variableRef} 
                          onChange={(e)=>handleInputChange(e,index)} onKeyDown={handleKeyDownSubmit}
                          onBlur={handleInputBlurSubmit} placeholder='. . .' />
                          
                          <button className=" text-red-700 text-xs  w-10 font-bold 
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
      {
        !onlyTitleEmpty && !bothTitleVariablesEmpty &&
        <div className="pl-2 pr-2  bg-black bg-opacity-30 w-full bottom-right-round grid grid-cols-3
        border-b border-r border-gray-900">
          <div className="col-start-2 flex justify-center items-center">
            <button className="text-xs text-gray-500 font-bold hover:text-green-300 transition-colors"
            onClick={fetchArchivePost}
            >
            ARCHIVE
            </button>
            
          </div>

          <div className="col-start-3 flex justify-end items-center">
            {
              archiveLoading &&
              <Oval height="12" width="12" color="#808080" secondaryColor="#FFFFFF"
              strokeWidth="8" ariaLabel="triangle-loading" wrapperStyle={{}}
              visible={true}/>
            }
            {
              archiveSuccess && 
              <Icon color='green' path={mdiCheckBold} size={0.6} />
            }
            
          </div>
         
            
            

          
          
          
        </div>
      }
      
    </div>
  )
}

export default VariablesCards;