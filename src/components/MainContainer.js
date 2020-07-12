import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import clsx from 'clsx';
import { Container, Box, CssBaseline, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import StoreIcon from '@material-ui/icons/Store';
import { useStyles } from './style/Utils';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

import AddStore from './storeComp/AddStore'
import StoreList from './storeComp/StoreList'
import AddOrder from './storeOrder/AddOrder'
import OrderList from './storeOrder/OrderList'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <span>
        Sujit Sarkar (sweezit92@gmail.com)
      </span>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function MainContainer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />

        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Store & Orders
          </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to="/" style={{textDecoration: "none", color: "black"}}>
              <ListItem button>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Create Store"/>
              </ListItem>
            </Link>
            <Link to="/storeList" style={{textDecoration: "none", color: "black"}}>
              <ListItem button>
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary="View Store"/>
              </ListItem>
            </Link>
            <Link to="/addOrder" style={{textDecoration: "none", color: "black"}}>
              <ListItem button>
                <ListItemIcon>
                  <CardGiftcardIcon />
                </ListItemIcon>
                <ListItemText primary="Create Order"/>
              </ListItem>
            </Link>
            <Link to="/orderList" style={{textDecoration: "none", color: "black"}}>
              <ListItem button>
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary="View Order"/>
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
           
            <Switch>
              <Route exact path="/" component={AddStore} />
              <Route exact path="/storeList" component={StoreList} />
              <Route exact path="/addOrder" component={AddOrder} />
              <Route exact path="/orderList" component={OrderList} />
            </Switch>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </Router>
  );
}
export default MainContainer;