import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import * as Highcharts from 'highcharts';



const CompletudeCharts = (props) => {


  const options = {
    chart: {
        renderTo: 'chart',
        type: 'column'
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
        name:  props.period,
        data:  props.rows
      }]
  };

  console.log("===========props.headers stringify========"+JSON.stringify(props.headers))
  console.log("===========props.rows stringify========"+JSON.stringify(props.rows))

    return ( 

        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
     );
}
 
export default CompletudeCharts;