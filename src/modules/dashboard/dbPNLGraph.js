import { useState, useEffect } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryArea, VictoryTheme } from 'victory';

import moment from "moment";

function DbPNLGraph (props) {

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
    <VictoryChart width={800} height={100} padding={{top: 20, bottom:20, left:40, right:40}} domainPadding={{ x: 10, y: 10 }}  theme={VictoryTheme.grayscale}>
      {
        tradesWithBalance &&
        <VictoryArea 
          data={tradesWithBalance}
          x="date"
          y="pnl"
          
          style={ { data: { stroke: "#000000", strokeWidth: 2, fill:"rgba(0, 0, 0, 0.3)"}}}
        />
      }
      <VictoryAxis
        tickFormat={(t) => moment(t).format('MM/DD/YYYY')}
        style={{ tickLabels: { fontSize: 8 } }}
      />
      <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 8 } }}/>

      
    </VictoryChart>


  )
}

export default DbPNLGraph;