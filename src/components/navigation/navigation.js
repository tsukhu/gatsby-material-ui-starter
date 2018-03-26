import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Menu, { MenuItem } from 'material-ui/Menu'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Link from 'gatsby-link'
import { white } from 'material-ui/colors'
import Home from 'material-ui-icons/Home'
import Info from 'material-ui-icons/Home'
import AccountBox from 'material-ui-icons/AccountBox'
import Language from 'material-ui-icons/Language'
import Bookmark from 'material-ui-icons/Bookmark'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}
class Navigation extends Component {
  state = {
    open: false
  }

  handleToggle = () => this.setState({ open: !this.state.open })
  handleClose = () => this.setState({ open: false })

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              {this.props.title}
            </Typography>
            <Button
              color="inherit"
              href="/projects/"
              containerElement={<Link to="/projects/" />}
              secondary={true}
            >PROJECTS</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <MenuItem
            onClick={this.handleClose}
            primaryText="Home"
            leftIcon={<Home />}
            containerElement={<Link to="/" />}
          />
          <MenuItem
            primaryText="Projects"
            onClick={this.handleClose}
            leftIcon={<AccountBox />}
            containerElement={<Link to="/projects/" />}
          />
          <MenuItem
            primaryText="Publications"
            onClick={this.handleClose}
            leftIcon={<Bookmark />}
            containerElement={<Link to="/publications/" />}
          />
          <MenuItem
            primaryText="Github Stats"
            onClick={this.handleClose}
            leftIcon={<Language />}
            containerElement={<Link to="/githubStats/" />}
          />
          <MenuItem
            primaryText="About"
            onClick={this.handleClose}
            leftIcon={<Info />}
            containerElement={<Link to="/about/" />}
          />
        </Drawer>
      </div>
    )
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navigation)
