import blueGrey from '@material-ui/core/colors/blueGrey'
import green from '@material-ui/core/colors/green'
import cyan from '@material-ui/core/colors/cyan'
import teal from '@material-ui/core/colors/teal'
import deepOrange from '@material-ui/core/colors/deepOrange'
import { lighten } from '@material-ui/core/styles/colorManipulator'

const challengesPageStyle = theme => ({
  paper: {
    margin: 5,
    padding: 10,
    display: 'block',
    height: '100%',
    minHeight: '100vh',
    transitionEnabled: true,
    backgroundColor: teal[200],
    alignContent: 'center',
    alignItems: 'center',
    rounded: true,
    borderRadius: 5,
    shadowRadius: 5
  }
})

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    flex: '0 0 auto'
  },
  actionButtons: {
    display: 'flex',
    flex: '0 0 auto'
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative'
  },
  title: {
    flex: '0 0 auto'
  },
  avatar: {
    margin: 1
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
})

const challengeTableStyles = theme => ({
  root: {
    marginTop: 5
  },
  chipLow: {
    margin: theme.spacing.unit,
    color: '#fff',
    backgroundColor: blueGrey[500]
  },
  chipMedium: {
    margin: theme.spacing.unit,
    color: '#fff',
    backgroundColor: teal[500]
  },
  chipHigh: {
    margin: theme.spacing.unit,
    color: '#fff',
    backgroundColor: deepOrange[500]
  },
  paperPopover: {
    padding: theme.spacing.unit,
    maxWidth: 300
  },
  statusIcon: {
    alignContent: 'center',
    alignItems: 'center',
  },
  paper: {
    margin: 5,
    padding: 10,
    display: 'block',
    height: '100%',
    minHeight: '100vh',
    transitionEnabled: true,
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center',
    rounded: true,
    borderRadius: 5,
    shadowRadius: 5
  },
  table: {
    flex: '1 1 auto'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  button: {
    margin: 0
  },
  votes: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    alignSelf: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
    alignContent: 'middle',
    alignItems: 'middle'
  },
  hover: {
    theme: 'inherit',
    '&:hover': {
      backgroundColor: cyan[200]
    },
    cursor: 'pointer'
  },
  gitUrl: {
    fontSize: 12
  },
  selectEmpty: {
    marginRight: theme.spacing.unit,
    fontSize: 12
  },
  smallCell: {
    maxWidth: 50,
    alignContent: 'center',
    alignItems: 'middle'
  },
  popover: {
    pointerEvents: 'none'
  },
  popperClose: {
    pointerEvents: 'none'
  },
  icon: {
    margin: theme.spacing.unit,
  }
})

const challengeHeaderStyles = theme => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    margin: 5,
    padding: 5,
    transitionEnabled: true,
    rounded: true,
    borderRadius: 5,
    shadowRadius: 5
  },
  card: {
    margin: 5,
    transitionEnabled: true,
    flex: '1 1 auto',
    rounded: true,
    borderRadius: 5,
    shadowRadius: 5,
  },
  media: {
    height: 0,
    paddingTop: '18%'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'white'
  },
  root: {
    width: '90%'
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  subHeader: {
    padding: theme.spacing.unit
  }
})

const challengeFormStyles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'white'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  paper: {
    margin: 5,
    padding: 10,
    transitionEnabled: true,
    backgroundColor: blueGrey[50],
    alignContent: 'center',
    alignItems: 'center',
    rounded: true,
    borderRadius: 5,
    shadowRadius: 5
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  menu: {
    width: 200
  },
  button: {
    alignItems: 'flex-end'
  }
})

export { challengesPageStyle, toolbarStyles, challengeTableStyles, challengeHeaderStyles, challengeFormStyles }
