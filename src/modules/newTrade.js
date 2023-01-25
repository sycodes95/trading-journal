import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as Dialog from '@radix-ui/react-dialog';

function NewTrade (props) {

  
  
  const [formData, setFormData] = useState({
    username: '',
    open: true,
    entrydate: null,
    instrument: '',
    setup: '',
    position: '',
    plannedentry: null,
    entry: null,
    tp: null,
    sl: null,
    exitdate: '',
    exitprice: null,
    mfe: null,
    mae: null,
    fgl: null,
    fees: null,
    comments: '',
    tv: '',
    variables: [],
    public: false,
  })

  

  
  return(
    <div className="h-full w-full ">
      <div className="new-trade-container  flex justify-between h-16">
        <div></div>
        <Dialog.Close asChild>
          <button className="h-8 text-lg ">x</button>
        </Dialog.Close>
      </div>

    </div>
  )
}


export default NewTrade;