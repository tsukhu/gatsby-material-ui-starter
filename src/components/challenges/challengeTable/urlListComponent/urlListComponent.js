import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { challengeTableStyles } from '../../../../style/components/challenges/challenges'

let UrlListComponent = props => {
  const { priority, urls, classes } = props

  return urls
    ? urls.split(',').map(data => (
        <ListItem
          component="a"
          dense
          href={data}
          target="_blank"
          key={data}
          className={classes.hover}
        >
          <ListItemText
            primary={'...' + data.slice(-30)}
            className={classes.gitUrl}
          />
        </ListItem>
      ))
    : null
}

UrlListComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  urls: PropTypes.string
}

export default withStyles(challengeTableStyles)(UrlListComponent)
