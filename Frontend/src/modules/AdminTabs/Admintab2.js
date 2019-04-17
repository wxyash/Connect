import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
function createData(Date, Time, Sender, receiver, Message, Room) {
  id += 1;
  return { id, Date, Time, Sender, receiver, Message, Room};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 1),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 1),
    createData('Eclair', 262, 16.0, 24, 6.0, 1),
    createData('Cupcake', 305, 3.7, 67, 4.3, 1),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1),
  ];

class AdminTab2 extends React.Component{
    constructor(){
        super()
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
                        {rows.map(row => (
                            <TableRow className={classes.row} key={row.id}>
                                <CustomTableCell component="th" scope="row">{row.id}</CustomTableCell>
                                <CustomTableCell >{row.Date}</CustomTableCell>
                                <CustomTableCell align="right">{row.Time}</CustomTableCell>
                                <CustomTableCell align="right">{row.Sender}</CustomTableCell>
                                <CustomTableCell align="right">{row.receiver}</CustomTableCell>
                                <CustomTableCell align="right">{row.Message}</CustomTableCell>
                                <CustomTableCell align="right">{row.Room}</CustomTableCell>
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
