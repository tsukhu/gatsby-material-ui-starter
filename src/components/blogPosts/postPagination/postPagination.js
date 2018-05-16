import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
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
  }
})

const PostPagination = props => {
  const { classes } = props
  const pageInfo = 'PAGE ' + '(' + props.index + '/' + +props.pageCount + ')'
  const firstElement = !props.isFirstPage ? props.previousUrl : '/'
  const nextElement = !props.isLastPage ? props.nextUrl : '/'

  return (
    <div className={classes.card}>
      <Toolbar>
        <Typography variant="caption" color="inherit" className={classes.flex}>
          {pageInfo}
        </Typography>
        <Button
          className={classes.button}
          size="small"
          disabled={props.isFirstPage}
          component={Link}
          to={firstElement}
          color="primary"
        >
          <ChevronLeft
            className={classNames(classes.leftIcon, classes.iconSmall)}
          />
          Prev
        </Button>
        <Button
          className={classes.button}
          size="small"
          disabled={props.isLastPage}
          component={Link}
          to={nextElement}
          color="primary"
        >
          <ChevronRight
            className={classNames(classes.leftIcon, classes.iconSmall)}
          />
          Next
        </Button>
      </Toolbar>
    </div>
  )
}

PostPagination.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(PostPagination)
