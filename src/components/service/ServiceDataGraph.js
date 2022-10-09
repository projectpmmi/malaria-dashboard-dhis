import React, { useState, useEffect } from "react";
import CompletudeWHO from "../data/CompletudeWHO.json";
import CompletudeLine from "../data/Completude.json";
import { getData } from "./FecthingData";
import OrgUnitName from "../data/OrgUnitName.json";

export const getIndicatorsID = (DatastoreData, groupId) => {
  //console.log("===========DatastoreData=========="+JSON.stringify(DatastoreData))
  var elements = DatastoreData.indicator.filter(
    (elt) => elt.uid != null && elt.uid != "" && elt.code_group === groupId
  );
  //console.log("===========elements=========="+JSON.stringify(elements))
  var listUID = "";
  elements.map((item) => {
    if (!listUID.includes(item.uid)) {
      listUID = listUID === "" ? item.uid : listUID + ";" + item.uid;
    }
  });
  //console.log("===========listUID=========="+listUID)
  return listUID;
};

export const getMetadata = async () => {
  var endpoint = "dataStore/qualitydashboard/settings";
  var response = await getData(endpoint);
  if (response.status === "ERROR") {
    console.error(response.message);
    return;
  }
  return response.data;
};

export const getGraphDataG1 = async (listUID, uidOU, period) => {
  var uidOU = uidOU ? uidOU.split("-") : [];
  var uid = uidOU[0];
  var lev = parseFloat(uidOU[1]);
  //console.log("===========uidOU=========="+uidOU)
  //console.log("===========uid=========="+uid)
  //console.log("===========lev=========="+lev)
  var level = getOuLevel(lev);

  var endpoint =
    "analytics?dimension=ou:" +
    level +
    ";" +
    uid +
    "&dimension=dx:" +
    listUID +
    "&filter=pe:" +
    period;

  //console.log("===========endpoint G1============"+endpoint)

  var response = await getData(endpoint);
  if (response.status === "ERROR") {
    console.error(response.message);
    return;
  }
  return response.data;
};

/* export const transformDataG1 = async (dataJson) => {
  var data = dataJson;
  //console.log('==========data.rows=========='+JSON.stringify(data.rows))
  var dataGraph = new Object();
  var headers = [];
  var series = [];

  data.metaData.dimensions.dx.map((idElt) => {
    var elt = data.metaData.items[idElt];
    headers.push(elt.name);
  });

  data.metaData.dimensions.ou.map((idOu) => {
    var rows = [];
    var orgData = new Object();
    var orgUnit = data.metaData.items[idOu];

    data.metaData.dimensions.dx.map((idElt) => {
      var listRow = data.rows;
      //console.log('==========listRow=========='+JSON.stringify(listRow))
      for (var i = 0, c = listRow.length; i < c; i++) {
        var row = listRow[i];
        if (row[0] === idElt && row[1] === idOu) {
          rows.push(parseFloat(row[2]));
        }
      }
    });
    orgData.name = orgUnit.name;
    orgData.data = rows;
    series.push(orgData);
  });

  dataGraph.headers = headers;
  dataGraph.series = series;
  //console.log('==========dataGraph Line=========='+JSON.stringify(dataGraph))

  return dataGraph;
}; */

export const transformDataG1 = async (dataJson, indicator) => {
  var data = dataJson;
  //await console.log('==========data transformDataG1=========='+JSON.stringify(data))
  var dataGraph = new Object();
  var headers = [];
  var series = [];

  data.metaData.dimensions.dx.map(async (idElt) => {
    var elt = data.metaData.items[idElt];
    //headers.push(elt.name)
    await indicator?.filter((row) => {
      if (row.uid === idElt) {
        //console.log("==========row.name==========" + JSON.stringify(row.name));
        headers.push(row.name);
      }
    });
  });

  data.metaData.dimensions.ou.map((idOu) => {
    var rows = [];
    var orgData = new Object();
    var orgUnit = data.metaData.items[idOu];

    data.metaData.dimensions.dx.map((idElt) => {
      /* var listRow = data.rows;
        //console.log('==========listRow=========='+JSON.stringify(listRow))
        for (var i = 0, c = listRow.length; i < c; i++) {
          var row = listRow[i];
          if (row[0] === idElt && row[1] === idOu) {
            rows.push(parseFloat(row[2]));
          }
        } */
      let listRow = data.rows.filter(
        (row) => row.includes(idOu) && row.includes(idElt)
      );
      //console.log('==========listRow==========' + JSON.stringify(listRow))

      let row = listRow.length > 0 ? listRow[0] : [];
      //console.log('======row a voir==========' + JSON.stringify(row))
      if (row.length > 0) {
        rows.push(parseFloat(row[2]));
      } else {
        rows.push(0);
      }
    });
    orgData.name = orgUnit.name;
    orgData.data = rows;
    series.push(orgData);
  });

  dataGraph.headers = headers;
  dataGraph.series = series;
  //console.log('==========dataGraph chart=========='+JSON.stringify(dataGraph))

  return dataGraph;
};

