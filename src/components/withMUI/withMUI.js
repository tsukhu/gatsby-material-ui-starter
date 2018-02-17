
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import injectTabEventPlugin from 'react-tap-event-plugin';
import {white} from 'material-ui/styles/colors';

try {
  injectTabEventPlugin();
} catch(e) {
  // called once per app lifecycle
}

const withMaterialUI = ComposedComponent => {
  class HOC extends Component {
    render() {
      const muiTheme = getMuiTheme({
        appBar: {
          height: 50
        }
      });
      return (
        <div>
          <MuiThemeProvider muiTheme={muiTheme}>
            <ComposedComponent {...this.props} />
          </MuiThemeProvider>
        </div>
      );
    }
  }
  return HOC;
};

export default withMaterialUI;
