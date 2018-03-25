
import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme }  from 'material-ui/styles';
import injectTabEventPlugin from 'react-tap-event-plugin';
import white from 'material-ui/colors';

try {
  injectTabEventPlugin();
} catch(e) {
  // called once per app lifecycle
}

const withMaterialUI = ComposedComponent => {
  class HOC extends Component {
    render() {
      const muiTheme = createMuiTheme({
        fontFamily: 'Roboto, sans-serif',
        appBar: {
          height: 50,
        },
        toolbar: {
          titleFontSize: 'small',
          height: 40
        }
      });
      return (
        <div>
          <MuiThemeProvider theme={muiTheme}>
            <ComposedComponent {...this.props} />
          </MuiThemeProvider>
        </div>
      );
    }
  }
  return HOC;
};

export default withMaterialUI;