export const getOuLevel = async (lev) => {
  let level = "LEVEL-1";
  await getData("organisationUnitLevels.json?paging=false&fields=name,level")
    .then((resp) => {
      let findLevel = resp.data.organisationUnitLevels.filter(
        (lev) => lev.level === lev + 1
      );

      if (findLevel.length > 0) {
        level = `LEVEL-${lev + 1}`;
      } else {
        level = `LEVEL-${lev}`;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return level;
};

export const getGraphDataG2 = async (listUID, uidOU, period) => {
  var uidOU = uidOU.split("-");
  var uid = uidOU[0];
  var lev = parseFloat(uidOU[1]);
  var level = getOuLevel(lev);

  var endpoint =
    "analytics?dimension=dx:" +
    listUID +
    "&dimension=ou:" +
    level +
    ";" +
    uid +
    "&filter=pe:" +
    period;
  //console.log("===========endpoint G2============" + endpoint);
  var response = await getData(endpoint);
  if (response.status === "ERROR") {
    console.error(response.message);
    return;
  }
  return response.data;
};

/* export const transformDataG2 = async (dataJson) => {
  var data = dataJson;
  //console.log('==========item=========='+JSON.stringify(dataCompletude.metaData))
  var dataGraph = new Object();
  var headers = [];
  var series = [];

  data.metaData.dimensions.ou.map((idOu) => {
    let orgUnit = data.metaData.items[idOu];
    let name = orgUnit.name;
    //headers.push(orgUnit.name)
    headers.push({ idOu, name });
  });

  data.metaData.dimensions.dx.map((idElt) => {
    var rows = [];
    var eltData = new Object();
    var elt = data.metaData.items[idElt];

    headers.map((orgunit) => {
      let listRow = data.rows.filter((row) => row.includes(orgunit.idOu));
      //console.log("======listRow a voir==========",listRow)
      let row = listRow.length > 0 ? listRow[0] : [];
      //console.log("======row a voir==========",row)
      if (row.length > 0) {
        rows.push(parseFloat(row[2]));
      } else {
        rows.push(0);
      }
    });

    eltData.name = elt.name;
    eltData.data = rows;
    series.push(eltData);
  });
  let headerName = [];
  headers.map((header) => {
    headerName.push(header.name);
  });
  dataGraph.headers = headerName;
  dataGraph.series = series;
  //console.log('==========dataGraph Line=========='+JSON.stringify(dataGraph))

  return dataGraph;
}; */

export const transformDataG2 = async (dataJson, indicator) => {
  var data = dataJson;
  //console.log('==========item=========='+JSON.stringify(dataCompletude.metaData))
  var dataGraph = new Object();
  var headers = [];
  var series = [];

  data.metaData.dimensions.ou.map((idOu) => {
    let orgUnit = data.metaData.items[idOu];
    let name = orgUnit.name;
    //headers.push(orgUnit.name)
    headers.push({ idOu, name });
  });

  data.metaData.dimensions.dx.map(async (idElt) => {
    var rows = [];
    var eltData = new Object();
    var elt = data.metaData.items[idElt];

    /* data.metaData.dimensions.ou.map( (idOu)=>{
                  var listRow=data.rows
                  for (var i = 0, c = listRow.length; i < c; i++) {
                      var row=listRow[i]
                      if(row[0]===idElt && row[1]===idOu){                    
                          rows.push(parseFloat(row[2]))
                      }
                  }
              }) */

    headers.map((orgunit) => {
      let listRow = data.rows.filter(
        (row) => row.includes(orgunit.idOu) && row.includes(idElt)
      );
      //console.log("======listRow a voir==========",listRow)
      let row = listRow.length > 0 ? listRow[0] : [];
      //console.log("======row a voir==========",row)
      if (row.length > 0) {
        rows.push(parseFloat(row[2]));
      } else {
        rows.push(0);
      }
    });

    //eltData.name = elt.name;
    await indicator?.filter((ind) => {
      if (ind.uid === idElt) {
        eltData.name = ind.name;
      }
    });

    eltData.data = rows;
    series.push(eltData);
  });
  let headerName = [];
  headers.map((header) => {
    headerName.push(header.name);
  });
  dataGraph.headers = headerName;
  dataGraph.series = series;
  //console.log('==========dataGraph Line=========='+JSON.stringify(dataGraph))

  return dataGraph;
};

export const transformeNew = async (dataJson) => {
  let data = [];

  data.metaData.dimensions.dx.map((idElt) => {});

  dataJson.rows.map((row) => {
    let elt = data.metaData.items[row[0]];
    let eltName = elt.name;
    let orgunit = data.metaData.items[row[1]];
    let orgunitName = orgunit.name;
    data.push({ eltName, orgunitName });
  });

  let headerName = [];
  data.map((header) => {
    headerName.push(header.name);
  });
};

/* export const getGraphDataG3 = async (listUID, uidOU, period) => {
  var uidOU = uidOU.split("-");
  var uid = uidOU[0];
  var lev = parseFloat(uidOU[1]);
  var level = getOuLevel(lev);

  var endpoint =
    "analytics?dimension=ou:" +
    uid +
    "&dimension=dx:" +
    listUID +
    "&filter=pe:" +
    period;
  console.log("===========endpoint ok==========" + endpoint);
  var response = await getData(endpoint);
  if (response.status === "ERROR") {
    console.error(response.message);
    return;
  }
  return response.data;
}; */

export const getGraphDataG3 = async (listUID, uidOU, period) => {
  var uidOU = uidOU.split("-");
  var uid = uidOU[0];

  var endpoint =
    "analytics?dimension=pe:" +
    period +
    "&dimension=dx:" +
    listUID +
    "&filter=ou:" +
    uid +
    "&displayProperty=NAME";
  //console.log("===========endpoint ok==========" + endpoint);
  var response = await getData(endpoint);
  if (response.status === "ERROR") {
    console.error(response.message);
    return;
  }
  return response.data;
};

export const transformDataG3 = async (dataJson, indicator) => {
  var data = dataJson;
  //console.log('==========item==========' + JSON.stringify(data))
  var dataGraph = new Object();
  var headers = [];
  var series = [];

  data.metaData.dimensions.pe.map((pe) => {
    let period = data.metaData.items[pe];
    let name = period.name;
    headers.push({ pe, name });
  });

  data.metaData.dimensions.dx.map(async (idElt) => {
    var rows = [];
    var eltData = new Object();
    var elt = data.metaData.items[idElt];

    headers.map((periode) => {
      let listRow = data.rows.filter(
        (row) => row.includes(periode.pe) && row.includes(idElt)
      );
      //console.log('======listRow a voir==========',JSON.stringify(listRow))
      let row = listRow.length > 0 ? listRow[0] : [];
      //console.log('======row a voir==========', JSON.stringify(row))
      if (row.length > 0) {
        rows.push(parseFloat(row[2]));
      } else {
        rows.push(0);
      }
    });

    await indicator?.filter((ind) => {
      if (ind.uid === idElt) {
        eltData.name = ind.name;
      }
    });

    //eltData.name = elt.name
    eltData.data = rows;
    series.push(eltData);
  });

  let headerName = [];
  headers.map((header) => {
    headerName.push(header.name);
  });

  dataGraph.headers = headerName;
  dataGraph.series = series;
  //console.log('==========dataGraph Line==========' + JSON.stringify(dataGraph))

  return dataGraph;
};

/* export const getGraphDataG3 = async (listUID,uidOU,period) => {
    var uidOU=uidOU.split("-")
    var uid=uidOU[0]
    
    var endpoint="analytics?dimension=pe:"+period+"&dimension=dx:"+listUID+"&filter=ou:"+uid+"&displayProperty=NAME"
    console.log("===========endpoint ok=========="+endpoint)
    var response = await getData(endpoint)
    if (response.status === 'ERROR') {
        console.error(response.message)
        return
    }
    return response.data
}

export const transformDataG3 = async (dataJson) => {
    
    var data=dataJson
    console.log('==========item=========='+JSON.stringify(data))
    var dataGraph=new Object()
    var headers=[]
    var series=[]
       
    data.metaData.dimensions.pe.map( (pe)=>{         
        let period=data.metaData.items[pe]
        let name=period.name
        headers.push({pe,name})
    }) 
        
    data.metaData.dimensions.dx.map( (idElt)=>{
            var rows=[]
            var eltData=new Object()
            var elt=data.metaData.items[idElt]
            
            headers.map((periode)=>{
                let listRow=data.rows.filter(row=>row.includes(periode.pe) && row.includes(idElt))
                console.log("======listRow a voir==========",JSON.stringify(listRow))
                let row=(listRow.length>0)?listRow[0]:[]
                console.log("======row a voir==========",JSON.stringify(row))
                if(row.length>0) {
                    rows.push(parseFloat(row[2]))
                }else {
                    rows.push(0)
                }

            })   

            eltData.name=elt.name
            eltData.data=rows
            series.push(eltData)
            

    })       
    let headerName=[]
    headers.map(header=>{
        headerName.push(header.name) 
    })
    dataGraph.headers=headerName
    dataGraph.series=series
    console.log('==========dataGraph Line=========='+JSON.stringify(dataGraph))

    return dataGraph
} */
