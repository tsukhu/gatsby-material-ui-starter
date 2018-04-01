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
import Info from 'material-ui-icons/Info'
import AccountBox from 'material-ui-icons/AccountBox'
import Language from 'material-ui-icons/Language'
import Bookmark from 'material-ui-icons/Bookmark'

import SvgIcon from 'material-ui/SvgIcon';

const GitHubIcon = (props) => (
    <SvgIcon {...props}>
        {<path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>}
    </SvgIcon>
);



const styles = theme => ({
  root: {
    flexGrow: 1,
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
})
class Navigation extends Component {

  state = {
    open: false,
    loaded: true
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      loaded: true
    })
  }


  handleToggle = () => this.setState({ open: !this.state.open })
  handleClose = () => this.setState({ open: false })

  render() {
    const { classes } = this.props
    return this.state.loaded ? (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
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
              variant="body1"
              color="inherit"
              className={classes.flex}
            >
              {this.props.title.toUpperCase()}
            </Typography>
            <Button color="inherit" component={Link} to="/projects" aria-label='ERS-HCL projects'>
              PROJECTS
            </Button>
            <IconButton
              href="//github.com/ERS-HCL/gatsby-demo-app"
              target="_blank" 
              rel="noopener"
              color="inherit"
              toolkit="Source Gatsby Site"
              touch={true}
              aria-label='Github source'
              tooltip="Github source"
              tooltipPosition="bottom-right"
            >
            <GitHubIcon/>
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
                aria-label='Home Page'
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
                aria-label='ERS projects'
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
                aria-label='ERS-HCL publications'
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
                aria-label='All github stats'
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
                aria-label='ERS-HCL About'
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
    ):(<div></div>)
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(Navigation)
