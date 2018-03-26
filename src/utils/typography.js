import createMuiTheme from 'material-ui/styles/createMuiTheme'

import purple from 'material-ui/colors/purple'
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'

export default createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
    error: red
  }
})
