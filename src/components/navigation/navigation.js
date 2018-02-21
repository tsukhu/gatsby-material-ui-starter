import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Link from 'gatsby-link';
import { white } from 'material-ui/styles/colors';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '16px 32px 16px 0'
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
            leftIcon={<ActionHome />}
            containerElement={<Link to="/" />}
          />
          <MenuItem
            primaryText="Projects"
            onClick={this.handleClose}
            leftIcon={<ActionAccountBox />}
            containerElement={<Link to="/projects/" />}
          />
          <MenuItem
            primaryText="About"
            onClick={this.handleClose}
            leftIcon={<ActionInfo />}
            containerElement={<Link to="/about/" />}
          />
        </Drawer>
      </div>
    );
  }
}

export default Navigation;
