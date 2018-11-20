import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import rootTheme from '../../style/components/root'

const withMaterialUI = ComposedComponent => {
  class HOC extends Component {
    render() {
      const muiTheme = createMuiTheme(rootTheme)
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
