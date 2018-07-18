import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple'
import grey from '@material-ui/core/colors/grey'
import cyan from '@material-ui/core/colors/cyan'

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
            contrastText: '#fff'
          },
          secondary: {
            light: grey[300],
            main: grey[800],
            dark: grey[900],
            contrastText: '#E0E0E0'
          }
        },
        appBar: {
          height: 50
        },
        toolbar: {
          titleFontSize: 'small',
          height: 40
        }
      })
      return (
          <MuiThemeProvider theme={muiTheme}>
            <ComposedComponent {...this.props} />
          </MuiThemeProvider>
      )
    }
  }
  return HOC
}

export default withMaterialUI
