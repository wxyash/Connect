import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
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
  button2: {
    'float': 'right'
  }
});  


class AdminTab1 extends React.Component{
    constructor(){
        super()
        this.state = {
          history: [],
          nextPage: '',
          previousPage: ''
        }
    }
    
    componentDidMount(){
      this.getEventhistory()
    }
    
    getEventhistory = async() => {
      // var histArray = []
      await API.history.eventHistoryPaginated(10).then((res)=>{
        this.setState({history: res.data.payload.eventHistory})
        this.setState({nextPage: 20})
        this.setState({previousPage: 10})
      }).catch((error)=>{
        console.log(error)
      })
    }

    getNextEventhistory = async () => {
      await API.history.eventHistoryPaginated(this.state.nextPage).then((res)=>{
        this.setState({history: res.data.payload.eventHistory})
        this.setState({nextPage: this.state.nextPage + 10})
        this.setState({previousPage: this.state.nextPage - 10})
      }).catch((error)=>{
        console.log(error)
      })
    }

    getPrevEventhistory = async () => {
      await API.history.eventHistoryPaginated(this.state.previousPage).then((res)=>{
        this.setState({history: res.data.payload.eventHistory})
        this.setState({nextPage: this.state.previousPage + 10})
        this.setState({previousPage: this.state.previousPage - 10})
      }).catch((error)=>{
        console.log(error)
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

    formatDate (date) {
      console.log(date, 'winter is cumming')
      return date
    }

    render(){
        const { classes } = this.props;
        return(
          <div>
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
                          this.DATE(res.timeCreated)  
                          }</CustomTableCell>
                        <CustomTableCell>{this.TIME(res.timeCreated)}</CustomTableCell>
                        <CustomTableCell>{res.firstName+ ' ' +res.lastName}</CustomTableCell>
                        <CustomTableCell>{res.eventId}</CustomTableCell>
                        <CustomTableCell>{res.socketId}</CustomTableCell>
                      </TableRow>
                  ))}
                </TableBody>
            </Table>
        </Paper>
        <br/><br/>
      <Button variant="outlined" className={classes.button2} onClick={this.getNextEventhistory}>
        Next Page
      </Button>
      <Button onClick={this.getPrevEventhistory} variant="outlined" className={classes.button}>
        Prev Page
      </Button>
          </div>
        )
    }
}

AdminTab1.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(AdminTab1);