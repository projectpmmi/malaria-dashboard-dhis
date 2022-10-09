import React from "react";
import Grid from "@material-ui/core/Grid";
import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);

const LineGraph = (props) => {
  const chart = React.createRef();

  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: props.titre,
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      categories: props.headers,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Value",
      },
    },
    tooltip: {
      headerFormat:
        '<div><span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
      footerFormat: "</table></div>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: props.series,
  };

  //console.log("===========props.headers stringify========"+JSON.stringify(props.headers))
  //console.log("===========props.series stringify========"+JSON.stringify(props.series))

  return (
    <div>
      <Grid component="p">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chart}
        />
      </Grid>
    </div>
  );
};

export default LineGraph;
