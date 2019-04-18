import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Main from './routes/main'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  button: {
    color: 'white',
    border: '1px solid white'
  }
};

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    userLoggedIn: ''
  };
  componentDidMount () {
    this.setState({userLoggedIn: this.CheckLogin()})
  }
  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  
  logOut = () =>{
   // this.setState({anchorEl: null})
    console.log("I am here")
  }

CheckLogin = (params) => {
    let token = localStorage.getItem('token')
    // if (!token) {
    //   return <div>
    //     <MenuItem onClick={this.handleClose} component={Link} to='/AdminRegister'>Admin Register</MenuItem>
    //     <MenuItem onClick={this.handleClose} component={Link} to='/AdminLogin'>Admin Login</MenuItem>
    //     <MenuItem onClick={this.handleClose} component={Link} to='/Register'>User Register</MenuItem>
    //     <MenuItem onClick={this.handleClose} component={Link} to='/'>User Login</MenuItem>
    //   </div>
    // } else {
    //   return <div>
    //       <MenuItem onClick={() => {
    //         this.handleClose()
    //         localStorage.clear()
    //       }} component={Link} to='/AdminLogin'> Logout </MenuItem>
    //     </div>
    // }
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    if (!token) {
      return (
        <div>
      <Button variant="outlined" component={Link} to='/AdminRegister' className={classes.button}>
      Admin Register
      </Button>
      <Button component={Link} to='/AdminLogin' variant="outlined" className={classes.button}>
      Admin Login
      </Button>
      <Button component={Link} to='/Register' variant="outlined" className={classes.button}>
      User Register
      </Button>
      <Button component={Link} to='/' variant="outlined" className={classes.button}>
      User Login
      </Button>
        </div>
      )
    } else {
          return ( <Button onClick={() => {
            localStorage.clear()
          }} variant="contained" color="secondary" className={classes.button}>
      Logout
    </Button>)
    }
  }

  render() {
    const { classes } = this.props;
    const { auth } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Connect
            </Typography>
            {auth && (
              <div>
                {this.state.userLoggedIn}
              </div>
            )}
          </Toolbar>
        </AppBar>
        <div>
          <Main />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(MenuAppBar);
