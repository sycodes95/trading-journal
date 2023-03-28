import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import VariablesCards from "./variablesCards";
import VariablesSVG from "../../icons/variables.svg"
import VariablesArchive from "./variablesArchive";

function Variables (){
  const [userInfo, setUserInfo] = useState(null)

  const [variablesList, setVariablesList] = useState(null)

  const [viewArchive, setViewArchive] = useState(false)

  function getVariablesList (){
    
    fetch(`${process.env.REACT_APP_API_HOST}/get-variables-list?username=${userInfo.username}`)
    .then(response => response.json())
    .then((data) => {
      
      let listVariables = data.listVariables;

      let list = Array(20).fill(null)

      if(listVariables.length > 0){

        listVariables.forEach((variable) =>{

          list.splice(variable.listIndex, 1, variable)
        })

        setVariablesList(list)

      } else {

        setVariablesList(list)

      }
      
    })
    
  }

  const handleViewArchive = () => {
    setViewArchive(!viewArchive)
  }
  
  useEffect(()=>{
    userInfo && getVariablesList()
  }, [userInfo])

  useEffect(()=>{
  },[viewArchive])

  useEffect(()=>{
    //Token
    const token = JSON.parse(localStorage.getItem('token'))
    
    if(token) {
      fetch(`${process.env.REACT_APP_API_HOST}/verifytoken`, {
        method: 'GET',
        headers: { 'authorization': `Bearer ${token}`}
      })
      .then(response => response.json())
      .then((data) => {
        if(data.user.user){
          setUserInfo(data.user.user)
          
        }
      })
      
      .catch(error => console.error(error))
      }
  }, [])

  useEffect(()=>{
  },[variablesList])

  return(
    <div className=" p-12 flex justify-center">
      <div className="VARIABLES-CONTAINER w-10/12 flex flex-col">
        <section className="section-info text-white p-4 bg-black bg-opacity-40 rounded-sm
        grid items-center">
          <div className="">
            <ReactSVG className="h-14 w-14 text-white fill-current" src={VariablesSVG}/>
          </div>
          
          
          <div className="pl-8">
            <div className="text-2xl">
              <span>Custom Variables</span>
            </div>
            <div className="text-sm">
              <span>
                Add and manage variable types. 
                Variables are important to track, and if used 
                correctly, will increase your edge.
              </span>
            </div>
          </div>
          
        </section>

        <section className="flex ">
          <div className="variables-cards-container h-full gap-x-12 
          flex flex-wrap justify-center
          mt-8   pb-6">
            {
              variablesList &&
              variablesList.map((list, index) =>(
                <div className="card ">
                  <VariablesCards username={userInfo.username} index={index} 
                  variablesList={variablesList}/>
                  
                </div>
              ))
              
            }
          </div>
        </section>

        <div className="pt-12 w-full flex justify-center ">
          <button className="border border-gray-800 bg-black bg-opacity-30 hover:bg-opacity-20 text-white rounded-md text-sm p-2  transition-colors" onClick={handleViewArchive}>
            VIEW ARCHIVED
          </button>
          
        </div>
        <div className="relative w-full">
          {
            viewArchive && 
            <VariablesArchive username={userInfo.username}/>
          }
        </div>
      </div>
    </div>
  )
}

export default Variables;