import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Link from 'gatsby-link'
import Divider from 'material-ui/Divider'
import { white } from 'material-ui/colors'
import Home from 'material-ui-icons/Home'
import Info from 'material-ui-icons/Home'
import AccountBox from 'material-ui-icons/AccountBox'
import Language from 'material-ui-icons/Language'
import Bookmark from 'material-ui-icons/Bookmark'
import Code from 'material-ui-icons/Code'

const styles = {
  root: {
    flex: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
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
            <Button color="inherit" component={Link} to="/projects">
              PROJECTS
            </Button>
            <IconButton
              href="//github.com/ERS-HCL/gatsby-demo-app"
              target="_blank"
              color="inherit"
            >
              <Code />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.open} onClose={this.handleToggle}>
          <div className={classes.list}>
            <List component="nav">
              <ListItem
                button
                onClick={this.handleClose}
                component={Link}
                to="/"
              >
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/projects"
                onClick={this.handleClose}
              >
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary="Projects" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/publications/"
                onClick={this.handleClose}
              >
                <ListItemIcon>
                  <Bookmark />
                </ListItemIcon>
                <ListItemText primary="Publications" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/githubStats/"
                onClick={this.handleClose}
              >
                <ListItemIcon>
                  <Language />
                </ListItemIcon>
                <ListItemText primary="Github Stats" />
              </ListItem>

              <ListItem
                button
                component={Link}
                to="/about/"
                onClick={this.handleClose}
              >
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    )
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navigation)
