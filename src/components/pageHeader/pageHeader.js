import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import { getCorrectTextColor } from '../../utils/accessibility'
import blueGrey from 'material-ui/colors/blueGrey'

const styles = theme => ({
  pageheader: {
    paddingTop: 5,
    margin: 5
  },
  subheader: {
    color: getCorrectTextColor(blueGrey[50]),
    fontFamily: 'Roboto'
  }
})

const PageHeader = props => {
  const { classes } = props
  return (
    <div className={classes.pageheader}>
      <Typography variant="caption" className={classes.subheader}>
        {props.text.toUpperCase()}
      </Typography>
    </div>
  )
}

PageHeader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(PageHeader)
