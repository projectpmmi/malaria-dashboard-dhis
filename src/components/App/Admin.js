import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from './AdminTable'
import Indicator from '../ManageIndicator/Indicator'
import { getData, postData } from '../service/FecthingData'
import Indicators from '../data/Indicators.json'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conf: false,
            id: null,
            spinner: true
        }
        this.onChoice = this.onChoice.bind(this)
        this.back = this.back.bind(this)
    }

    async init() {
        var endpoint = "dataStore/qualitydashboard/settings"
        var resp = await getData(endpoint)
        //resp.then(res => res)
        //.catch(err =>console.log("err :"+err))
        //console.log("==========resp============"+JSON.stringify(resp))

        if (resp.httpStatusCode === 404) {
            await postData(endpoint, Indicators)
        }

        this.setState({
            spinner: false
        })

    }

    componentDidMount() {
        this.init()
    }

    onChoice(id) {
        this.setState({
            conf: true,
            id: id
        })
    }

    back() {
        this.setState({
            conf: false
        })
    }

    render() {

        if (this.state.spinner === true) {
            return (
                <Row>
                    <Col style={styles.spinner}>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            )
        }
        if (this.state.conf === false) {

            return (
                <Row>
                    <Col>
                        <Table onChoice={this.onChoice} />
                    </Col>
                </Row>


            );
        } else {
            console.log("========this.state.conf===========" + this.state.conf)
            return (
                <Row>
                    <Col>
                        <Indicator id={this.state.id} back={this.back} />
                    </Col>
                </Row>
            );
        }

    }
}

const styles = {
    spinner: {
      justifyContent:  'center',
      display: 'flex',
      padding:200,
    }
  };


export default Admin;