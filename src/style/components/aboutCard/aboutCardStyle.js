import blueGrey from '@material-ui/core/colors/blueGrey'

const aboutCardStyle = theme => ({
    card: {
      alignSelf: 'auto',
      flex:'1 1 auto',
      flexDirection: 'column',
      theme: 'inherit',
      margin: 5,
      alignContent: 'center',
      backgroundColor: 'white',
      borderRadius: 5,
      shadowRadius: 5,
      border: '1px grey',
      boxShadow: '3px 3px 3px rgba(68,68,68,0.6)'
    },
    flex: {
      flex: 1
    },
    button: {
      margin: theme.spacing.unit
    },
    leftIcon: {
      marginRight: theme.spacing.unit
    },
    rightIcon: {
      marginLeft: theme.spacing.unit
    },
    iconSmall: {
      fontSize: 20
    },
    paper: {
      margin: 5,
      padding: 10,
      display: 'flex',
      height: '100%',
      minHeight: '100vh',
      transitionEnabled: true,
      backgroundColor: blueGrey[50],
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      flexWrap: 'wrap',
      rounded: true,
      borderRadius: 5,
      shadowRadius: 5
    }
  })

  export default aboutCardStyle;