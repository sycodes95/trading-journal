import { useEffect, useState } from "react";



function VariablesArchive (props) {
  const username = props.username;
  const [archive, setArchive] = useState(null)
  const getArchive = () => {
    fetch(`http://localhost:5000/get-variables-archive?username=${username}`)
    .then(response => response.json())
    .then(data=> {
      if(data && !data.error) {
        setArchive(data.result)
      }
    })
    
  }

  useEffect(()=>{ 
    if(username) {
      getArchive()
    }
  },[username])

  useEffect(()=>{ 
    console.log(archive);
  },[archive])

  return (
    <div className="w-full p-8 text-sm flex flex-wrap justify-center gap-x-2 gap-y-2 mb-40">
      {
        archive &&
        archive.map(group => (
          <div className="border border-gray-300 w-64 overflow-x-auto p-2 bg-white rounded-sm">
            
            <div className="flex justify-center text-black font-bold bg-gray-300">
              {group.title}
            </div>
            
            <div className="flex flex-col items-center ">
              {
                group.variables.map(variable => (
                  <span>{variable}</span>
                ))
              }
            </div>
            
          </div>
        ))
      }
    </div>
  )
}

export default VariablesArchive;