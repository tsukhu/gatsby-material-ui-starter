import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Edit'
import AddIcon from 'material-ui-icons/Add'
import FilterListIcon from 'material-ui-icons/FilterList'
import { lighten } from 'material-ui/styles/colorManipulator'
import Button from 'material-ui/Button'

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
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    flex: '0 0 auto'
  },
  actionButtons: {
    display: 'flex'
  },
  title: {
    flex: '0 0 auto'
  }
})

let EnhancedTableToolbar = props => {
  const {
    numSelected,
    classes,
    onClickEdit,
    onClickAdd,
    onClickSearch,
    onClickDelete,
    onClickLogin,
    onClickSave,
    onClickLogout,
    isLoggedIn
  } = props

  const actionButton = isLoggedIn ? (
    <div className={classes.actionButtons}>
      <div onClick={onClickSave} className={classes.actionButton}>
        <Button color="primary">SAVE</Button>
      </div>
      <div onClick={onClickLogout} className={classes.actionButton}>
        <Button color="primary">LOGOUT</Button>
      </div>
    </div>
  ) : (
    <div onClick={onClickLogin}>
      <Button color="primary">LOGIN</Button>
    </div>
  )

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography color="inherit" variant="subheading" />
        )}
      </div>
      <div className={classes.spacer} />
      {actionButton}
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <div>
            <Tooltip title="Edit">
              <IconButton aria-label="Edit" onClick={onClickEdit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton aria-label="Delete" onClick={onClickDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <div>
            <Tooltip title="Add">
              <IconButton aria-label="Add" onClick={onClickAdd}>
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list" onClick={onClickSearch}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
}

export default withStyles(toolbarStyles)(EnhancedTableToolbar)
