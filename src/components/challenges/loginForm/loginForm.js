import React from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'

export default class LoginForm extends React.Component {
  state = {
    open: false,
    username: '',
    password: ''
  }

  componentWillMount() {
    const { open } = this.props
    this.setState({
      open: open
    })
  }

  handleUserNameChange = event => {
    this.setState({
      username: event.target.value
    })
  }

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleLogin = () => {
    this.setState({ open: false })
    this.props.handleLoginSubmit({username: this.state.username, password: this.state.password})
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open form dialog</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>Provide Login Credentials</DialogContentText>
            <form
              noValidate
              autoComplete="on"
              onSubmit={this.handleSubmit}
            >
              <TextField
                autoFocus
                margin="dense"
                id="username"
                label="Email Address"
                type="email"
                fullWidth
                autoComplete="username email"
                onChange={event => this.handleUserNameChange(event)}
              />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                autoComplete="current-password"
                onChange={event => this.handlePasswordChange(event)}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleLogin} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
