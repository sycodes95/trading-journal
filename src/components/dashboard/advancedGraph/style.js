

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
      fill: '#FFFFFF',
    },
  },
  yaxis: {
    tickLabels: {
        fill: 'gray',
        fontSize: 3,
    },
    grid: {
        stroke: '#999999',
    },
    axisLabel: {
        fontSize: 4,
        padding: 5,
        fill: '#FFFFFF',
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
      fill: 'rgba(0,0,0,0.3)',
      width: 42,
      strokeDasharray: 2,
    },
    labels: {
      fill: '#FFFFFF',
      fontSize: 2.5,
      cursor: 'pointer',
      
    },
    title: {
      fill: '#FFFFFF',
      fontSize: 3,
      padding: 2,
    },
    maxWidth: 30,
    
    
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

export default styles;