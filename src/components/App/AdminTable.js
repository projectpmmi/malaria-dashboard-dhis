import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
//import Indicators from '../data/Indicators.json'
import { getData } from '../service/FecthingData'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { PencilSquare,Link45deg } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button'
import { color } from 'highcharts';
import Form from 'react-bootstrap/Form'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const init = async () => {
  var endpoint = "dataStore/qualitydashboard/settings"
  var resp = await getData(endpoint)
  if (resp.status === 'ERROR') {
    console.error(resp.message)
    return []
  }
  //console.log("==========resp============"+JSON.stringify(resp))
  return resp.data

}

const data = async () => {
  var indicators = await init()
  var list = []
  indicators.indicator.map((item) => {
    var dataObject = new Object();
    dataObject.id = item.id
    dataObject.name = item.name
    dataObject.type = item.type
    dataObject.uid = item.uid
    dataObject.name_dhis = item.name_dhis
    dataObject.dataSetID = item.dataSetID
    dataObject.dataSetName = item.dataSetName
    dataObject.dataElementOperandID = item.dataElementOperandID
    dataObject.code_group = item.code_group
    var group = indicators.groups.filter(set => set.code === item.code_group)
    dataObject.groupName = group[0].name
    list.push(dataObject)
  }
  )
  //console.log("==========list============" + JSON.stringify(list))
  return list
};

const AdminTable = (props) => {
  const [rows, setRows] = useState([]);

  const classes = useStyles();

  const onChoice = (id) => {
    //console.log("========id==========="+id)
    props.onChoice(id)
  }

  useEffect(() => {
    //console.log("==========data============"+data())
    async function load() {
      setRows(await data())
    }
    load()
  }, [])

  return (
    <Row style={styles.grid}>
      <Col>
        <Row>
          <Col >
            <h3 style={styles.header}><Link45deg></Link45deg>Mapping of Reference indicators/DataElements</h3>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover size="sm" >
              <thead>
                <tr>
                  <th>Group</th>
                  <th>Reference</th>
                  <th>Data element/indicator</th>
                  <th>Dataset</th>
                  <th style={styles.column}>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* console.log("==========rows============" + JSON.stringify(rows)) */}
                {rows.map((row) => (
                  <tr >
                    <td>
                      {row.groupName}
                    </td>
                    <td>{row.name}</td>
                    <td>{row.name_dhis}</td>
                    <td>{row.dataSetName}</td>
                    <td >
                      <Button onClick={() => onChoice(row.id)} variant="success"><PencilSquare></PencilSquare> Edit</Button>
                    </td>
                  </tr>
                ))
                }
              </tbody>
            </Table>
          </Col>
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
  header:{
    justifyContent:  'center',
    display: 'flex',
    background:'#F9F2F2',
    //border:'outset',
    marginTop: 10,
    marginBottom: 20
  },
  column :{
    width:100 
  }
};

export default AdminTable;