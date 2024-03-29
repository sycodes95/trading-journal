import { indexOf } from "lodash";
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
  
  const [variableGroups, setVariableGroups] = useState(null)
  const [setupGroups, setSetupGroups] = useState(null)
  const [instrumentGroups, setInstrumentGroups] = useState(null)
  
  const [filterByVariables, setFilterByVariables] = useState(false)
  const [filterBySetups, setFilterBySetups] = useState(false)
  const [filterByInstruments, setFilterByInstruments] = useState(false)

  const [legendNamesAndSymbols, setLegendNamesAndSymbols] = useState(null)
  const [selectedLegend, setSelectedLegend] = useState("")
  const [selectedFilterTypeLegend, setSelectedFilterTypeLegend] = useState("")

  const [scatterData, setScatterData] = useState(null)

  const getGroups = () => {
    Promise.all([
      fetch(`${process.env.REACT_APP_API_HOST}/get-variables-list?username=${userInfo.username}`),
      fetch(`${process.env.REACT_APP_API_HOST}/get-setups?username=${userInfo.username}`),
      fetch(`${process.env.REACT_APP_API_HOST}/getinstruments?username=${userInfo.username}`)
    ])
      .then((responses) => Promise.all(responses.map(response => response.json())))
      .then(([variablesData, setupsData, instrumentsData]) => {

        if (!variablesData.error) setVariableGroups(variablesData.listVariables);
        
        if (!setupsData.error) setSetupGroups(setupsData.setups);

        if (!instrumentsData.error) setInstrumentGroups(instrumentsData.instruments);

      })
      .catch(error => console.error(error));
  };

  const handleFilterClick = (event, index) =>{
    
    const label = event.target.textContent;
    if(label === 'INSTRUMENTS'){
      setScatterData(null)
      setFilterByInstruments(true)
      setFilterBySetups(false)
      setFilterByVariables(false)
      getAllInstrumentsData()

    }
    if(label === 'SETUPS'){
      setScatterData(null)
      setFilterByInstruments(false)
      setFilterBySetups(true)
      setFilterByVariables(false)
      getAllSetupData()
      
    }
    if(label === 'VARIABLES'){
      const firstVariableGroup = variableGroups[0].title
      const variableTitleIndex = variableGroups.findIndex(obj => obj.title === firstVariableGroup);
      
      setSelectedLegend(firstVariableGroup)
      setScatterData(null)
      setFilterByInstruments(false)
      setFilterBySetups(false)
      setFilterByVariables(true)
      setScatterData(getTradesByVariableGroups(firstVariableGroup, variableTitleIndex))
    }

    setSelectedFilterTypeLegend(label)
  }

  const handleLegendClick = (event, index) =>{

    const title = event.target.textContent;

    const variableTitleIndex = variableGroups.findIndex(obj => obj.title === title);
    
    if(filterByVariables){
      setScatterData(getTradesByVariableGroups(title ,variableTitleIndex, index))
    }
    if(filterBySetups){
      
      setScatterData(getTradesBySetupGroups(title))
    }
    if(filterByInstruments){
      
      setScatterData(getTradesByInstrumentGroups(title))
    }
    //getTradesBySetupGroups(label)
    //getTradesByVariableGroups(label)
    setSelectedLegend(title)
  }

  

  
  const getTradesByVariableGroups = (title ,index) =>{
    
    const tradesByVariable = variableGroups
      .at(index)
      .variables
      .map(variable => {
        
        const dataset = trades.filter(trade => 
          trade.variables.some(v => v && v.variable.toLowerCase() === variable.toLowerCase() && v.title === title)
        );
        return {
          filter: 'variable',
          group: title,
          variable: variable,
          trades: dataset,
          symbolIndex: variableGroups.findIndex(group => group.title.toLowerCase() === title.toLowerCase())
        };
      });
    
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

  const getTradesByInstrumentGroups = (label) =>{
    
    const tradesByInstrument = instrumentGroups
    .filter(data => data.instrument === label)
    .map(data =>{
      const dataset = trades.filter(trade => trade.instrument.toLowerCase() === label.toLowerCase())
      return {
        filter: 'instrument',
        instrument: label,
        trades: dataset,
        symbolIndex: instrumentGroups.findIndex(group => group.instrument.toLowerCase() === label.toLowerCase())
      }
    })
    return formatScatterData(tradesByInstrument)
  }

  const formatScatterData = (tradesData) =>{
    let result = [];
    
    tradesData.forEach(dataset =>{
      
      const {filter, trades, symbolIndex, variable, setup, instrument} = dataset;
      
      const label = () =>{
        if(filter === 'instrument') return instrument;
        if(filter === 'setup') return setup;
        if(filter === 'variable') return variable;
      };
      
      let AVG_R = []
      trades.forEach(trade =>{
        
        if(!trade.sl || !trade.exit || !trade.entry) return;
        const R = Math.round(((trade.exit - trade.entry) / (trade.entry - trade.sl)) * 100) / 100
        R < 0 ? AVG_R.push(0) : AVG_R.push(R)
        
      })
      const averageR = AVG_R.reduce((acc, cur) => acc + cur, 0) / AVG_R.length;

      if (isNaN(averageR)) return;

      const winningTrades = trades.filter(trade => trade.fgl > 0);
      const totalTrades = trades.filter(trade => trade.fgl);

      const winRate = winningTrades.length > 0 ? Math.floor((winningTrades.length / totalTrades.length) * 100) : 0;
      
      if(!isNaN(winRate)){
        result.push({
          x: averageR, 
          y: winRate, 
          label: label(), 
          symbol: legendSymbols[symbolIndex].type, 
          fill: legendSymbols[symbolIndex].fill, 
        });
        
      };
    });
    
    if(result.length){
      return result;
    };
  };

  const createLegendNamesAndSymbols = () =>{
    const names = () =>{
      
      if(filterBySetups){
        return setupGroups.map(group => {
          return group.setup
        })
      }
      if((!filterBySetups && !filterByVariables) || filterByInstruments){
        return instrumentGroups.map(group => {
          return group.instrument
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
          fill: '#FFFFFF',
        };
      }

      return style;
    }, [selectedLegend]);

    return <VictoryLabel {...props} style={style} />;
  };

  const getAllInstrumentsData = () =>{
    setFilterByInstruments(true)
    let data = []
    
    instrumentGroups.forEach(g =>{
      //check if data is valid. Must not be undefined or null
      let checkValid = getTradesByInstrumentGroups(g.instrument)
      checkValid !== undefined && checkValid !== null && data.push(checkValid)
    })
    
    if(data.length){
      
      let result = data.map(d => d[0])
      setScatterData(result)
    }
    
  }

  
  const getAllSetupData = () =>{
    setFilterBySetups(true)
    let data = []
    
    setupGroups.forEach(g =>{
      //check if data is valid. Must not be undefined or null
      let checkValid = getTradesBySetupGroups(g.setup)
      checkValid !== undefined && checkValid !== null && data.push(checkValid)
    })
    
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
  },[scatterData])
  
  useEffect(()=>{
    
    instrumentGroups && createLegendNamesAndSymbols()
    instrumentGroups && trades && getAllInstrumentsData()
    setSelectedFilterTypeLegend('INSTRUMENTS')
  },[instrumentGroups, trades])
  
  useEffect(()=>{
    filterByInstruments && createLegendNamesAndSymbols()

  },[filterByInstruments])
  
  useEffect(()=>{
    filterBySetups && createLegendNamesAndSymbols()

  },[filterBySetups])

  useEffect(()=>{
    filterByVariables && createLegendNamesAndSymbols()
    
  },[filterByVariables, variableGroups])

  const filterTypeData = [
    {name: 'INSTRUMENTS', symbol: {fill: 'red'}},
    {name: 'SETUPS', symbol: {fill: 'skyblue'}},
    {name: 'VARIABLES', symbol: {fill: 'white'}},
  ]

  const MAX_WINRATE = 100;
  const MAX_R = 10;
  
  const yTickValues = [10, 20, 30, 40, 50, 60, 70, 80, 90 ,100]
  const xTickValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const chartMinDomain = { y: 0, x: 0 };
  const chartMaxDomain = { y: MAX_WINRATE, x: MAX_R };

  return(
    <div className="grid grid-cols-10 h-full ">
      <div className="h-6 w-full flex justify-center items-center col-span-full text-white text-xs  bg-striped-dark-alt">
          <span>ADVANCED REPORTS</span>
        </div>
      <div className=" col-span-10">
        
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
                  onClick:handleFilterClick 
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