import { useState, useEffect } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryArea, VictoryTheme, VictoryLabel, VictoryCandlestick } from 'victory';

import moment from "moment";

function PnlGraph (props) {

  const trades = props.trades

  const [tradesWithBalance, setTradesWithBalance] = useState(null)

  useEffect(()=>{
    
    if(trades){
      let cumulativePNL = [] 
      let reversed = trades.reverse()
      reversed.forEach((tr, i) =>{
        tr.entrydate = new Date(moment(tr.entrydate).format("YYYY-MM-DD hh:mm"))
      })
      let firstDate = reversed[0].entrydate
      let dayBefore = moment(firstDate).subtract(1, 'days').format()
      cumulativePNL.push({pnl: 0, fgl:0, date: moment(dayBefore).format("YYYY-MM-DD hh:mm")})
      reversed.reduce((acc, cur) =>{
        if(!cur.fgl) return acc + cur.fgl;
        cumulativePNL.push({pnl: acc + cur.fgl, fgl:cur.fgl , date: moment(cur.entrydate).format("YYYY-MM-DD hh:mm")})
        return acc + cur.fgl;
      },0)
      setTradesWithBalance(cumulativePNL)
    }

  },[trades])


  return(
    <div className="bg-striped-content-big-light">

    
      <VictoryChart 
      width={200} 
      height={200} 
      responsive={true}
      padding={{top: 10, bottom:10, left:30, right:15}} 
      domainPadding={{ x: 10, y: 10 }}  
      theme={VictoryTheme.material}>
        {
          tradesWithBalance &&
          <VictoryArea 
            data={tradesWithBalance}
            x="date"
            y="pnl"
            
            style={ { data: { stroke: "#7393B3", strokeWidth: 1, fill:"rgba(115, 147, 179, 0.5)"}}}
          />
        }
        <VictoryAxis
          tickFormat={(t) => moment(t).format('MM/DD/YYYY')}
          tickLabelComponent={<VictoryLabel angle={0} />}
          style={{
            axis:{stroke: 'lightgray', opacity: 1},
            tickLabels: { fontSize: 0},
            grid:{stroke: 'none',  strokeDasharray: [], opacity: 0.3} 
          }}
          
        />
        <VictoryAxis dependentAxis 
          style={{
            axis:{stroke: 'lightgray', opacity: 1},
            tickLabels: { fontSize: 6,  stroke: 'grey', strokeWidth:0.2},
            grid:{stroke: 'none',  strokeDasharray: [], opacity: 0.3}  
          }}
        />

        
      </VictoryChart>
    </div>


  )
}

export default PnlGraph;