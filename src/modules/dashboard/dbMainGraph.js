import { useState, useEffect } from "react";
import { 
  VictoryLine,
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryArea,
  VictoryTheme,
  VictoryLabel,
  VictoryContainer,
  VictoryLegend
} from 'victory';

import moment from "moment";
import Selector from "./dbMainGraph/selector";
import GraphSelector from "./dbMainGraph/selector";

function DbMainGraph (props) {

  const [trades, setTrades] = useState(null)

  const userInfo = props.userInfo
  useEffect(()=>{
    if(userInfo && userInfo.username){
      
      fetch(`http://localhost:5000/trades-get?username=${userInfo.username}`)
      .then(response => response.json())
      .then((data) =>{
        
        if(!data.error){
          setTrades(data.trades)
        }
        if(data.error){
          console.log(data.error);
        }
      })
    }
  },[])

  useEffect(()=>{
    console.log(trades);
  },[trades])
  

  const MAX_WINRATE = 100;
  const MAX_R = 10;

  const styles = {
    classLabel: {
        fontSize: 3,
        fill: '#ddd',
        strokeWidth: 1,
    },
    xaxis: {
        tickLabels: {
            fontSize: 3,
        },
        grid: {
            stroke: '#999999',
        },
        axisLabel: {
            fontSize: 4,
            padding: 5,
            fill: '#000000',
        },
    },
    yaxis: {
        tickLabels: {
            fill: '#000000',
            fontSize: 3,
        },
        grid: {
            stroke: '#999999',
        },
        axisLabel: {
            fontSize: 4,
            padding: 5,
            fill: '#000000',
        },
        ticks: {
            size: 0,
        },
    },
    scatter: {
        labels: {
            fontSize: 2.5,
            fill: '#ccc',
        },
    },
    legend: {
        border: {
            stroke: '#000000',
            fill: '#FFF',
            width: 37,
            strokeDasharray: 2,
        },
        labels: {
            fill: '#000000',
            fontSize: 3,
            cursor: 'pointer',
        },
        title: {
            fill: '#000000',
            fontSize: 3,
            padding: 2,
        },
    },
    annotionLine: {
        data: {
            stroke: '#888',
            strokeWidth: 0.5,
            strokeDasharray: 1,
        },
        labels: {
            angle: -90,
            fill: '#ccc',
            fontSize: 3,
        },
    },
  };
  
  const yTickValues = [10, 20, 30, 40, 50, 60, 70, 80, 90 ,100]
  const xTickValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const chartMinDomain = { y: 0, x: 0 };
  const chartMaxDomain = { y: MAX_WINRATE, x: MAX_R };

  return(
    <div className="grid grid-cols-10 h-full bg-striped-content-big-light">
      <div className="chart col-span-10">
        <VictoryChart 
          width={300} 
          height={170} 
          padding={{top: 0, bottom:20, left:15, right:50}} 
          domainPadding={{ x: 10, y: 10 }}  
          theme={VictoryTheme.material}
          minDomain={chartMinDomain}
          maxDomain={chartMaxDomain}
          containerComponent={
            <VictoryContainer
                style={{
                    touchAction: 'auto',
                }}
            />
          }
        >
          
          <VictoryAxis
            tickFormat={(t) => `${t}R`}
            tickLabelComponent={<VictoryLabel angle={0} />}
            tickValues={xTickValues}
            style={styles.xaxis}
            label="Profit Factor"
            
          />
          <VictoryAxis 
            dependentAxis 
            tickFormat={(t) => t === 100 ? '' : `${t}%`}
            tickLabelComponent={<VictoryLabel dx={16} dy={-4} />}
            tickValues={yTickValues}
            style={styles.yaxis}
            label="Win Rate"
            
          />
          <VictoryLegend
            data={[
              { name: "One", symbol: { fill: "tomato", type: "star" } },
              { name: "Two", symbol: { fill: "orange" } },
              { name: "Three", symbol: { fill: "gold" } },
              { name: "One", symbol: { fill: "tomato", type: "star" } },
              { name: "Two", symbol: { fill: "orange" } },
              { name: "Three", symbol: { fill: "gold" } },
              { name: "One", symbol: { fill: "tomato", type: "star" } },
              { name: "Two", symbol: { fill: "orange" } },
              { name: "Three", symbol: { fill: "gold" } },
              { name: "One", symbol: { fill: "tomato", type: "star" } },
              { name: "Two", symbol: { fill: "orange" } },
              { name: "Three", symbol: { fill: "gold" } },
              { name: "One", symbol: { fill: "tomato", type: "star" } },
              { name: "Two", symbol: { fill: "orange" } },
              { name: "Three", symbol: { fill: "gold" } },
              { name: "Two", symbol: { fill: "orange" } },
              { name: "Three", symbol: { fill: "gold" } },
              { name: "One", symbol: { fill: "tomato", type: "star" } },
              { name: "Two", symbol: { fill: "orange" } },
              { name: "Three", symbol: { fill: "gold" } },
            ]}
            
            title='Filter by variable type'
            
            
            gutter={10}
            orientation="vertical"
            style={styles.legend}
            x={260}
            y={0}
          />

          
        </VictoryChart>

      </div>
      {

      }
      <div className="selectors col-span-2">
        <GraphSelector tradesContext={{trades, setTrades}} userInfo={userInfo}/>
      </div>
      

    </div>
    


  )
}

export default DbMainGraph;