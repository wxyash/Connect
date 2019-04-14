import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom'
import { API } from '../controllers/api'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }
  formHandler(event) {
    const name = event.target.name
    const value = event.target.value
    this.setState({ [name]: value })
  }
  register = () => {
    let data = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }
    API.user.register(data).then((s) => {
      window.alert('Registerd Successfully, you may login')
      console.log('Register Successfully', s)
    }).catch((e) => {
      console.log(e)
      console.log(e.message)
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main} >
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
        </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="fname">First Name</InputLabel>
              <Input onChange={this.formHandler.bind(this)} value={this.firstName} id="fname" name="firstName" autoComplete="fname" autoFocus />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="lname">Last Name</InputLabel>
              <Input onChange={this.formHandler.bind(this)} value={this.lastName} id="lname" name="lastName" autoComplete="lname" />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input onChange={this.formHandler.bind(this)} value={this.email} id="email" name="email" autoComplete="email" />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input onChange={this.formHandler.bind(this)} value={this.password} name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.register}
            >
              Submit
          </Button>

          </form>
        </Paper>
        <Button
          type="submit"
          fullWidth
          variant="text"
          color="secondary"
          className={classes.submit}
          component={Link} to="/"
        >
          <b>Already Registered? Click to login as Admin</b>
        </Button>
      </main>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);