import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import InitialOrgunits from "../data/InitialOrgunits";
import { getData } from "../service/FecthingData";

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function RecursiveTreeView(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [data, setData] = React.useState([]);

  async function getOrgUnit() {
    var endpoint =
      "organisationUnits.json?userDataViewFallback=true&fields=id,displayName,level,children[displayName,level,id,children[displayName,level,id,children[displayName,level,id,children[displayName,level,id,children[displayName,level,id]]]]]&paging=false";
    var response = await getData(endpoint);
    if (response.status === "ERROR") {
      console.error(response.message);
      return;
    }
    console.info("=====organisation======", response.data.organisationUnits);
    return response.data.organisationUnits[0];
  }

  const getOrgUnitTree = async () => {
    var endpoint1 = "me?fields=organisationUnits";
    console.log("===========endpoint1==========" + endpoint1);
    const me = await getData(endpoint1);
    //await console.log("===========me.data==========",JSON.stringify(me.data))
    const rootIds = me.data.organisationUnits.map((ou) => ou.id);

    var endpoint2 =
      "organisationUnits.json?paging=false&fields=id,level,displayName,path,children";
    const response = await getData(endpoint2);
    console.log("===========je suis la==========");
    const allOrgUnits = response.data.organisationUnits.filter((ou) =>
      rootIds.some((r) => ou.path.includes(r))
    );

    const tree = allOrgUnits.filter((ou) => rootIds.some((r) => ou.id === r));

    tree.forEach((root) => {
      const setChildren = (parent) => {
        parent.children = allOrgUnits.filter((ou) =>
          parent.children.some((c) => c.id === ou.id)
        );
        parent.children.forEach((c) => setChildren(c));
      };
      setChildren(root);
    });

    return tree[0];
  };

  useEffect(() => {
    async function load() {
      setData(await getOrgUnit());
    }
    load();
  }, []);

  /* useEffect(() => {
    //fetchData();
    //console.log('Data '+ data)
    setData(InitialOrgunits.organisationUnits[0])
  });  */

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
    props.setOrgunit(nodeIds);
    console.log(
      "==============handleToggle orgunit=============== : " + nodeIds
    );
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
    props.setOrgunit(nodeIds);
    console.log(
      "==============handleSelect orgunit =============== : " + nodeIds
    );
  };

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id + "-" + nodes.level}
      label={nodes.displayName}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      {renderTree(data)}
    </TreeView>
  );
}
