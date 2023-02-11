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
  VictoryLegend,
  VictoryClipContainer
} from 'victory';

import moment, { duration } from "moment";
import Selector from "./dbMainGraph/selector";
import GraphSelector from "./dbMainGraph/selector";

function DbMainGraph (props) {
 
  const userInfo = props.userInfo
  const trades = props.trades
 

  const [variableGroups, setVariableGroups] = useState(null)

  const [graphTradeData, setGraphTradeData] = useState(null)

  const [legendNamesAndSymbols, setLegendNamesAndSymbols] = useState(null)

  const [scatterData, setScatterData] = useState(null)

  const legendSymbols = [
    { fill: "darkred", type: "diamond" },
    { fill: "red", type: "square" },
    { fill: "orange", type: "circle" },
    { fill: "black", type: "star" },
    { fill: "navy", type: "diamond" },
    { fill: "navy", type: "square" },
    { fill: "navy", type: "circle" },
    { fill: "navy", type: "star" },
    { fill: "purple", type: "diamond" },
    { fill: "purple", type: "square" },
    { fill: "purple", type: "circle" },
    { fill: "purple", type: "star" },
    { fill: "green", type: "diamond" },
    { fill: "green", type: "square" },
    { fill: "green", type: "circle" },
    { fill: "green", type: "star" },
    { fill: "pink", type: "diamond" },
    { fill: "pink", type: "square" },
    { fill: "pink", type: "circle" },
    { fill: "pink", type: "star" },
  ]

  const getVariableGroups = () =>{
    fetch(`http://localhost:5000/get-variables-list?username=${userInfo.username}`)
      .then(response => response.json())
      .then((data) =>{
        if(!data.error){
          setVariableGroups(data.listVariables)
        }
      })
  }

  const getTradesByVariableGroups = (title) =>{
    let tradeData = []
    
    let group = variableGroups.find(t => t.title === title)
    let groupIndex = variableGroups.findIndex(group => group.title === title)
    let variables = group.variables
    console.log(variables);
    
    let fetchPromises = variables.map((variable) => {
      return fetch(
        `http://localhost:5000/trades-search-variables?username=${userInfo.username}&searchInputTitle=${title}&searchInputVariable=${variable}`
      )
        .then(response => response.json())
        .then(data => {
          if (!data.error) {
            if (data.trades.length) {
              tradeData.push({
                group: title,
                variable: variable,
                trades: data.trades,
                symbolIndex: groupIndex
              });
            }
          }
        });
    });
  
    Promise.all(fetchPromises).then(() => {
      setGraphTradeData(tradeData);
      
    });
    
  }

  const formatScatter = () =>{
    let result = []
    graphTradeData.forEach(dataset =>{
      const {group, variable, trades, symbolIndex} = dataset
      let WR = 0
      let AVG_R = []
      trades.forEach(trade =>{
        console.log(trade);
        if(!trade.tp || !trade.sl || !trade.exit || !trade.entry) return;
        let R = Math.round(((trade.exit - trade.entry) / (trade.entry - trade.sl)) * 100) / 100
        R < 0 ? AVG_R.push(0) : AVG_R.push(R)
      })
     
      let x = AVG_R.reduce((acc, cur) => acc + cur, 0) / AVG_R.length;
      if (isNaN(x)) return;

      let winningTrades = trades.filter(t => t.fgl > 0)
      let totalTrades = trades.filter(t => t.fgl)

      let y = 0;
      if(winningTrades.length > 0){
        y = Math.floor((winningTrades.length / totalTrades.length) * 100)
      }
      
      if(!isNaN(y)){
        
        result.push({
          x: x, 
          y: y, 
          label: variable, 
          symbol: legendSymbols[symbolIndex].type, 
          fill: legendSymbols[symbolIndex].fill, 
          parent: group
          
        })
      }
    })
    setScatterData(()=> result)
  }

  const handleLabelClick = (event) =>{
    const label = event.target.textContent;
    getTradesByVariableGroups(label)
  }

  const createLegend = () =>{
    const legend = []
    const names = variableGroups.map(v => v.title)
    for(let i = 0; i < names.length; i++){
      legend.push({name: names[i], symbol: legendSymbols[i]})

    }
    return setLegendNamesAndSymbols(legend)
  }

 
  useEffect(()=>{
    if(userInfo && userInfo.username){
      getVariableGroups()
      
    }
  },[userInfo])
  
  useEffect(()=>{
    if(variableGroups){
      createLegend()
    }
    
  },[variableGroups])

  useEffect(()=>{
    console.log(graphTradeData);
    if(graphTradeData){
      formatScatter()
    }

  },[graphTradeData])

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
            fill: ({datum}) => datum.fill,
            dy: ({datum}) => datum.dy
        },
        data:{
          fill: ({datum}) => datum.fill,
          
        }
        
    },
    legend: {
        border: {
            stroke: '#000000',
            fill: '#FFF',
            width: 42,
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
        maxWidth: 30
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
          height={150} 
          padding={{top: 5, bottom:20, left:15, right:50}} 
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
          {
            scatterData &&
            <VictoryScatter
              data={scatterData}
              style={styles.scatter}
              size={1}
              activeSize={5}
              labelComponent={<VictoryLabel dy={-3} />}
              animate={{onLoad: { duration: 500 }}}
                
                
              
            />
          }
          
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
          {
            legendNamesAndSymbols &&
            <VictoryLegend
              data={legendNamesAndSymbols}
              title='Filter by variable type'
              gutter={10}
              orientation="vertical"
              style={styles.legend}
              events={[
                {
                  target: 'labels',
                  eventHandlers: {
                    onClick: handleLabelClick,
                  },
                },
              ]}
              
              x={258}
              y={0}
            />
          }
          
        </VictoryChart>

      </div>
      {

      }
      
      

    </div>

  )
}

export default DbMainGraph;