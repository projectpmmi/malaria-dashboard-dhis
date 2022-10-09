import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import {getDataElement,makeDataElement,makeDataStore,getWHODatastore} from '../service/FecthingData'
import DatastoreData from '../data/DatastoreData.json'
import CompletudeLineJson from '../data/Completude.json'
import CompletudeWHO from '../data/CompletudeWHO.json'
import  {getDataElementList,getDataValues,getDataGraphBtn,getDataGraphLine,getDataLine} from '../service/ManageData'
import CompletudeChart from '../service/CompletudeChart'
import CompletudeLine from '../service/CompletudeLine'

const getYYYYMM = (date)=>{
    date=(date==null)?new Date():date;
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : ('0' + month);
    return (year+month)
}

const Charts = (props) => {
    const [headers, setHeaders] =  useState();
    const [rows, setRows] =  useState(); 
    const [lineHead, setLineHead] =  useState();
    const [lineValues, setLineValues] =  useState(); 
    const [name, setName] =  useState(); 

    const setDatastore = async () => {
        const dataStore=await getWHODatastore()
        //console.log("========dataStore============= : "+JSON.stringify(dataStore))
        const dataEltList= await getDataElementList(dataStore); 
        const datavalues= await getDataValues(props.orgUnit,dataEltList,getYYYYMM(props.period)); 
        console.log("=======datavalues plus======"+JSON.stringify(datavalues) )        
        //const valueJson=await datavalues[0].valueJson
        //console.log("=======valueJson======"+JSON.stringify(valueJson.headers) )       
        await setHeaders(await datavalues[0].value_rows)
        await setRows(datavalues[0].value_jason)

        const dataLine= await getDataLine(props.orgUnit,dataEltList,getYYYYMM(props.period));
        await setLineHead (await dataLine[0].pe)
        await setLineValues(await dataLine[0].value)

        setName( datavalues[0].datasetName+" Completeness ")
        await makeDataStore(dataEltList,datavalues,dataLine)
        
    }
    
    useEffect( () => {
       // console.log("======== useEffect props.orgunit============= : "+props.orgunit)
       setDatastore()    
       //getDataGraphBtn(CompletudeWHO)
       //getDataGraphLine(CompletudeLine)
      },[]); 
      
    //console.log("========CHarts props.period========== : "+props.period)
    //console.log("========CHarts props.orgUnit============= : "+props.orgUnit)
    //console.log("getDataElement : "+getDataElement(DatastoreData))
    //console.log("MapDataElement : "+makeDataElement(DatastoreData)[0].numerateur)
    
    return ( 
        <>
       
            <Grid container spacing={2}>                            
               
                <Grid item >
                      <CompletudeChart headers={headers} rows={rows} name={name} period={getYYYYMM(props.period)}/> 
                </Grid>
                <Grid item >
                      <CompletudeLine headers={lineHead} rows={lineValues} name={name} /> 
                </Grid>
            </Grid>
        </>
     );
}
 
export default Charts;