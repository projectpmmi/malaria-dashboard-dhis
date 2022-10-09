import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Indicators from '../data/Indicators.json'
import { getData, deleteData, postData } from '../service/FecthingData'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { HandIndex } from 'react-bootstrap-icons';


//import Button from 'react-bootstrap/Button'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Indicator = (props) => {
  const classes = useStyles();

  const [radio, setRadio] = useState("");
  const [goup, setGroup] = useState(true);
  const [goupLabel, setGroupLabel] = useState("Data Element group");
  const [groupData, setGroupData] = useState([]);
  const [elt, setElt] = useState(true);
  const [eltValue, setEltValue] = useState();
  const [eltData, setEltData] = useState([]);
  const [eltLabel, setEltLabel] = useState("Data Element");
  const [dset, setDset] = useState(true);
  const [dsetValue, setDsetValue] = useState();
  const [dsetData, setDsetData] = useState([]);
  const [desg, setDesg] = useState(true);
  const [desgValue, setDesgValue] = useState();
  const [desgData, setDesgData] = useState([]);
  const [btn, setBtn] = useState(true);


  const radioChange = async (event) => {
    setGroup(false)
    setElt(true)
    setDset(true)
    setDesg(true)

    var lib = event.target.value
    setRadio(lib)
    if (lib === "DE") {
      setGroupLabel("Data Element group")
      setEltLabel("Data Element")
      var endpoint = "dataElementGroups.json?&paging=false"
      var resp = await getData(endpoint)
      setGroupData(resp.dataElementGroups)
    } else {
      setGroupLabel("Indicator group")
      setEltLabel("Indicator")
      var endpoint = "indicatorGroups.json?&paging=false"
      var resp = await getData(endpoint)
      setGroupData(resp.indicatorGroups)
    }
    //console.log("========value========"+event.target.value)
  }

  const groupChange = async (event, values) => {
    //console.log("========radio========"+radio)
    setElt(false)
    if (radio === "DE") {
      var endpoint = "dataElementGroups/" + values.id + ".json?fields=dataElements%5BdisplayName,id%5D"
      var resp = await getData(endpoint)
      setEltData(resp.dataElements)
    } else {
      var endpoint = "indicatorGroups/" + values.id + ".json?fields=indicators%5BdisplayName,id%5D"
      var resp = await getData(endpoint)
      setEltData(resp.indicators)
    }
  }

  const elementChange = async (event, values) => {
    setDset(false)
    setEltValue(values)
    if (radio === "DE") {
      var endpoint = (values)?"dataElements/" + values.id + ".json?fields=dataSets%5BdisplayName,id,periodType%5D,dataSetElements%5BdataSet%5BdisplayName,id,periodType%5D":null
      var resp = await getData(endpoint)
      console.log("========resp DE========" + JSON.stringify(resp))
      var arrayDataset = [resp.dataSetElements[0].dataSet]
      setDsetData(arrayDataset)
    } else {
      //Get numerator and denominator
      var endpoint = (values)?"indicators/" + values.id + ".json?fields=displayName,id,numerator,denominator":null
      var resp = await getData(endpoint)
      var indicator = filterElt(resp)
      //Get Dataset
      var endpoint = "dataSets.json?fields=displayName,id&filter=dataSetElements.dataElement.id:in:%" + indicator.numerator + "," + indicator.denominator + "%5D&paging=false"
      var resp = await getData(endpoint)
      console.log("========resp IND========" + JSON.stringify(resp))
      setDsetData(resp.dataSets)
    }

    setBtn(false)
  }

  const filterElt = (indicator) => {
    var numerator = indicator.numerator.substring(2, 13)
    var denominator = indicator.denominator.substring(2, 13)
    var ind = new Object()
    ind.numerator = numerator
    ind.denominator = denominator
    console.log('==========ind============' + ind)
    return ind
  }

  const datasetChange = async (event, values) => {
    setDesg(false)
    setDsetValue(values)

    var endpoint = "dataElementOperands.json?fields=displayName,id&filter=dataElement.id:eq:" + eltValue.id + "&paging=false"
    var resp = await getData(endpoint)
    setDesgData(resp.dataElementOperands)
    //setBtn(false)
  }

  const variableChange = async (event, values) => {
    setDesgValue(values)


  }

  const handleSubmit = async () => {
    console.log("==========props.id============" + props.id)
    console.log("==========eltValue============" + JSON.stringify(eltValue))
    console.log("==========dsetValue============" + JSON.stringify(dsetValue))
    console.log("==========dsetValue============" + JSON.stringify(dsetValue))
    console.log("==========desgValue============" + JSON.stringify(desgValue))

    var endpoint = "dataStore/qualitydashboard/settings"
    var resp = await getData(endpoint)
    var list = []
    resp.indicator.map((item) => {
      var dataObject = new Object();
      dataObject.id = item.id
      dataObject.name = item.name
      dataObject.type = item.type
      dataObject.uid = item.uid
      dataObject.code_group = item.code_group
      dataObject.uid = item.uid
      dataObject.name_dhis = item.name_dhis
      dataObject.dataSetID = item.dataSetID
      dataObject.dataSetName = item.dataSetName
      dataObject.dataElementOperandID = item.dataElementOperandID
      if (item.id === props.id) {
        if (radio === "DE") {
          dataObject.type = "dataElement"
        } else (
          dataObject.type = "indicator"
        )
        dataObject.uid = eltValue.id
        dataObject.name_dhis = eltValue.displayName
        dataObject.dataSetID = (dsetValue)?dsetValue.id:null
        dataObject.dataSetName = (dsetValue)?dsetValue.displayName:null
        dataObject.dataElementOperandID = desgValue
      }
      list.push(dataObject)
    })

    resp.indicator = list
    //console.log("==========resp Indicators============" + JSON.stringify(resp))
    await deleteData(endpoint)
    await postData(endpoint, resp)

    props.back()

  };

  return (

    <Row style={styles.grid} >
      <Col>
      <Row style={styles.grid}>
          <Col >
            <h3 style={styles.header}><HandIndex></HandIndex> Select Indicator or DataElement</h3>
          </Col>
        </Row>
        <Row style={styles.grid}>
        <Card>

          <Card.Body>
            <Row>
              <Col>
                <h6>Choose type of Indicator</h6>
                <RadioGroup
                  aria-label="Location"
                  name="location"
                  //className={classes.group}
                  //value={location}
                  onChange={radioChange}
                  row={true}
                >
                  <FormControlLabel value="DE" control={<Radio />} label="Data element" />
                  <FormControlLabel value="IN" control={<Radio />} label="Indicator" />
                </RadioGroup>
              </Col>
              <Col>
                <h6>Choose DataElements/Indicators group</h6>
                <Autocomplete
                  id="group"
                  options={groupData}
                  getOptionLabel={(option) => option.displayName}
                  style={{ width: 250 }}
                  disabled={goup}
                  onChange={groupChange}
                  renderInput={(params) => <TextField {...params} label={goupLabel} variant="outlined" />}
                />
              </Col>
              <Col>
                <h6>Choose dataElement/Indicator</h6>
                <Autocomplete
                  id="element"
                  options={eltData}
                  getOptionLabel={(option) => option.displayName}
                  style={{ width: 250 }}
                  disabled={elt}
                  onChange={elementChange}
                  renderInput={(params) => <TextField {...params} label={eltLabel} variant="outlined" />}
                />
              </Col>

              <Col>
                <h6>Choose dataset</h6>
                <Autocomplete
                  id="dataset"
                  options={dsetData}
                  getOptionLabel={(option) => option.displayName}
                  style={{ width: 250 }}
                  disabled={dset}
                  onChange={datasetChange}
                  renderInput={(params) => <TextField {...params} label="Data set" variant="outlined" />}
                />
              </Col>
              <Col>
                <h6>Choose variable</h6>
                <Autocomplete
                  id="variable"
                  options={desgData}
                  getOptionLabel={(option) => option.displayName}
                  style={{ width: 250 }}
                  disabled={desg}
                  onChange={variableChange}
                  renderInput={(params) => <TextField {...params} label="Variable" variant="outlined" />}
                />

              </Col>

            </Row>
            <Row>


            </Row>
          </Card.Body>
          <Card.Footer>
            <Col style={styles.foot}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                //endIcon={<Icon>send</Icon>}
                disabled={btn}
                onClick={handleSubmit}
              >
                Submit
                  </Button>
            </Col>
          </Card.Footer>
        </Card>
        </Row>
      </Col>
    </Row>

  );
}


const styles = {
  grid: {
    paddingLeft: 10,
    paddingRight: 10
  },
  header: {
    justifyContent: 'center',
    display: 'flex',
    background: '#F9F2F2',
    //border:'outset',
    marginTop: 10,
    marginBottom: 20
  },
  foot:{
    justifyContent: 'rigth',
    display: 'flex'
  },
  column: {
    width: 100
  }
};

export default Indicator;