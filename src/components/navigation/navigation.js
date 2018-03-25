import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import Menu, { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Link from 'gatsby-link';
import { white } from 'material-ui/colors';
import Home from 'material-ui-icons/Home';
import Info from 'material-ui-icons/Home';
import AccountBox from 'material-ui-icons/AccountBox';
import Language from 'material-ui-icons/Language';
import Bookmark from 'material-ui-icons/Bookmark';

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '16px 32px 16px 0',
    borderRadius: 5,
    shadowRadius: 5
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px'
  }
};
class Navigation extends Component {
  state = {
    open: false
  };

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <AppBar
          style={{ color: white, fontSize: '14px' }}
          title={this.props.title}
          onLeftIconButtonClick={this.handleToggle}
          iconElementRight={
            <MenuItem
              primaryText="PROJECTS"
              style={{ color: white, fontSize: '14px' }}
              containerElement={<Link to="/projects/" />}
            />
          }
        />
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
    );
  }
}

export default Navigation;
