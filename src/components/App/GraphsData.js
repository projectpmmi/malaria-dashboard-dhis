import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import {
  getDataElement,
  makeDataElement,
  makeDataStore,
  getWHODatastore,
} from "../service/FecthingData";
import DatastoreData from "../data/DatastoreData.json";
import CompletudeLineJson from "../data/Completude.json";
import CompletudeWHO from "../data/CompletudeWHO.json";
import {
  getIndicatorsID,
  getMetadata,
  getGraphDataG1,
  transformDataG1,
  getGraphDataG2,
  transformDataG2,
  getGraphDataG3,
  transformDataG3,
} from "../service/ServiceDataGraph";
import Graph from "../service/Graph";
import LineGraph from "../service/LineGraph";
import CompletudeLine from "../service/CompletudeLine";
import Typography from "@material-ui/core/Typography";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const GraphsData = (props) => {
  const [spinner, setSpinner] = useState(true);
  const [headers11, setHeaders11] = useState([]);
  const [series11, setSeries11] = useState([]);
  const [headers12, setHeaders12] = useState([]);
  const [series12, setSeries12] = useState([]);
  const [headers13, setHeaders13] = useState([]);
  const [series13, setSeries13] = useState([]);
  const [name1, setName1] = useState();
  const [titre1, setTitre1] = useState();

  const [headers21, setHeaders21] = useState([]);
  const [series21, setSeries21] = useState([]);
  const [headers22, setHeaders22] = useState([]);
  const [series22, setSeries22] = useState([]);
  const [headers23, setHeaders23] = useState([]);
  const [series23, setSeries23] = useState([]);
  const [name2, setName2] = useState();
  const [titre2, setTitre2] = useState();

  const [headers31, setHeaders31] = useState([]);
  const [series31, setSeries31] = useState([]);
  const [headers32, setHeaders32] = useState([]);
  const [series32, setSeries32] = useState([]);
  const [headers33, setHeaders33] = useState([]);
  const [series33, setSeries33] = useState([]);
  const [name3, setName3] = useState();
  const [titre3, setTitre3] = useState();

  const [headers41, setHeaders41] = useState([]);
  const [series41, setSeries41] = useState([]);
  const [headers42, setHeaders42] = useState([]);
  const [series42, setSeries42] = useState([]);
  const [headers43, setHeaders43] = useState([]);
  const [series43, setSeries43] = useState([]);
  const [name4, setName4] = useState();
  const [titre4, setTitre4] = useState();

  const [headers51, setHeaders51] = useState([]);
  const [series51, setSeries51] = useState([]);
  const [headers52, setHeaders52] = useState([]);
  const [series52, setSeries52] = useState([]);
  const [headers53, setHeaders53] = useState([]);
  const [series53, setSeries53] = useState([]);
  const [name5, setName5] = useState();
  const [titre5, setTitre5] = useState();

  const [headers61, setHeaders61] = useState([]);
  const [series61, setSeries61] = useState([]);
  const [headers62, setHeaders62] = useState([]);
  const [series62, setSeries62] = useState([]);
  const [headers63, setHeaders63] = useState([]);
  const [series63, setSeries63] = useState([]);
  const [name6, setName6] = useState();
  const [titre6, setTitre6] = useState();

  const getPeriodLabel = (period) => {
    switch (period) {
      case "LAST_12_MONTHS":
        return "Les 12 derniers mois";
      case "LAST_6_MONTHS":
        return "Les 6 derniers mois";
      case "LAST_3_MONTHS":
        return "Les 3 derniers mois";
      case "LAST_MONTH":
        return "le mois derniers";
      default:
        return period.substring(4, 6) + "-" + period.substring(0, 4);
    }
  };

  const groupeIndicator1 = async (listElements, groupeId) => {
    var listUIDG1 = getIndicatorsID(listElements, groupeId);
    //=============props.orgUnit is org unit with level====================
    var dataGraph = new Object();
    if (listUIDG1 != "") {
      let indicator = await listElements.indicator.filter(
        (elt) => elt.code_group === groupeId
      );
      //console.log("===========indicator==========" + JSON.stringify(indicator));
      var group1Data1 = await getGraphDataG1(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      //console.log("===========group1Data=========="+JSON.stringify(group1Data1))
      var dataG1 = await transformDataG1(group1Data1, indicator);

      dataGraph.headers1 = await dataG1.headers;
      dataGraph.series1 = await dataG1.series;
      //setHeaders11(await dataG1.headers)
      //setSeries11(await dataG1.series)
      //console.log("===========dataG1==========" + JSON.stringify(dataG1));

      var group1Data2 = await getGraphDataG2(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      var dataG2 = await transformDataG2(group1Data2, indicator);
      dataGraph.headers2 = await dataG2.headers;
      dataGraph.series2 = await dataG2.series;
      //setHeaders12(await dataG2.headers)
      //setSeries12(await dataG2.series)
      //console.log("===========dataG12=========="+JSON.stringify(dataG12))
      var group1Data3 = await getGraphDataG3(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      var dataG3 = await transformDataG3(group1Data3, indicator);
      //console.log("===========dataG3==========" + JSON.stringify(dataG3));
      dataGraph.headers3 = await dataG3.headers;
      dataGraph.series3 = await dataG3.series;
      //setHeaders13(await dataG3.headers)
      //setSeries13(await dataG3.series)
    }
    //dataGraph.name="Malaria Drugs/products distributed"
    //setName1("Malaria Drugs/products distributed")
    let group = await listElements.groups.filter(
      (elt) => elt.code === groupeId
    );
    dataGraph.name = await group[0].name;
    dataGraph.titre = group[0].titre + " pour " + getPeriodLabel(props.period);
    return dataGraph;
  };

  const groupeIndicator2 = async (listElements, groupeId) => {
    var listUIDG1 = getIndicatorsID(listElements, groupeId);
    //console.log("=========G2 listUIDG1==========" + JSON.stringify(listUIDG1));
    var dataGraph = new Object();

    if (listUIDG1 != "") {
      let indicator = await listElements.indicator.filter(
        (elt) => elt.code_group === groupeId
      );
      var group1Data1 = await getGraphDataG1(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      //await console.log("===========G1 group1Data=========="+JSON.stringify(group1Data1))
      var dataG1 = await transformDataG1(group1Data1, indicator);
      dataGraph.headers1 = await dataG1.headers;
      dataGraph.series1 = await dataG1.series;
      //setHeaders21(await dataG1.headers)
      //setSeries21(await dataG1.series)
      //console.log("===========dataG1=========="+JSON.stringify(dataG1))

      var group1Data2 = await getGraphDataG2(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      //console.log("=======G2 group2Data========" + JSON.stringify(group1Data2));
      var dataG2 = await transformDataG2(group1Data2, indicator);
      //console.log("======G1 dataG2==========" + JSON.stringify(dataG2));
      dataGraph.headers2 = await dataG2.headers;
      dataGraph.series2 = await dataG2.series;
      //setHeaders22(await dataG2.headers)
      //setSeries22(await dataG2.series)
      //console.log("===========dataG12=========="+JSON.stringify(dataG12))
      var group1Data3 = await getGraphDataG3(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      var dataG3 = await transformDataG3(group1Data3, indicator);
      dataGraph.headers3 = await dataG3.headers;
      dataGraph.series3 = await dataG3.series;
      //console.log("===========dataG3=========="+JSON.stringify(dataG3))
      //setHeaders23(await dataG3.headers)
      //setSeries23(await dataG3.series)
    }
    //setName2("Malaria testing")
    //dataGraph.name="Malaria testing"
    let group = await listElements.groups.filter(
      (elt) => elt.code === groupeId
    );
    dataGraph.name = await group[0].name;
    dataGraph.titre = group[0].titre + " pour " + getPeriodLabel(props.period);
    return dataGraph;
  };

  const groupeIndicator3 = async (listElements, groupeId) => {
    var listUIDG1 = getIndicatorsID(listElements, groupeId);
    var dataGraph = new Object();
    if (listUIDG1 != "") {
      let indicator = await listElements.indicator.filter(
        (elt) => elt.code_group === groupeId
      );
      var group1Data1 = await getGraphDataG1(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      //console.log("===========group1Data=========="+JSON.stringify(group1Data1))
      var dataG1 = await transformDataG1(group1Data1, indicator);
      dataGraph.headers1 = await dataG1.headers;
      dataGraph.series1 = await dataG1.series;
      //setHeaders31(await dataG1.headers)
      //setSeries31(await dataG1.series)
      //console.log("===========dataG1=========="+JSON.stringify(dataG1))

      var group1Data2 = await getGraphDataG2(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      var dataG2 = await transformDataG2(group1Data2, indicator);
      dataGraph.headers2 = await dataG2.headers;
      dataGraph.series2 = await dataG2.series;
      //setHeaders32(await dataG2.headers)
      //setSeries32(await dataG2.series)
      //console.log("===========dataG12=========="+JSON.stringify(dataG12))
      var group1Data3 = await getGraphDataG3(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      var dataG3 = await transformDataG3(group1Data3, indicator);
      dataGraph.headers3 = await dataG3.headers;
      dataGraph.series3 = await dataG3.series;
      //console.log("===========dataG3=========="+JSON.stringify(dataG3))
      //setHeaders33(await dataG3.headers)
      //setSeries33(await dataG3.series)
    }
    //setName3("Malaria cases")
    //dataGraph.name="Malaria cases"
    let group = await listElements.groups.filter(
      (elt) => elt.code === groupeId
    );
    dataGraph.name = await group[0].name;
    dataGraph.titre = group[0].titre + " pour " + getPeriodLabel(props.period);
    return dataGraph;
  };

  const groupeIndicator4 = async (listElements, groupeId) => {
    var listUIDG1 = getIndicatorsID(listElements, groupeId);
    var dataGraph = new Object();
    if (listUIDG1 != "") {
      let indicator = await listElements.indicator.filter(
        (elt) => elt.code_group === groupeId
      );
      var group1Data1 = await getGraphDataG1(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      //console.log("===========group1Data=========="+JSON.stringify(group1Data1))
      var dataG1 = await transformDataG1(group1Data1, indicator);
      dataGraph.headers1 = await dataG1.headers;
      dataGraph.series1 = await dataG1.series;
      //setHeaders41(await dataG1.headers)
      //setSeries41(await dataG1.series)
      //console.log("===========dataG1=========="+JSON.stringify(dataG1))

      var group1Data2 = await getGraphDataG2(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      var dataG2 = await transformDataG2(group1Data2, indicator);
      dataGraph.headers2 = await dataG2.headers;
      dataGraph.series2 = await dataG2.series;

      //setHeaders42(await dataG2.headers)
      //setSeries42(await dataG2.series)
      //console.log("===========dataG12=========="+JSON.stringify(dataG12))
      var group1Data3 = await getGraphDataG3(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      var dataG3 = await transformDataG3(group1Data3, indicator);
      dataGraph.headers3 = await dataG3.headers;
      dataGraph.series3 = await dataG3.series;
      //console.log("===========dataG3=========="+JSON.stringify(dataG3))
      //setHeaders43(await dataG3.headers)
      //setSeries43(await dataG3.series)
    }
    //setName4("Malaria treatment")
    //dataGraph.name="Malaria treatment"
    let group = await listElements.groups.filter(
      (elt) => elt.code === groupeId
    );
    dataGraph.name = group[0] ? await group[0].name : null;
    dataGraph.titre = group[0]
      ? group[0].titre + " pour " + getPeriodLabel(props.period)
      : null;

    return dataGraph;
  };

  const groupeIndicator5 = async (listElements, groupeId) => {
    var listUIDG1 = getIndicatorsID(listElements, groupeId);
    var dataGraph = new Object();
    if (listUIDG1 != "") {
      let indicator = await listElements.indicator.filter(
        (elt) => elt.code_group === groupeId
      );
      var group1Data1 = await getGraphDataG1(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      //console.log("===========group1Data=========="+JSON.stringify(group1Data1))
      var dataG1 = await transformDataG1(group1Data1, indicator);
      dataGraph.headers1 = await dataG1.headers;
      dataGraph.series1 = await dataG1.series;
      //setHeaders51(await dataG1.headers)
      //setSeries51(await dataG1.series)
      //console.log("===========dataG1=========="+JSON.stringify(dataG1))

      var group1Data2 = await getGraphDataG2(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      var dataG2 = await transformDataG2(group1Data2, indicator);
      dataGraph.headers2 = await dataG2.headers;
      dataGraph.series2 = await dataG2.series;
      //setHeaders52(await dataG2.headers)
      //setSeries52(await dataG2.series)
      //console.log("===========dataG12=========="+JSON.stringify(dataG12))
      var group1Data3 = await getGraphDataG3(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      var dataG3 = await transformDataG3(group1Data3, indicator);
      dataGraph.headers3 = await dataG3.headers;
      dataGraph.series3 = await dataG3.series;
      //console.log("===========dataG3=========="+JSON.stringify(dataG3))
      //setHeaders53(await dataG3.headers)
      //setSeries53(await dataG3.series)
    }
    //setName5("Malaria commodity availability")
    //dataGraph.name="Malaria commodity availability"
    let group = await listElements.groups.filter(
      (elt) => elt.code === groupeId
    );
    dataGraph.name = group[0] ? await group[0].name : null;
    dataGraph.titre = group[0]
      ? group[0].titre + " pour " + getPeriodLabel(props.period)
      : null;
    return dataGraph;
  };

  const groupeIndicator6 = async (listElements, groupeId) => {
    var listUIDG1 = getIndicatorsID(listElements, groupeId);
    var dataGraph = new Object();
    if (listUIDG1 != "") {
      let indicator = await listElements.indicator.filter(
        (elt) => elt.code_group === groupeId
      );
      var group1Data1 = await getGraphDataG1(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      //console.log("===========group1Data=========="+JSON.stringify(group1Data1))
      var dataG1 = await transformDataG1(group1Data1, indicator);
      dataGraph.headers1 = await dataG1.headers;
      dataGraph.series1 = await dataG1.series;
      //setHeaders61(await dataG1.headers)
      //setSeries61(await dataG1.series)
      //console.log("===========dataG1=========="+JSON.stringify(dataG1))

      var group1Data2 = await getGraphDataG2(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      var dataG2 = await transformDataG2(group1Data2, indicator);
      dataGraph.headers2 = await dataG2.headers;
      dataGraph.series2 = await dataG2.series;
      //setHeaders62(await dataG2.headers)
      //setSeries62(await dataG2.series)
      //console.log("===========dataG12=========="+JSON.stringify(dataG12))
      var group1Data3 = await getGraphDataG3(
        listUIDG1,
        props.orgUnit,
        props.period
      );
      var dataG3 = await transformDataG3(group1Data3, indicator);
      dataGraph.headers3 = await dataG3.headers;
      dataGraph.series3 = await dataG3.series;
      //console.log("===========dataG3=========="+JSON.stringify(dataG3))
      //setHeaders63(await dataG3.headers)
      //setSeries63(await dataG3.series)
    }
    //setName6("Malaria mortality")
    //dataGraph.name="Malaria mortality"
    let group = await listElements.groups.filter(
      (elt) => elt.code === groupeId
    );
    dataGraph.name = group[0] ? await group[0].name : null;
    dataGraph.titre = group[0]
      ? group[0].titre + " pour " + getPeriodLabel(props.period)
      : null;
    return dataGraph;
  };

  const makeData = async () => {
    let listElements = await getMetadata();
    let dataGraph1 = await groupeIndicator1(listElements, "G1");
    let dataGraph2 = await groupeIndicator2(listElements, "G2");
    let dataGraph3 = await groupeIndicator3(listElements, "G3");
    let dataGraph4 = await groupeIndicator4(listElements, "G4");
    let dataGraph5 = await groupeIndicator5(listElements, "G5");
    let dataGraph6 = await groupeIndicator6(listElements, "G6");

    setHeaders11(await dataGraph1.headers1);
    setSeries11(await dataGraph1.series1);
    setHeaders12(await dataGraph1.headers2);
    setSeries12(await dataGraph1.series2);
    setHeaders13(await dataGraph1.headers3);
    setSeries13(await dataGraph1.series3);
    //await console.log('==========await dataGraph1.name===========',await dataGraph1.name)
    setName1(await dataGraph1.name);
    setTitre1(await dataGraph1.titre);

    setHeaders21(await dataGraph2.headers1);
    setSeries21(await dataGraph2.series1);
    setHeaders22(await dataGraph2.headers2);
    setSeries22(await dataGraph2.series2);
    setHeaders23(await dataGraph2.headers3);
    setSeries23(await dataGraph2.series3);
    setName2(await dataGraph2.name);
    setTitre2(await dataGraph2.titre);

    setHeaders31(await dataGraph3.headers1);
    setSeries31(await dataGraph3.series1);
    setHeaders32(await dataGraph3.headers2);
    setSeries32(await dataGraph3.series2);
    setHeaders33(await dataGraph3.headers3);
    setSeries33(await dataGraph3.series3);
    setName3(await dataGraph3.name);
    setTitre3(await dataGraph3.titre);

    setHeaders41(await dataGraph4.headers1);
    setSeries41(await dataGraph4.series1);
    setHeaders42(await dataGraph4.headers2);
    setSeries42(await dataGraph4.series2);
    setHeaders43(await dataGraph4.headers3);
    setSeries43(await dataGraph4.series3);
    setName4(await dataGraph4.name);
    setTitre4(await dataGraph4.titre);

    setHeaders51(await dataGraph5.headers1);
    setSeries51(await dataGraph5.series1);
    setHeaders52(await dataGraph5.headers2);
    setSeries52(await dataGraph5.series2);
    setHeaders53(await dataGraph5.headers3);
    setSeries53(await dataGraph5.series3);
    setName5(await dataGraph5.name);
    setTitre5(await dataGraph5.titre);

    setHeaders61(await dataGraph6.headers1);
    setSeries61(await dataGraph6.series1);
    setHeaders62(await dataGraph6.headers2);
    setSeries62(await dataGraph6.series2);
    setHeaders63(await dataGraph6.headers3);
    setSeries63(await dataGraph6.series3);
    setName6(await dataGraph6.name);
    setTitre6(await dataGraph6.titre);
    setSpinner(false);
  };

  useEffect(() => {
    //console.log("==========data============"+data())
    async function load() {
      await makeData();
    }
    load();
  }, []);

  if (spinner === true) {
    return (
      <Row>
        <Col style={styles.spinner}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Typography component="h6" variant="h6" color="primary" align="center">
        {name1}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Graph
            headers={headers11}
            series={series11}
            name={name1}
            titre={titre1}
            period={props.period}
          />
        </Grid>
        <Grid item xs={4}>
          <Graph
            headers={headers12}
            series={series12}
            name={name1}
            titre={titre1}
            period={props.period}
          />
        </Grid>
        <Grid item xs={4}>
          <LineGraph
            headers={headers13}
            series={series13}
            name={name1}
            titre={titre1}
            period={props.period}
          />
        </Grid>
      </Grid>

      <Typography component="h6" variant="h6" color="primary" align="center">
        {name2}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Graph
            headers={headers21}
            series={series21}
            name={name2}
            titre={titre2}
            period={props.period}
          />
        </Grid>
        <Grid item xs={4}>
          <Graph
            headers={headers22}
            series={series22}
            name={name2}
            titre={titre2}
            period={props.period}
          />
        </Grid>
        <Grid item xs={4}>
          <LineGraph
            headers={headers23}
            series={series23}
            name={name2}
            titre={titre2}
            period={props.period}
          />
        </Grid>
      </Grid>

      <Typography component="h6" variant="h6" color="primary" align="center">
        {name3}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Graph
            headers={headers31}
            series={series31}
            name={name3}
            titre={titre3}
            period={props.period}
          />
        </Grid>
        <Grid item xs={4}>
          <Graph
            headers={headers32}
            series={series32}
            name={name3}
            titre={titre3}
            period={props.period}
          />
        </Grid>
        <Grid item xs={4}>
          <LineGraph
            headers={headers33}
            series={series33}
            name={name3}
            titre={titre3}
            period={props.period}
          />
        </Grid>
      </Grid>

      <Typography component="h6" variant="h6" color="primary" align="center">
        {name4}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Graph
            headers={headers41}
            series={series41}
            name={name4}
            titre={titre4}
            period={props.period}
          />
        </Grid>
        <Grid item xs={4}>
          <Graph
            headers={headers42}
            series={series42}
            name={name4}
            titre={titre4}
            period={props.period}
          />
        </Grid>
        <Grid item xs={4}>
          <LineGraph
            headers={headers43}
            series={series43}
            name={name4}
            titre={titre4}
            period={props.period}
          />
        </Grid>
      </Grid>

      <Typography component="h6" variant="h6" color="primary" align="center">
        {name5}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Graph
            headers={headers51}
            series={series51}
            name={name5}
            titre={titre5}
            period={props.period}
          />
        </Grid>
        <Grid item xs={4}>
          <Graph
            headers={headers52}
            series={series52}
            name={name5}
            titre={titre5}
            period={props.period}
          />
        </Grid>
        <Grid item xs={4}>
          <LineGraph
            headers={headers53}
            series={series53}
            name={name5}
            titre={titre5}
            period={props.period}
          />
        </Grid>
      </Grid>

      <Typography component="h6" variant="h6" color="primary" align="center">
        {name6}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Graph
            headers={headers61}
            series={series61}
            name={name6}
            titre={titre6}
            period={props.period}
          />
        </Grid>
        <Grid item xs={4}>
          <Graph
            headers={headers62}
            series={series62}
            name={name6}
            titre={titre6}
            period={props.period}
          />
        </Grid>
        <Grid item xs={4}>
          <LineGraph
            headers={headers63}
            series={series63}
            name={name6}
            titre={titre6}
            period={props.period}
          />
        </Grid>
      </Grid>
    </>
  );
};

const styles = {
  spinner: {
    justifyContent: "center",
    display: "flex",
    padding: 200,
  },
};

export default GraphsData;
