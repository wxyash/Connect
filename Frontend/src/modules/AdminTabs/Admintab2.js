import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {API} from '../../controllers/api'

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
  });


class AdminTab2 extends React.Component{
    constructor(){
        super()
        this.state = {
          serverData: []
        }
    }
    componentDidMount () {
      API.history.chatHistory().then((s) => {
        this.setState({serverData: s.data.payload.chatHistory})
      }).catch((e) => {
        console.log(e)
      })
    }

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
    render(){
        const { classes } = this.props;
        return(
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Id</CustomTableCell>
                            <CustomTableCell>Date</CustomTableCell>
                            <CustomTableCell>Time</CustomTableCell>
                            <CustomTableCell>Sender</CustomTableCell>
                            <CustomTableCell>Receiver</CustomTableCell>
                            <CustomTableCell>Message</CustomTableCell>
                            <CustomTableCell>Room</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.serverData.map((row, index) => (
                            <TableRow className={classes.row} key={row.id}>
                                <CustomTableCell component="th" scope="row">{index+1}</CustomTableCell>
                                <CustomTableCell >{this.DATE(row.time_created)}</CustomTableCell>
                                <CustomTableCell align="left">{this.TIME(row.time_created)}</CustomTableCell>
                                <CustomTableCell align="left">{row.sender}</CustomTableCell>
                                <CustomTableCell align="left">{row.recieiver}</CustomTableCell>
                                <CustomTableCell align="left">{row.message}</CustomTableCell>
                                <CustomTableCell align="left">{row.room}</CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

AdminTab2.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(AdminTab2);
