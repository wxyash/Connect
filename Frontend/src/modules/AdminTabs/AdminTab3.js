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
    }

    render(){
        const { classes } = this.props;
        return(
            <Paper className={classes.root}>
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
        )
    }
}
AdminTab3.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(AdminTab3);