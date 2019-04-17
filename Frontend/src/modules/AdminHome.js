import React from 'react';
import { API } from '../controllers/api';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AdminTab1 from '../modules/AdminTabs/AdminTab1'
import AdminTab2 from '../modules/AdminTabs/Admintab2';
import AdminTab3 from '../modules/AdminTabs/AdminTab3';


const styles = {
    root: {
      flexGrow: 1,
    },
  };

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }

  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

class AdminHome extends React.Component{
    constructor(){
        super()
        this.state = {
            value: 0,
          };
        
    }
    componentDidMount(){
        // var token = localStorage.getItem('token')
        API.admin.varifyToken().then(
            (res)=>{
                console.log(res)
            }
        ).catch((error)=>{
            console.log(error)
            this.props.history.push("/AdminLogin")
        })        
    }
    handleChange = (event, value) => {
        this.setState({ value });
      };

    render(){
        const { classes } = this.props;
        return(
            <div>
                <Paper className={classes.root}>
                <Tabs
                value={this.state.value}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.handleChange}
                centered
                >
                <Tab label="Event History" />
                <Tab label="Events" />
                <Tab label="Rooms" />
                </Tabs>
            </Paper>
            {this.state.value === 0 && <TabContainer>
              <AdminTab1 />
            </TabContainer>}
            {this.state.value === 1 && <TabContainer>
              <AdminTab2 />
            </TabContainer>}
            {this.state.value === 2 && <TabContainer>
              <AdminTab3 />
            </TabContainer>}
          </div>
        )
    }
}

AdminHome.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(AdminHome);