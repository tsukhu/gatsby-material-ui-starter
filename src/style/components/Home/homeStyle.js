import blueGrey from '@material-ui/core/colors/blueGrey'

const homeStyle = theme => ({
    paper: {
      display: 'flex',
      transitionEnabled: true,
      backgroundColor: blueGrey[50],
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      shadowRadius: 5,
      margin: 5
    }
  })

export default homeStyle;