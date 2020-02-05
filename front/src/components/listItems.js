import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import StorefrontIcon from '@material-ui/icons/Storefront';

export const mainListItems = (
  <div>
    <Link to="./" style={{ textDecoration: 'none', color: 'green' }}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon style={{color: 'green'}} />
        </ListItemIcon>
        <ListItemText primary="Página Inicial" />
      </ListItem>
    </Link>
    <Link to="/cart" style={{ textDecoration: 'none', color: 'green' }}>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon style={{color: 'green'}} />
        </ListItemIcon>
        <ListItemText primary="Vendas" />
      </ListItem>
    </Link>
    <Link to="/clientes" style={{ textDecoration: 'none', color: 'green' }}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon style={{color: 'green'}} />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItem>
    </Link>
    <Link to="/stock" style={{ textDecoration: 'none', color: 'green' }}>
      <ListItem button>
        <ListItemIcon>
          <StorefrontIcon style={{color: 'green'}} />
        </ListItemIcon>
        <ListItemText primary="Estoque" />
      </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Relatórios</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);