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

let id = 0;
function createData(Type, Date, Time, User, EventId, PPID) {
  id += 1;
  return { id, Type, Date, Time, User, EventId, PPID };
}
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 1),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 1),
    createData('Eclair', 262, 16.0, 24, 6.0, 1),
    createData('Cupcake', 305, 3.7, 67, 4.3, 1),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1),
  ];

  function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  const TIME = function () {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


class AdminTab1 extends React.Component{
    constructor(){
        super()
        this.state = {
          history: []
        }
    }
    
    componentDidMount(){
      this.getEventhistory()
    }
    
    getEventhistory(){
      // var histArray = []
      API.history.eventHistory().then((res)=>{
        console.log(res)
        this.setState({history: res.data.payload.eventHistory})
        
      }).catch((error)=>{
        console.log(error)
      })
    }

    // formatDate(date) {
    //   var monthNames = [
    //     "January", "February", "March",
    //     "April", "May", "June", "July",
    //     "August", "September", "October",
    //     "November", "December"
    //   ];
    
    //   var day = date.getDate();
    //   var monthIndex = date.getMonth();
    //   var year = date.getFullYear();
    
    //   return day + ' ' + monthNames[monthIndex] + ' ' + year;
    // }

    render(){
        const { classes } = this.props;
        const date = new Date()
        return(
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Type</CustomTableCell>
                            <CustomTableCell>Date</CustomTableCell>
                            <CustomTableCell>Time</CustomTableCell>
                            <CustomTableCell>User</CustomTableCell>
                            <CustomTableCell>EventId</CustomTableCell>
                            <CustomTableCell>PPID</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.history.map((res)=>(
                          <TableRow key={res.eventId}>
                            <CustomTableCell>{res.connectionType}</CustomTableCell>
                            <CustomTableCell>{                      
                              date.getDate(res.timeCreated) + "/"+ date.getMonth(res.timeCreated) + "/"+ date.getFullYear(res.timeCreated)
                             }</CustomTableCell>
                            <CustomTableCell>{res.timeCreated}</CustomTableCell>
                            <CustomTableCell>{res.firstName+ ' ' +res.lastName}</CustomTableCell>
                            <CustomTableCell>{res.eventId}</CustomTableCell>
                            <CustomTableCell>{res.socketId}</CustomTableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

AdminTab1.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(AdminTab1);