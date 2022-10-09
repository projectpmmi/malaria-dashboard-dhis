import React, { useState } from 'react';
import RecursiveTreeView from './OrgUnitTree';
import DatePicker from './DatePicker';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { PencilSquare, Link45deg, HandIndex } from 'react-bootstrap-icons';
import Breadcrumb from 'react-bootstrap/Breadcrumb'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);


const Dashboard = (props) => {
    const [redirection, setRedirection] = useState(false);
    const [selectedValue, setSelectedValue] = React.useState(null);
    const classes = useStyles();

    const setOrgunit = (orgunit) => {
        console.log("===========Dashborad orgunit=================== :" + orgunit)
        props.setOrgunit(orgunit)
    };

    const setPeriod = (period) => {
        console.log("==============Dashborad period=============== : " + period)
        props.setPeriod(period)
        setSelectedValue(null)
    };

    const handleChange = (event) => {
        console.log("==============event.target.value=============== : " + event.target.value)
        setSelectedValue(event.target.value);
        props.setPeriod(event.target.value)
    };


    const renderRedirect = () => {
        if (redirection) {
            //console.log("redirection : "+redirection)
            return <Redirect to='/graphsData' />
        }
    }

    const handleSubmit = () => {
        setRedirection(true)
        props.handleSubmit()

    };


    return (
        <form  >
            
            <Row style={styles.grid} >

                <Col>
                    {renderRedirect()}
                    <Row>
                        <Col >
                            <h3 style={styles.header}> <HandIndex> </HandIndex> Selection of parameters</h3>
                        </Col>
                    </Row>
                    
                    <Row style={styles.grid}>


                        <Col>
                            <h6>Organisation unit</h6>
                            <div><RecursiveTreeView setOrgunit={setOrgunit} /></div>
                        </Col>
                        <Col>
                            <h6>Period</h6>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel
                                        value="LAST_12_MONTHS"
                                        control={<GreenRadio color="primary" />}
                                        label="Last 12 months"
                                        labelPlacement="start"
                                        checked={selectedValue === 'LAST_12_MONTHS'}
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel
                                        value="LAST_6_MONTHS"
                                        control={<GreenRadio color="primary" />}
                                        label="Last 6 months"
                                        labelPlacement="start"
                                        checked={selectedValue === 'LAST_6_MONTHS'}
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel
                                        value="LAST_3_MONTHS"
                                        control={<GreenRadio color="primary" />}
                                        label="Last 3 months"
                                        labelPlacement="start"
                                        checked={selectedValue === 'LAST_3_MONTHS'}
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel
                                        value="LAST_MONTHS"
                                        control={<GreenRadio color="primary" />}
                                        label="Last months"
                                        labelPlacement="start"
                                        checked={selectedValue === 'LAST_MONTHS'}
                                        onChange={handleChange}
                                    />

                                </RadioGroup>
                            </FormControl>
                        </Col>
                        <Col>
                            <DatePicker setPeriod={setPeriod} />
                        </Col>


                        <Col>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                //endIcon={<Icon>send</Icon>}
                                onClick={handleSubmit}
                            >
                                Submit
                        </Button>
                        </Col>

                    </Row>
                    
                </Col>
            </Row>
           
        </form>


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
    }
};

export default Dashboard;