import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import * as Highcharts from 'highcharts';



const CompletudeLine = (props) => {


  const options = {
    chart: {
        renderTo: 'chart',
        type: 'line'
      },
      title: {
        text: props.name
      },
      xAxis: {
        categories: props.headers
      },
      yAxis: {
        title: 'Value'
      },
      series: [{
        name: 'Completeness',
        data:  props.rows
      }]
  };

  console.log("===========props.headers Line========"+JSON.stringify(props.headers))
  console.log("===========props.rows Line========"+JSON.stringify(props.rows))

    return ( 

        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
     );
}
 
export default CompletudeLine;