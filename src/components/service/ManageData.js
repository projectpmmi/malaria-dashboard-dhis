import React, { useState, useEffect } from 'react'
import CompletudeWHO from '../data/CompletudeWHO.json'
import CompletudeLine from '../data/Completude.json'
import {getCompletudeData,getOrganisationUnit,getCompletudeGraphBtn,getCompletudeGraphLine} from './FecthingData'
import OrgUnitName from '../data/OrgUnitName.json'


export const getDataElementList=(DatastoreData) => {
    var numerateur=DatastoreData.numerators.filter(num=>num.dataID!=null)
    var dataElementMap=[];
    numerateur.map((item)=>{
        var dataElement=new Object();
        dataElement.dataEltUID=item.dataID
        dataElement.dataEltName=item.definition
        dataElement.datasetUID=item.dataSetID
        dataElement.datasetName=getDatasetname(item.dataSetID,DatastoreData)
        //dataElement.uid_ind=item.dataID
        //dataElement.name_ind=item.dataID
        dataElement.numerateur=item.definition
        dataElementMap.push(dataElement)
    })
    return(dataElementMap)
}

export const getDatasetname=(dataSetID,DatastoreData)=>{
    var dataset= DatastoreData.dataSets.filter(set=>set.id===dataSetID)
    var name=(dataset[0]!=null || dataset[0]!=undefined)?dataset[0].name:null
    return name
}

export const getDataValues= async (ouUID,dataElementList,period) => {
    console.log('========getDataValues ouUID======='+ouUID)
    //console.log('========period======='+period)
    //console.log('========dataElementList======='+dataElementList)
    var ouLevel= await getOULevel(ouUID)
    console.log('========ouLevel======='+ouLevel)
    var dataValuesMap=[];
    
    for (var i = 0, c = dataElementList.length; i < c; i++) {
        var item =dataElementList[i]
        var datavalue=new Object();
        datavalue.ouUID=ouUID;
        datavalue.datasetUID=item.datasetUID
        datavalue.datasetName=item.datasetName
        datavalue.period=period
        var completudeData= await getCompletudeGraphBtn(ouUID,item.datasetUID,period)
        var valueJson=getDataGraphBtn(completudeData)
        datavalue.value_rows=valueJson.value_rows
        datavalue.value_jason=valueJson.value_jason
        //console.log('=======transformeDataValue========'+JSON.stringify(transformeDataValue(dataChart)))
        console.log('=======datavalue========'+JSON.stringify(datavalue))
        dataValuesMap.push(datavalue) 
        //console.log('========dataValuesMap in ======='+JSON.stringify(dataValuesMap))           
    }

    //console.log('========dataValuesMap out======='+JSON.stringify(dataValuesMap))
    return dataValuesMap
}

export const getDataLine= async (ouUID,dataElementList,period) => {
    console.log('========getDataValues ouUID======='+ouUID)
    var ouLevel= await getOULevel(ouUID)
    console.log('========ouLevel======='+ouLevel)
    var dataValuesMap=[];
    
    for (var i = 0, c = dataElementList.length; i < c; i++) {
        var item =dataElementList[i]
        var datavalue=new Object();
        datavalue.ouUID=ouUID;
        datavalue.datasetUID=item.datasetUID
        datavalue.datasetName=item.datasetName
        datavalue.period=period
        var listPeriod="201901;201902;201903;201904;201905;201906;201907;201908;201909;201910;201911;201912"
        var completudeData= await getCompletudeGraphLine(ouUID,item.datasetUID,listPeriod)
        var valueJson=getDataGraphLine(completudeData)
        datavalue.pe=valueJson.value_rows
        datavalue.value=valueJson.value_jason
        //console.log('=======transformeDataValue========'+JSON.stringify(transformeDataValue(dataChart)))
        console.log('=======datavalue========'+JSON.stringify(datavalue))
        dataValuesMap.push(datavalue) 
        //console.log('========dataValuesMap in ======='+JSON.stringify(dataValuesMap))           
    }

    //console.log('========dataValuesMap out======='+JSON.stringify(dataValuesMap))
    return dataValuesMap
}



