import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Modal from '@material-ui/core/Modal';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import STATE from '../global/state'
import ChatArea from './Chat/ChatArea'
import { Link } from 'react-router-dom'
import { API } from '../controllers/api'
import socket_io from '../controllers/socketio'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  chatBoxPosition: {
    position: 'fixed',
    bottom: '0'
  },

  chatGround: {
    'margin-bottom': '20px',
    height: '75vh'
  },
  Button: {
    'background-color': 'red'
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

function getModalStyle() {
  const top = 50
  const left = 50
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class ClippedDrawer extends React.Component {
  constructor() {
    super()
    this.state = {
      createRoomModal: false,
      roomName: '',
      password: '',
      roomsList: [],
      io_instance: socket_io.getters.getSocket(),
      currentRoom: ''
    }
    API.rooms.find().then(async (s) => {
      await STATE.setters.setRoom(s.data.payload)
      this.getRooms()
    }).catch((e) => {
      console.log(e)
      this.getRooms()
    })
  }

  closeModal = () => {
    this.setState({ createRoomModal: false })
  }

  createRoom = async () => {
    let data = {
      name: this.state.roomName,
      password: this.state.password,
      user_id: STATE.getters.getUser()._id
    }
    await API.rooms.create(data).then(async (s) => {
      await STATE.setters.addRoom(s.data.payload)
      this.closeModal()
    }).catch((e) => {
      console.log('error', e)
    })
    this.getRooms()
  }

  updateRoomName = (e) => {
    this.setState({ roomName: e.target.value })
  }
  updateRoomPassword = (e) => {
    this.setState({ password: e.target.value })
  }

  getRooms = () => {
    this.setState({ roomsList: STATE.getters.getRooms() })
  }

  joinRoom = (room) => {
    if (room.name === this.state.currentRoom) {
      return
    }
    let data = {
      user: STATE.getters.getUser().first_name,
      room: room.name
    }
    let leaveData = {
      user: STATE.getters.getUser().first_name,
      room: this.state.currentRoom
    }
    if (this.state.currentRoom !== room.name) {
      let room_io = this.state.io_instance.emit('leave_room', leaveData)
    }
    let room_io = this.state.io_instance.emit('join_room', data)
    this.setState({ io_instance: room_io })
    this.setState({ currentRoom: room.name })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <Button
            variant="text"
            color="secondary"
            component={Link} to="/"
          >
            <b>Log Out</b>
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => { this.setState({ createRoomModal: true }) }}
          >
            Create Room
          </Button>
          <List>
            <ListItem>
              <ListItemText primary="Available Chat ROoms" />
            </ListItem>
          </List>
          <Divider />
          <List>
            {this.state.roomsList.map((room, index) => (
              <ListItem onClick={() => { this.joinRoom(room) }} button key={room._id}>
                <ListItemText primary={room.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Number of Users'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Member One', 'Member Two'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>

        </Drawer>
        <main className={classes.content}>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.createRoomModal}
            onClose={this.closeModal}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="roomname">Room Name</InputLabel>
                <Input onChange={this.updateRoomName.bind(this)} value={this.state.roomName} id="email" name="roomname" autoFocus required />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input onChange={this.updateRoomPassword.bind(this)} value={this.state.password} name="password" type="password" id="password" autoComplete="current-password" required />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={this.createRoom}
              >
                Create Room
          </Button>
            </div>
          </Modal>
          <ChatArea key chatRoom={this.state.currentRoom} socketInstace={this.state.io_instance} />
        </main>
        {/* <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="right"
        >
          <div className={classes.toolbar} />
          <List>
            {['Create A Room'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Member One', 'Member Two'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer> */}
      </div>
    );
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);