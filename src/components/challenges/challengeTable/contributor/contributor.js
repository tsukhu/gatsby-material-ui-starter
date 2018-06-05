import PropTypes from 'prop-types'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { contributorStyle } from '../../../../style/components/contributor/contributorStyle'
import AccountCircle from '@material-ui/icons/AccountCircle'

const Contributor = props => {
  const { classes, email, subject } = props
  if (email === undefined)
    return
  const index = email.indexOf('@') > -1 ? email.indexOf('@') : 5
  const shortId = email.substr(0, index)
  const mailTo = 'mailto:' + email + '?Subject=' + subject
  return (
    <div className={classes.root}>
      <AccountCircle />
      <i>
        <a href={mailTo} target="_top">
          {shortId}
        </a>
      </i>
    </div>
  )
}

Contributor.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired
}

export default withStyles(contributorStyle)(Contributor)
