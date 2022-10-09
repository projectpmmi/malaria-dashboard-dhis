import {getData} from './FecthingData'

const init=async()=>{
    var endpoint="dataStore/qualitydashboard/settings"
    var resp=await getData(endpoint)
      if (resp.status === 'ERROR') {
        console.error(resp.message)
        return []
    }
    console.log("==========resp============"+JSON.stringify(resp))
    return resp
    
  }
  
  export const getMetaData = async () => {
    var indicators=await init()  
    var list=[]
    indicators.indicator.map((item)=>{
        var dataObject=new Object();
        dataObject.id=item.id
        dataObject.name=item.name
        dataObject.type=item.type
        dataObject.uid=item.uid
        dataObject.code_group=item.code_group
        var group=indicators.groups.filter(set=>set.code===item.code_group)      
        dataObject.groupName=group[0].name
        list.push(dataObject)
      }
    )
  console.log("==========list============"+JSON.stringify(list))
   return list
  };



