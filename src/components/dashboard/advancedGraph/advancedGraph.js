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

import styles from "./style";
import legendSymbols from "./symbols";

function AdvancedGraph (props) {
 
  const userInfo = props.userInfo
  const trades = props.trades
 
  const [filterByVariables, setFilterByVariables] = useState(false)
  const [variableGroups, setVariableGroups] = useState(null)

  const [filterBySetups, setFilterBySetups] = useState(false)
  const [setupGroups, setSetupGroups] = useState(null)

  const [legendNamesAndSymbols, setLegendNamesAndSymbols] = useState(null)

  const [selectedLegend, setSelectedLegend] = useState("")
  const [selectedFilterTypeLegend, setSelectedFilterTypeLegend] = useState("")

  const [scatterData, setScatterData] = useState(null)

  const getGroups = () => {
    Promise.all([
      fetch(`http://localhost:5000/get-variables-list?username=${userInfo.username}`),
      fetch(`http://localhost:5000/get-setups?username=${userInfo.username}`)
    ])
      .then((responses) => Promise.all(responses.map(response => response.json())))
      .then(([variablesData, setupsData]) => {
        if (!variablesData.error) {
          setVariableGroups(variablesData.listVariables);
        }
  
        if (!setupsData.error) {
          setSetupGroups(setupsData.setups);
        }
      })
      .catch(error => console.error(error));
  };

  const handleLegendClick = (event, index) =>{
    console.log(index);
    const label = event.target.textContent;
    console.log(label);
    if(filterByVariables){
      setScatterData(getTradesByVariableGroups(label, index))
    }
    if(filterBySetups){
      console.log('filterBySetups');
      setScatterData(getTradesBySetupGroups(label))
    }
    //getTradesBySetupGroups(label)
    //getTradesByVariableGroups(label)
    setSelectedLegend(label)
  }

  const handleLegendTypeClick = (event, index) =>{
    
    const label = event.target.textContent;
    if(label === 'INSTRUMENTS'){

    }
    if(label === 'SETUPS'){
      setScatterData(null)
      setFilterBySetups(true)
      setFilterByVariables(false)
      getAllSetupData()
      
    }
    if(label === 'VARIABLES'){
      const firstVariableGroup = variableGroups[0].title
      setScatterData(null)
      setFilterBySetups(false)
      setFilterByVariables(true)
      setScatterData(getTradesByVariableGroups(firstVariableGroup))
      
    }

    setSelectedFilterTypeLegend(label)
  }

  
  const getTradesByVariableGroups = (title, index) =>{
    
    console.log(variableGroups);
    const tradesByVariable = variableGroups
      .at(index)
      .variables
      .map((variable, i) => {
        console.log(variable);
        const dataset = trades.filter(trade => 
          trade.variables.some((vari, vIndex) => 
            vari && vari.variable.toLowerCase() === variable.toLowerCase() && vari.title.toLowerCase() === title.toLowerCase() 
            
            
          )
        );
        
        return {
          filter: 'variable',
          group: title,
          variable,
          trades: dataset,
          symbolIndex: variableGroups.findIndex(group => group.title.toLowerCase() === title.toLowerCase())
        };
      });
    
    console.log(tradesByVariable);
    //setScatterData(formatScatterData(tradesByVariable));
    return formatScatterData(tradesByVariable)
  }

  const getTradesBySetupGroups = (label) =>{
    
    const tradesBySetup = setupGroups
    .filter(data => data.setup === label)
    .map(data =>{
      const dataset = trades.filter(trade => trade.setup.toLowerCase() === label.toLowerCase())
      return {
        filter: 'setup',
        setup: label,
        trades: dataset,
        symbolIndex: setupGroups.findIndex(group => group.setup.toLowerCase() === label.toLowerCase())
      }
    })
    return formatScatterData(tradesBySetup)
  }

  const formatScatterData = (tradesData) =>{
    let result = []
    
    tradesData.forEach(dataset =>{
      
      const {filter, trades, symbolIndex, variable, setup} = dataset
      
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
        if(!trade.sl || !trade.exit || !trade.entry) return;
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
    console.log(result.length ? true : false);
    if(result.length){
      return result
    }
    
    
  }

  const createLegend = () =>{
    const names = () =>{
      if(!filterBySetups && !filterByVariables || filterBySetups){
        return setupGroups.map(group => {
          return group.setup
        })
      }
      if(filterByVariables){
        return variableGroups.map(group =>{
          return group.title
        })
      }
    }
    const legend = names().map((name, index) => ({ name, symbol: legendSymbols[index] }));
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
  const getAllSetupData = () =>{
    setFilterBySetups(true)
    let data = []
    
    setupGroups.forEach(g =>{
      //check if data is valid. Must not be undefined or null
      let checkValid = getTradesBySetupGroups(g.setup)
      checkValid !== undefined && checkValid !== null && data.push(getTradesBySetupGroups(g.setup))
    })
    console.log(data);
    if(data.length){
      
      let result = data.map(d => d[0])
      setScatterData(result)
    }
    
  }

  const getAllVariableData = () =>{
    let data = []
    variableGroups.forEach(g =>{
      data.push(getTradesBySetupGroups(g.title))
    })
    
    let result = data.map(d => d[0])
    setScatterData(result)
  }

  useEffect(()=>{
    userInfo && userInfo.username && getGroups()

  },[userInfo])
  
  useEffect(()=>{
    setupGroups && createLegend()
    setupGroups && trades && getAllSetupData()

  },[setupGroups, trades])

  useEffect(()=>{
    filterBySetups && createLegend()

  },[filterBySetups])

  useEffect(()=>{
    filterByVariables && createLegend()

  },[filterByVariables])

  const filterTypeData = [
    {name: 'INSTRUMENTS', symbol: {fill: 'red'}},
    {name: 'SETUPS', symbol: {fill: 'navy'}},
    {name: 'VARIABLES', symbol: {fill: 'black'}},
  ]

  const MAX_WINRATE = 100;
  const MAX_R = 10;
  
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
          padding={{top: 8, bottom:20, left:15, right:50}} 
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
          
          <VictoryLegend
            data={filterTypeData}
            title='FILTER BY TYPE'
            gutter={10}
            orientation="vertical"
            style={styles.legend}
            labelComponent={
              <LegendLabel selectedDatumName={selectedFilterTypeLegend} />
            }
            events={[
              {
                target: "labels",
                eventHandlers: {
                  onClick:handleLegendTypeClick
                }
              }
            ]}
            x={258}
            y={8}
          />
          
          {
            legendNamesAndSymbols && 
            
            <VictoryLegend
              data={legendNamesAndSymbols}
              
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
                    onClick: (event, { index }) => {
                      handleLegendClick(event, index); // pass the index to the handler function
                    }
                  }
                }
              ]}
              x={258}
              y={35}
            />
          }
        </VictoryChart>
      </div>
    </div>
  )
}

export default AdvancedGraph;