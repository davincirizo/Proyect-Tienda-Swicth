import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import StyleIcon from '@mui/icons-material/Style';
import storage from "../../storage/Storage.jsx";


export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
   left: false,
  });




  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/*{storage.get('authUser').roles.some(role => role.name == 'Admin') ? (*/}
      {/*    <div>*/}
            <ListItem>
        <ListItemButton>
          <SettingsIcon/>
          <ListItemText primary='Ajustes de Admin' />
        </ListItemButton>
      </ListItem>
      <Divider />
      <List>
        {[
          {text:'Categorias',icon:<DisplaySettingsIcon />,route:'/saler/list_categories',apiPermission:'admin.categories.index'},
          {text:'Etiqutas',icon:<StyleIcon />,route:'/saler/list_labels',apiPermission:'admin.labels.index'},
          {text:'Usuarios',icon:<PeopleAltIcon />,route:'/saler/list_users',apiPermission:'admin.users.index'},
          {text:'Roles',icon:<SupervisedUserCircleIcon />,route:'/saler/list_roles',apiPermission:'admin.roles.index'}

      ].map((route) => (
            storage.get('authUser') && storage.get('authUser').roles.some(role => role.permissions.some(permission => permission.name == route.apiPermission )) ?
          (<ListItem key={route.text} disablePadding>
            <Link to={route.route} style={{textDecoration: 'none'}}>
              <ListItemButton>
                <ListItemIcon>
                {route.icon}
                </ListItemIcon>
                <ListItemText primary={route.text} />
              </ListItemButton>
            </Link>
          </ListItem>):<></>
        ))}
      </List>
          {/*</div>):<div></div>}*/}
      <ListItem>
        <ListItemButton>
          <SettingsIcon/>
          <ListItemText primary='Options Saler' />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  return (
    <div>
      
        <React.Fragment>
          <Button onClick={toggleDrawer('left', true)}>
            <MenuIcon/>
          </Button>
          <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}