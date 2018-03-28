
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme'
// import injectTabEventPlugin from 'react-tap-event-plugin';
import purple from 'material-ui/colors/purple'
import grey from 'material-ui/colors/grey'
import cyan from 'material-ui/colors/cyan'

// try {
//   injectTabEventPlugin();
// } catch(e) {
//   // called once per app lifecycle
// }

const withMaterialUI = ComposedComponent => {
  class HOC extends Component {
    render() {
      const muiTheme = createMuiTheme({
        fontFamily: 'Roboto, sans-serif',
        display: 'flex',
        palette: {
          primary: {
            light: cyan[700],
            main: cyan[800],
            dark: cyan[900],
            contrastText: '#fff',
          },
          secondary: {
            light: grey[300],
            main: grey[800],
            dark: grey[900],
            contrastText: '#E0E0E0',
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