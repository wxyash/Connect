import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DirectionsIcon from '@material-ui/icons/Directions';

import STATE from '../../global/state'
import io from '../../controllers/socketio'

const styles = theme => ({
  root: {
    display: 'flex',
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
  }

});
class ChatArea extends React.Component {
  constructor() {
    super()
    this.state = {
      message: '',
      io: io.getters.getSocket(),
      typing: '',
      messages: STATE.getters.getMessages()
    }
    this.initSocketEvents()
  }

  updateMessage(event) {
    this.setState({ message: event.target.value })
    this.socketTyping()
  }
  socketTyping = () => {
    let user = STATE.getters.getUser()
    let io = this.state.io
    io.emit('typing', user.first_name)
  }

  sendMessage = (e) => {
    if (e.key === 'Enter') {
      let data = {
        sender: STATE.getters.getUser().first_name,
        message: this.state.message
      }
      let io = this.state.io
      io.emit('chat', data)
      this.setState({ message: '' })
    }
  }

  sendMessage2 = (e) => {
    // if (e.key === 'Enter') {
      let data = {
        sender: STATE.getters.getUser().first_name,
        message: this.state.message
      }
      let io = this.state.io
      io.emit('chat', data)
      this.setState({ message: '' })
    // }

  }

  initSocketEvents = () => {
    let io = this.state.io
    io.on('typing', (data) => {
      let typingText = `${data} is typing.`
      this.setState({ typing: typingText })
    })
    io.on('chat', async (data) => {
      await STATE.setters.addMessage(data)
      this.setState({ typing: '' })
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <main className={classes.content}>
        <div item xs={12}>
            <Paper className={classes.chatGround} >
              {this.state.typing !== '' ? <p>{this.state.typing}</p> : <p></p>}
              <br />
              <br />
              <div>
                {STATE.getters.getMessages().map((message, index) => (
                  <p key={index}> {message.sender}: {message.message} </p>
                ))}
              </div>
            </Paper>
            <Paper className={classes.root} elevation={1}>
              <IconButton className={classes.iconButton} aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <InputBase fullWidth className={classes.input} onKeyPress={this.sendMessage.bind(this)} onChange={this.updateMessage.bind(this)} placeholder="Message" />
              <IconButton color="primary" onClick={this.sendMessage2.bind(this)} className={classes.iconButton}  aria-label="Directions">
                <DirectionsIcon />
              </IconButton>
            </Paper>
          </div>
        </main>
      </div>
    );
  }
}
export default withStyles(styles)(ChatArea);