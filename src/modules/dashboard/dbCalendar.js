import { useEffect, useRef, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';


function DbCalendar (props){
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const {trades, setTrades} = props.tradesContext

  const handleSelect = ({ start, end }) => {
    setStartDate(start);
    setEndDate(end);
  };

  

  
  return(
   <div className="h-full w-full">
   
   </div>
  )
}

export default DbCalendar;