export const ChartValues =  (completudeStore,period) => {
    var dataValuesMap=[];
    completudeStore.rows.map( (item)=>{
        if(item[0]==period){
            var dataValue=new Object();
            dataValue.period=item[0];
            dataValue.ouUID=item[1];
            dataValue.value=item[2];
            dataValuesMap.push(dataValue)
        }
    })
    return(dataValuesMap)
}

export const transformeDataValue=(dataValuesMap)=>{
    if(dataValuesMap!=null || dataValuesMap!=undefined){
        var listKeys=[]
        var listValues=[]
        dataValuesMap.map( (item)=>{
            var name=getOUName(item.ouUID)
            listKeys.push(name)
            listValues.push(parseFloat(item.value))
        })

        var datavalue=new Object()
        datavalue.value_rows=listKeys
        datavalue.value_jason=listValues
        return datavalue
    }

    return dataValuesMap
}

export const getOULevel= (ouUID)=>{
    //console.log("========OrgUnitName=========="+JSON.stringify(OrgUnitName) )
    var orgunit=new Object()
    for (var id in OrgUnitName) { 
        //console.log("=====OrgUnitName===="+OrgUnitName[id])
       if(OrgUnitName[id].id===ouUID)orgunit=OrgUnitName[id] ;
            
    }
    //var orgunit=OrgUnitName.filter(ou=>ou.id==="ImspTQPwCqd")
    return orgunit.level
}

function compareUID(uid,obj ) {
    var orgUnit=new Object()
    for (var i = 0, c = obj.length; i < c; i++) {
        var lev1=obj[i]
        if(lev1.id===uid){
            //console.log("========niveau2==========")
            orgUnit=lev1
        }else{
            var clildren=lev1.children
            for (var i = 0, c = clildren.length; i < c; i++) {
                var lev2=clildren[i]
                if(lev2.id===uid){
                    //console.log("========niveau3==========")
                    orgUnit=lev2
                }
            }
        }
    }
    return orgUnit
}

export const getOUName= (ouUID)=>{
    var orgunit=new Object()
    for (var id in OrgUnitName) { 
        //console.log("=====OrgUnitName===="+OrgUnitName[id])
       if(OrgUnitName[id].id===ouUID)orgunit=OrgUnitName[id] ;
            
    }
   // var orgunit=OrgUnitName.filter(ou=>ou.id==="ImspTQPwCqd")
    return orgunit.displayName
}

export const getDataGraphBtn=(completude)=>{
    var dataCompletude=completude
    //console.log('==========item=========='+JSON.stringify(dataCompletude.metaData))
    var dataGraph=new Object()
    var headers=[]
    var rows=[]
   
    dataCompletude.metaData.dimensions.ou.map( (set)=>{         
        var ou=dataCompletude.metaData.items[set]
        headers.push(ou.name)
       
        var listRow=dataCompletude.rows

        for (var i = 0, c = listRow.length; i < c; i++) {
            var row=listRow[i]
            if(row[1]===set){
                rows.push(parseFloat(row[3]))
            }
        }

    }) 

    dataGraph.value_rows=headers
    dataGraph.value_jason=rows
    console.log('==========dataGraph=========='+JSON.stringify(dataGraph))

    return dataGraph
}

export const getDataGraphLine=(completude)=>{
    var dataCompletude=completude
    //console.log('==========item=========='+JSON.stringify(dataCompletude.metaData))
    var dataGraph=new Object()
    var headers=[]
    var rows=[]
   
    dataCompletude.metaData.dimensions.pe.map( (set)=>{         
        var pe=dataCompletude.metaData.items[set]
        headers.push(pe.name)
       
        var listRow=dataCompletude.rows
        //console.log('==========listRow=========='+JSON.stringify(listRow))

        for (var i = 0, c = listRow.length; i < c; i++) {
            var row=listRow[i]
            if(row[2]===set){
                
                if(rows.indexOf(parseFloat(row[3]))=== -1){
                    rows.push(parseFloat(row[3]))
                }
            }
        }

    }) 

    dataGraph.value_rows=headers
    dataGraph.value_jason=rows
    console.log('==========dataGraph Line=========='+JSON.stringify(dataGraph))

    return dataGraph
}