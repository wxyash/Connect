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

  let id = 0;
  function createData(Room, CreatedDate, EditDate, status) {
    id += 1;
    return {id, Room, CreatedDate, EditDate, status};
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237, 9.0, 37),
    createData('Eclair', 262, 16.0, 24),
    createData('Cupcake', 305, 3.7, 67),
    createData('Gingerbread', 356, 16.0),
  ];

class AdminTab3 extends React.Component{
    constructor(){
        super()
        this.state = {
          createRoomModal: false,
          roomName: '',
          password: '',
          admin: [],
          rooms: [],
          firstName: '',
          lastName: '',
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
        this.setState({admin: res.data.payload})
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
    updateRoomName = (e) => {
      this.setState({ roomName: e.target.value })
    }
    updateRoomPassword = (e) => {
      this.setState({ password: e.target.value })
    }

    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };
  
    handleOpen = () => {
      this.setState({ open: true });
    };

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
            <Paper>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Id</CustomTableCell>
                            <CustomTableCell>Room</CustomTableCell>
                            <CustomTableCell>Created Date</CustomTableCell>
                            <CustomTableCell>Edited Date</CustomTableCell>
                            <CustomTableCell>Status</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row=>(
                            <TableRow>
                                <CustomTableCell component="th" scope="row">
                                    {row.id}
                                </CustomTableCell>
                                <CustomTableCell align="right">{row.Room}</CustomTableCell>
                                <CustomTableCell align="right">{row.CreatedDate}</CustomTableCell>
                                <CustomTableCell align="right">{row.EditDate}</CustomTableCell>
                                <CustomTableCell align="right">{row.status}</CustomTableCell>
                                {/* <Button align="right">Edit</Button> */}
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