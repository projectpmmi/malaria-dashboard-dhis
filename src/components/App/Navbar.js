import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import Button from '@material-ui/core/Button';
import Nav from 'react-bootstrap/Nav'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));



const Navbar = () => {

  return (
    <Breadcrumb>
      <Nav variant="pills" defaultActiveKey="#/dashboard" >
        <Nav.Item>
          <Nav.Link href="#/admin">Administration</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#/dashboard" eventKey="link-1">Dashboard</Nav.Link>
        </Nav.Item>

      </Nav>
    </Breadcrumb>


  )
}

export default Navbar