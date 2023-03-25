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

  const deleteArchive = (id) => {
    fetch(`http://localhost:5000/delete-variables-archive?username=${username}&_id=${id}`,{
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data=> {
      if(data.result) getArchive()
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
    <div className="w-full p-8 text-sm flex flex-wrap justify-center gap-x-12 gap-y-2 mb-40 ">
      {
        archive &&
        archive.map(group => (
          <div className=" w-64 overflow-x-auto p-2 bg-black bg-opacity-30 rounded-sm h-full ">
            
            <div className="flex justify-center text-white font-bold bg-black bg-opacity-40">
              {group.title}
            </div>
            
            <div className="flex flex-col items-center text-white flex-grow">
              {
                group.variables.map(variable => (
                  <span>{variable}</span>
                ))
              }
            </div>

            <button className="w-full bg-striped-dark flex justify-center text-center text-red-800 text-xs" 
            onClick={()=> deleteArchive(group._id)}>
              DELETE ARCHIVE
            </button>
            
          </div>
        ))
      }
    </div>
  )
}

export default VariablesArchive;