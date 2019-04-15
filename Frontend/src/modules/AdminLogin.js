import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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


  class AdminLogin extends React.Component {
      constructor(){
          super()
          this.state = {
              email: '',
              password: ''
          }
      }
      updateEmail(event) {
        this.setState({ email: event.target.value })
      }
    
      updatePassword(event) {
        this.setState({ password: event.target.value })
      }
      login = (e) =>{
        e.preventDefault()
        let data = {
            email: this.state.email,
            password: this.state.password
        }
        API.admin.adminLogin(data).then(
            (res)=>{
                window.alert(`${res.data.msg} You may log in`)
                console.log(res.msg)
            },
            (err) =>{
                window.alert("Your login credintial is invalid, Please enter valid email or password, Login Failed")
            }
        ).catch((error)=>{
            console.log(error)
        })
      }
      render(){
          const { classes } = this.props
          return(
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Admin Login
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input onChange={this.updateEmail.bind(this)} id="email" name="email" autoComplete="email" value={this.state.email} autoFocus required />
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input onChange={this.updatePassword.bind(this)} name="password" type="password" id="password" value={this.state.password} autoComplete="current-password" required />
                        </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.login}
                            >
                            Sign in
                        </Button>
                    </form>
                </Paper>
                <Button
                    type="submit"
                    fullWidth
                    variant="text"
                    color="secondary"
                    component={Link} to="/AdminRegister"
                    >
                    Don't Have An Account? Sign Up.
                </Button>
            </main>
          )
      }
  }

  export default withStyles(styles)(AdminLogin);