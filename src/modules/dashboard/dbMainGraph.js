import { useState, useEffect } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryArea, VictoryTheme, VictoryLabel } from 'victory';

import moment from "moment";

function DbMainGraph (props) {

  const trades = props.trades

  const [tradesWithBalance, setTradesWithBalance] = useState(null)

  


  return(
    <VictoryChart width={300} height={100} padding={{top: 10, bottom:10, left:30, right:15}} domainPadding={{ x: 10, y: 10 }}  theme={VictoryTheme.grayscale}>
      {
        tradesWithBalance &&
        <VictoryArea 
          data={tradesWithBalance}
          x="date"
          y="pnl"
          
          style={ { data: { stroke: "#7393B3", strokeWidth: 1, fill:"rgba(115, 147, 179, 0.3)"}}}
        />
      }
      <VictoryAxis
        tickFormat={(t) => moment(t).format('MM/DD/YYYY')}
        tickLabelComponent={<VictoryLabel angle={0} />}
        style={{ axis:{stroke: 'grey'}, tickLabels: { fontSize: 0} }}
        
      />
      <VictoryAxis dependentAxis style={{axis:{stroke: 'grey'}, tickLabels: { fontSize: 6,  stroke: 'grey', strokeWidth:0.2} }}/>

      
    </VictoryChart>


  )
}

export default DbMainGraph;