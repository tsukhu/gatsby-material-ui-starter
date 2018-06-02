import blueGrey from '@material-ui/core/colors/blueGrey'
import { getCorrectTextColor } from '../../../utils/accessibility'

const pageHeaderStyles = theme => ({
  pageheader: {
    paddingTop: 5,
    margin: 5
  },
  subheader: {
    color: getCorrectTextColor(blueGrey[50]),
    fontFamily: 'Roboto'
  }
})

export {
    pageHeaderStyles
}