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
import HelpIcon from 'material-ui-icons/Help'
import FilterListIcon from 'material-ui-icons/FilterList'
import { lighten } from 'material-ui/styles/colorManipulator'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import green from 'material-ui/colors/green'

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

let EnhancedTableToolbar = props => {
  const {
    user,
    numSelected,
    classes,
    onClickEdit,
    onClickAdd,
    onClickSearch,
    onClickDelete,
    onClickLogin,
    onClickSave,
    onClickLogout,
    onClickHelp,
    isLoggedIn,
    isLoggingIn,
    isSaving,
    isLoading,
    isEditable,
    isDirty,
    showHelp
  } = props
  const actionButton = isLoggedIn ? (
    <div className={classes.actionButtons}>
      {isDirty && (
        <div onClick={onClickSave} className={classes.wrapper}>
          <Tooltip title="Save to database">
            <Button color="primary" disabled={isSaving}>
              SAVE
            </Button>
          </Tooltip>
          {isSaving && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      )}
      <div onClick={onClickLogout} className={classes.wrapper}>
        <Tooltip title={user.email}>
          <Button color="primary">LOGOUT</Button>
        </Tooltip>
      </div>
    </div>
  ) : (
    <div className={classes.wrapper}>
      <Tooltip title="Login (New/Existing)">
        <Button
          color="primary"
          disabled={isLoggingIn || isLoading}
          onClick={onClickLogin}
        >
          LOGIN
        </Button>
      </Tooltip>
      {isLoggingIn && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  )
  const dataLoading = isLoading ? (
    <CircularProgress className={classes.progress} />
  ) : null
  const HelpText = (showHelp ? 'Hide ' : 'Show ') + 'Help'
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
      {dataLoading}
      <div className={classes.spacer} />
      {actionButton}
      <div className={classes.actions}>
        {numSelected > 0 && isLoggedIn === true ? (
          <div>
            {isEditable && (
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
            )}
          </div>
        ) : (
          <div>
            {isLoggedIn === true && (
              <Tooltip title="Add">
                <IconButton aria-label="Add" onClick={onClickAdd}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list" onClick={onClickSearch}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={HelpText}>
              <IconButton aria-label="Help doc" onClick={onClickHelp}>
                <HelpIcon />
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
