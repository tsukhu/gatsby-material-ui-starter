import createMuiTheme from 'material-ui/styles/createMuiTheme'
import 'typeface-roboto';
import purple from 'material-ui/colors/purple'
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'

export default createMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary: purple,
    secondary: green,
    error: red
  }
})
