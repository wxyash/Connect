import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { API } from '../../controllers/api';
import Modal from '@material-ui/core/Modal'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
    button: {
      margin: theme.spacing.unit,
      float: "right"
    },
    input: {
      display: 'none',
    },
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
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


class AdminTab3 extends React.Component{
    constructor(){
        super()
        this.state = {
          createRoomModal: false,
          createRoomModal2: false,
          roomName: '',
          password: '',
          admin: [],
          rooms: [],
          firstName: '',
          lastName: '',
          checked: true,
          roomId: '',
          open: false,
        }
    }

    componentDidMount(){
      this.getAllUser()
      this.getAllRooms()
    }
    getAllUser = async () =>{
      await API.admin.findAll().then((res)=>{
        console.log(res.data.payload.admin)
        this.setState({admin: res.data.payload.admin})
      }).catch((error) =>{
        console.log(error)
      })
    }

    getAllRooms = async () => {
      await API.rooms.find().then(async (res) => {
        console.log(res.data.payload)
        this.setState({rooms: res.data.payload})
      }).catch((error) => {
        console.log(error)
      })
    }
    addRoom = async () => {
      const {roomName, password, admin } = this.state
      let data = {
        name: roomName,
        password: password,
        user_id: admin[0]._id
      }
      await API.rooms.create(data).then(async (res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
    }
    closeModal = () => {
      this.setState({createRoomModal: false})
    }
    closeModal2 = () => {
      this.setState({createRoomModal2: false})
    }
    updateRoomName = (e) => {
      this.setState({ roomName: e.target.value })
    }
    updateRoomPassword = (e) => {
      this.setState({ password: e.target.value })
    }

    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
    
    handleChange2 = name => event => {
      this.setState({ [name]: event.target.checked });
    };
  
  
    handleClose = () => {
      this.setState({ open: false });
    };
  
    handleOpen = () => {
      this.setState({ open: true });
    };

    DATE = function(datee) {
      var date = new Date(datee);
      return date.getMonth()+1+ "/" + date.getDate() + "/" + date.getFullYear() ;
    }
     
    TIME = function (datee) {
      var date = new Date(datee);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
    status = function(stat){
      var statuss = ""
      if(stat === true){
        statuss = "Active"
      }else{
        statuss = "Inactive"
      }
      return statuss
    }
    edit = async () => {
      const{roomId, roomName, checked} = this.state
      let data = {
        room_id: roomId,
        room_name: roomName,
        status: checked 
      }
      API.rooms.edit(data).then((res)=>{
        console.log(res)
        this.getAllRooms()
        this.closeModal2()
      }).catch((e)=>{
        console.log(e)
      })
    }
    render(){
        const { classes } = this.props;
        return(
          <div className={classes.root}>
             <Button variant="outlined" color="primary" onClick={() => this.setState({createRoomModal: true})} className={classes.button}>
                Add A new Room
             </Button>
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
                  onClick={this.addRoom}
                >
                  Create Room
              </Button>
              </div>
              </Modal>
              <Modal
               aria-labelledby="simple-modal-title"
               aria-describedby="simple-modal-description"
               open={this.state.createRoomModal2}
               onClose={this.closeModal2}
               >
                <div style={getModalStyle()} className={classes.paper}>
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="roomname">Room Name</InputLabel>
                    <Input onChange={this.updateRoomName.bind(this)} value={this.state.roomName} id="email" name="roomname" autoFocus required />
                </FormControl>
                <InputLabel htmlFor="status">Status: </InputLabel>
                <Switch 
                    checked={this.state.checked}
                    onChange={this.handleChange2('checked')}
                    value = "checked"
                   />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.edit}
                >
                  Edit Room
              </Button>
                </div>
               </Modal>
            <Paper>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Id</CustomTableCell>
                            <CustomTableCell>Room</CustomTableCell>
                            <CustomTableCell>Created Date</CustomTableCell>
                            <CustomTableCell>Edited Date</CustomTableCell>
                            <CustomTableCell>Status</CustomTableCell>
                            <CustomTableCell>Action</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.rooms.map((res , index)=>(
                        <TableRow key={res._id}>
                              <CustomTableCell>{index+1}</CustomTableCell>
                              <CustomTableCell>{res.name}</CustomTableCell>
                              <CustomTableCell>{this.DATE(res.time_created) + " " + this.TIME(res.time_created)}</CustomTableCell>
                              <CustomTableCell>{this.DATE(res.time_updated) + " " + this.TIME(res.time_updated)}</CustomTableCell>
                              <CustomTableCell>{this.status(res.status)}</CustomTableCell>
                              <CustomTableCell> <Button varient="outlined" color="secondary" className={this.button} onClick={()=>this.setState({roomId: res._id, createRoomModal2: true, roomName: res.name, checked: res.status })}>Edit</Button></CustomTableCell>
                        </TableRow>
                      ))}
                          
                    </TableBody>
                </Table>
            </Paper>
            </main>
            </div>
        )
    }
}
AdminTab3.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(AdminTab3);