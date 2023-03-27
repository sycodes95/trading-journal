import { useState, useEffect } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryArea, VictoryTheme, VictoryLabel, VictoryCandlestick } from 'victory';
import { ResponsiveLine } from "@nivo/line";

function PnlGraph ({trades}) {

  const [data, setData] = useState(null)

  const getData = () => {
    let newDataArr = []
    trades.forEach((trade, index) => {
      let x = index + 1;
      let y;
      index - 1 >= 0 
      ? y = newDataArr[index - 1].y + trade.fgl
      : y = trade.fgl
      newDataArr.push({ x, y }) 
    })
    setData([{ id: 'Pnl Graph', data: newDataArr}])
  }

  useEffect(()=>{
    trades && getData()
  },[trades])
  
  return(
    <div className="h-96 w-full">
      {
      data &&
      <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      enableGridX={false}
      enableGridY={false}
      xScale={{ type: 'point' }}
      yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false
      }}
      yFormat=" >-.2f"
      colors={{ scheme: 'set2' }}
      theme={{
        textColor: 'gray',
        fontSize: 10,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'TRADES',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'BALANCE',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      
      />
    }
    </div>
  )
}

export default PnlGraph;