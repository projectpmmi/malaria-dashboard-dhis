import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Admin from './Admin'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import GraphsData from './GraphsData'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const Content = () => {
    const classes = useStyles();
    const [redirect, setRedirect] = useState(false)
    const [orgUnit, setOrgUnit] = useState(null)
    const [period, setPeriod] = useState(null)
    const handleSubmit = () => {
        setRedirect(true)
    }
    const orgUnitSet = (orgUnit) => {
        setOrgUnit(orgUnit)
        console.log("==========Content orgUnit============== :" + orgUnit)
    }
    const periodSet = (period) => {
        setPeriod(period)
        console.log("==========Content period============== :" + period)
    }
    /* const redirectSet = (redirect) => {
        setRedirect(redirect)
    } */

    return (
        <Container fluid="true">
            <Row>
                <Col><Navbar /></Col>
            </Row>
            <Row>
                <Col>
                    {/* {console.log("==========Content orgUnit============== :"+orgUnit)} */}
                    <HashRouter >
                        <Switch>
                            <Route exact path="/" render={() => (
                                <Redirect to="/dashboard" />
                            )} />
                            <Route path="/admin" render={(props) => <Admin {...props} setOrgunit={orgUnitSet} setPeriod={periodSet} handleSubmit={handleSubmit} />} />
                            <Route path="/dashboard" render={(props) => <Dashboard {...props} setOrgunit={orgUnitSet} setPeriod={periodSet} handleSubmit={handleSubmit} />} />
                            <Route path="/graphsData" render={(props) => <GraphsData {...props} orgUnit={orgUnit} period={period} redirect={redirect} />} />
                        </Switch>
                    </HashRouter>
                </Col>
            </Row>

        </Container>
    );
}

export default Content;