import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ListSubheader from 'material-ui/List/ListSubheader'
import { getCorrectTextColor } from '../../utils/accessibility'
import blueGrey from 'material-ui/colors/blueGrey'

const styles = theme => ({
  pageheader: {
    paddingTop: 5
  },
  subheader: {
    color: getCorrectTextColor(blueGrey[50])
  }
})

const PageHeader = props => {
  const { classes } = props
  return (
    <div className={classes.pageheader}>
      <ListSubheader className={classes.subheader}>
        {props.text.toUpperCase()}
      </ListSubheader>
    </div>
  )
}

PageHeader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(PageHeader)
