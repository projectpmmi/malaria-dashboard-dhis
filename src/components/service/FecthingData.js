import React, { useState, useEffect } from "react";
import TextData from "../data/TextData.json";
import InitialOrgunits from "../data/InitialOrgunits";
import OrgUnitName from "../data/OrgUnitName.json";
import axios from "axios";

//export const  baseUrl = "https://dhis2.jsi.com/dhis"

let baseUrl = "";

/**
 * Sets the base URL.
 * @param {String} url
 */
export const setBaseUrl = (url) => (baseUrl = `${url}/`);

export const postData = async (endpoint, data) =>
  await (
    await fetch(baseUrl + endpoint, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
  ).json();

/* export const getData = async endpoint =>
    await (await fetch(baseUrl+endpoint, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
        },
    })).json() */

export const getData = async (endpoint) => {
  //console.log("===========getData=========="+(baseUrl+endpoint))
  return await axios.get(baseUrl + endpoint);
};

export const deleteData = async (endpoint) =>
  await (
    await fetch(baseUrl + endpoint, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

export const makeDataStore = async (
  dataElementMap,
  datavaluejson,
  dataLine
) => {
  const endpoint = baseUrl + "dataStore/qualitydashboard/settings";
  await deleteData(endpoint);
  postData(endpoint, getTextData(dataElementMap, datavaluejson, dataLine));
  //return(dataElementMap)
};

export const getTextData = (dataElementMap, datavaluejson, dataLine) => {
  const data = new Object();
  data.dataElements = dataElementMap;
  data.dataValues = datavaluejson;
  data.data_line = dataLine;
  //data.dataValues=TextData
  return data;
};

export const getWHODatastore = async () => {
  const endpoint = baseUrl + "dataStore/dataQualityTool/settings";
  const response = await getData(endpoint);
  if (response.status === "ERROR") {
    console.error(response.message);
    return;
  }
  return response;
};

export const getCompletudeData = async (ouLevel, dataSetUID, period) => {
  var level = "LEVEL-3";
  switch (parseInt(ouLevel)) {
    case 1:
      level = "LEVEL-2";
      break;
    case 2:
      level = "LEVEL-3";
      break;
    default:
      level = "LEVEL-3";
  }
  const endpoint =
    baseUrl +
    "analytics?dimension=pe:" +
    period +
    "&dimension=ou:" +
    level +
    ";ImspTQPwCqd&filter=dx:" +
    dataSetUID +
    ".REPORTING_RATE&displayProperty=NAME&skipMeta=true&includeNumDen=true";
  //console.log('========endpoint completude data======='+endpoint)
  const response = await getData(endpoint);
  if (response.status === "ERROR") {
    console.error(response.message);
    return;
  }
  return response.data;
};

export const getOrganisationUnit = async () => {
  /* const endpoint=baseUrl+'organisationUnits.json?userDataViewFallback=true&fields=id,displayName,level,children[displayName,level,id,children[displayName,level,id]]&paging=false'
    const response = await getData(endpoint)
    if (response.status === 'ERROR') {
        console.error(response.message)
        return
    } */
  const response = InitialOrgunits;
  return response;
};

export const getCompletudeGraphBtn = async (ouUID, dataSetUID, period) => {
  var ouLevel = getOULevel(ouUID);
  var level = "LEVEL-3";
  switch (parseInt(ouLevel)) {
    case 1:
      level = "LEVEL-2";
      break;
    case 2:
      level = "LEVEL-3";
      break;
    default:
      level = "LEVEL-3";
  }
  const endpoint =
    baseUrl +
    "analytics.json?dimension=dx:" +
    dataSetUID +
    ".REPORTING_RATE&dimension=ou:" +
    ouUID +
    ";" +
    level +
    "&dimension=pe:" +
    period;
  //console.log('========endpoint======='+endpoint)
  const response = await getData(endpoint);
  if (response.status === "ERROR") {
    console.error(response.message);
    return;
  }
  return response.data;
};

export const getCompletudeGraphLine = async (ouUID, dataSetUID, period) => {
  var ouLevel = getOULevel(ouUID);
  var level = "LEVEL-3";
  switch (parseInt(ouLevel)) {
    case 1:
      level = "LEVEL-2";
      break;
    case 2:
      level = "LEVEL-3";
      break;
    default:
      level = "LEVEL-3";
  }
  const endpoint =
    baseUrl +
    "analytics.json?dimension=dx:" +
    dataSetUID +
    ".REPORTING_RATE;" +
    dataSetUID +
    ".REPORTING_RATE_ON_TIME&dimension=ou:" +
    ouUID +
    "&dimension=pe:" +
    period;
  //console.log('========endpoint======='+endpoint)
  const response = await getData(endpoint);
  if (response.status === "ERROR") {
    console.error(response.message);
    return;
  }
  return response.data;
};

export const getOULevel = (ouUID) => {
  var orgunit = new Object();
  for (var id in OrgUnitName) {
    if (OrgUnitName[id].id === ouUID) orgunit = OrgUnitName[id];
  }
  return orgunit.level;
};
