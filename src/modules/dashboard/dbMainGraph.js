import { useState, useEffect, useMemo } from "react";
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
} from 'victory';

function DbMainGraph (props) {
 
  const userInfo = props.userInfo
  const trades = props.trades
 
  const [filterByVariables, setFilterByVariables] = useState(false)
  const [variableGroups, setVariableGroups] = useState(null)
  

  const [filterBySetups, setFilterBySetups] = useState(false)
  const [setupGroups, setSetupGroups] = useState(null)
  const [setupOverall, setSetupOverall] = useState(true)

  const [legendNamesAndSymbols, setLegendNamesAndSymbols] = useState(null)

  const [selectedLegend, setSelectedLegend] = useState("")

  const [scatterData, setScatterData] = useState(null)

  const legendSymbols = [
    { fill: "gray", type: "diamond" },
    { fill: "gray", type: "square" },
    { fill: "gray", type: "circle" },
    { fill: "gray", type: "star" },
    { fill: "red", type: "diamond" },
    { fill: "red", type: "square" },
    { fill: "red", type: "circle" },
    { fill: "red", type: "star" },
    { fill: "darkgreen", type: "diamond" },
    { fill: "darkgreen", type: "square" },
    { fill: "darkgreen", type: "circle" },
    { fill: "darkgreen", type: "star" },
    { fill: "black", type: "diamond" },
    { fill: "black", type: "square" },
    { fill: "black", type: "circle" },
    { fill: "black", type: "star" },
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

  const getSetupGroups = () =>{
    
    fetch(`http://localhost:5000/get-setups?username=${userInfo.username}`)
      .then(response => response.json())
      .then((data) =>{
        
        if(!data.error){
          setSetupGroups(data.setups)
        }
      })
  }


  const handleLegendClick = (event, index) =>{
    
    
    const label = event.target.textContent;
    if(filterByVariables){
      getTradesByVariableGroups(label)
    }
    if(filterBySetups){
      getTradesBySetupGroups(label)
    }
    //getTradesBySetupGroups(label)
    //getTradesByVariableGroups(label)
    setSelectedLegend(label)
  }

  
  const getTradesByVariableGroups = (title) =>{
    
    
    const tradesByVariable = variableGroups
      .find(group => group.title === title)
      .variables
      .map(variable => {
        const dataset = trades.filter(trade =>
          trade.variables.some(vari =>
            vari.variable === variable && vari.title === title
          )
        );
        return {
          filter: 'variable',
          group: title,
          variable,
          trades: dataset,
          symbolIndex: variableGroups.findIndex(group => group.title === title),
        };
      });

     
    console.log(tradesByVariable);
    formatScatterData(tradesByVariable);
  }

  const getTradesBySetupGroups = (label) =>{
    
    const tradesBySetup = setupGroups
      .map(data =>{
        if(label){
          const dataset = trades.filter(trade =>
            trade.setup === label
          )
          console.log(setupGroups);
          return {
            filter: 'setup',
            setup: label,
            trades: dataset,
            symbolIndex: setupGroups.findIndex(group => group.setup === label)
          }
        }
      })
    formatScatterData(tradesBySetup);
  }

  const formatScatterData = (tradesData) =>{
    let result = []
    
    if(setupOverall && scatterData){
      result = scatterData
    }
    
    tradesData.forEach(dataset =>{
      
      const {filter, trades, symbolIndex, variable, setup} = dataset
      console.log(variable);
      const label = () =>{
        if(filter === 'setup'){
          return setup
        }
        if(filter === 'variable'){
          return variable
        }
      }
      
      
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
          label: label(), 
          symbol: legendSymbols[symbolIndex].type, 
          fill: legendSymbols[symbolIndex].fill, 
          
          
        })
      }
    })
    setScatterData(()=>result)
  }

  const createLegend = () =>{
    const legend = []
    let groups = setupGroups;
    let names = setupGroups.map(group => group.setup)
    if(filterBySetups) {
      groups = setupGroups;
      names = setupGroups.map(group => group.setup)
    } else if (filterByVariables) {
      groups = variableGroups;
      names = variableGroups.map(group => group.title)
    }
    
    
    for(let i = 0; i < names.length; i++){
      legend.push({name: names[i], symbol: legendSymbols[i]})
    }
    setLegendNamesAndSymbols(legend)
  }

  const LegendLabel = (props) => {
    const { selectedDatumName, datum } = props;
    const style = useMemo(() => {
      let style = props.style;

      if (selectedDatumName === datum.name) {
        style = {
          ...props.style,
          textDecoration: 'underline',
          fill: '#000000',
        };
      }

      return style;
    }, [selectedLegend]);

    return <VictoryLabel {...props} style={style} />;
  };

  const handleFilterByVariables = (e) =>{
    setScatterData(null)
    setFilterBySetups(false)
    setFilterByVariables(true)
    setSetupOverall(false)
  }

  const handleFilterBySetups = (e) =>{
    setScatterData(null)
    setFilterBySetups(true)
    setFilterByVariables(false)
    setSetupOverall(false)
  }

  useEffect(()=>{
    userInfo && userInfo.username && getVariableGroups() 
    userInfo && userInfo.username && getSetupGroups()
  },[userInfo])
  
  

  useEffect(()=>{
    setupGroups && createLegend()
    setupGroups && trades && setupGroups.forEach(g =>{
      console.log('g');
      getTradesBySetupGroups(g.setup)
    })
  },[setupGroups, trades])
  /*
  useEffect(()=>{
    setupGroups && trades && setupGroups.forEach(g =>{
      console.log('g');
      getTradesBySetupGroups(g.setup)
    })
    //setupOverall && 
  },[setupOverall])
  */
  useEffect(()=>{
    console.log(scatterData);
  },[scatterData])

  useEffect(()=>{
    filterBySetups && createLegend()
  },[filterBySetups])

  useEffect(()=>{
    filterByVariables && createLegend()
  },[filterByVariables])
 

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
        fontSize: 3,
        fill: ({datum}) => datum.fill,
        
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
  const chartAnimate = { duration: 500 };

  return(
    <div className="grid grid-cols-10 h-full bg-striped-content-big-light">
      <div className="chart col-span-10">
        <div className="w-full flex justify-end col-span-full text-sm gap-x-2 items-center">
          <div>Filter by :</div>
          <button className="">Instrument</button>
          <button onClick={handleFilterBySetups}>Setup</button>
          <button onClick={handleFilterByVariables}>Variables</button>

          
        </div>
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
          
          <VictoryAxis
            tickFormat={(t) => `${t}R`}
            tickLabelComponent={<VictoryLabel angle={0} />}
            tickValues={xTickValues}
            style={styles.xaxis}
            label="R Multiple"
            
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
            scatterData && 
            <VictoryScatter
              animate={{onLoad: { delay: 0, duration: 1 }, onEnter: { delay: 0, duration: 1 }, onExit: { delay: 0, duration: 1 }, duration:500}}
              style={styles.scatter}
              labelComponent={<VictoryLabel dy={-3} />}
              size={1}
              activeSize={5}
              data={scatterData}
            />
          }
          
          {
            legendNamesAndSymbols && 
            <VictoryLegend
              data={legendNamesAndSymbols}
              title='Filter by variable type'
              gutter={10}
              orientation="vertical"
              style={styles.legend}
              labelComponent={
                <LegendLabel selectedDatumName={selectedLegend} />
              }
              events={[
                {
                  target: "labels",
                  eventHandlers: {
                    onClick:handleLegendClick
                  }
                }
              ]}
              x={258}
              y={0}
            />
          }
        </VictoryChart>
      </div>
    </div>
  )
}

export default DbMainGraph;