
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import injectTabEventPlugin from 'react-tap-event-plugin';
import purple from 'material-ui/colors/purple'
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'

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
        display: 'flex',
        palette: {
          primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
          },
        },
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