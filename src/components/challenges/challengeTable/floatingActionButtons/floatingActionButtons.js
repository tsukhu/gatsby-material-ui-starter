import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: '-webkit-sticky',
    position: 'sticky',
    bottom: '1rem',
    alignSelf: 'flex-end'
  },
  root: {
    display: 'flex',
    flexDirection: 'row'
  }
})

function FloatingActionButtons(props) {
  const { classes, onClickEdit, onClickDelete } = props
  return (
    <div className={classes.root}>
      <Button
        variant="fab"
        color="secondary"
        mini
        aria-label="edit"
        className={classes.button}
        onClick={onClickEdit}
      >
        <EditIcon />
      </Button>
      <Button
        variant="fab"
        mini
        aria-label="delete"
        className={classes.button}
        onClick={onClickDelete}
      >
        <DeleteIcon />
      </Button>
    </div>
  )
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FloatingActionButtons)
