import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'
import ChallengeForm from '../challengeForm/challengeForm'
import LoginForm from '../loginForm/loginForm'
import SearchBox from '../searchBox/searchBox'
import { List } from 'immutable'
import Snackbar from 'material-ui/Snackbar'
import { ref, firebaseAuth } from '../../../utils/firebase'
import { login, logout, createUser } from '../../../utils/auth'
import EnhancedTableHead from './enhancedTableHead/enhancedTableHead'
import EnhancedTableToolbar from './enhancedTableToolbar/enhancedTableToolbar'
import ChallengeHeader from '../challengeHeader/challengeHeader'
import MaterialList, {
  ListItem,
  ListItemIcon,
  ListItemText
} from 'material-ui/List'
import HelpInfo from '../helpInfo/helpInfo'
import getColumnData, { createData } from '../metadata'
import cyan from 'material-ui/colors/cyan'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3
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
      backgroundColor: theme.palette.background.default,
    },
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  gitUrl: {
    theme: 'inherit',
    '&:hover': {
      backgroundColor: cyan[200]
    }
  }
})

class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      order: 'asc',
      orderBy: 'name',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 15,
      rowsPerPageOptions: [5, 15, 25],
      editing: false,
      filter: false,
      selectedRow: null,
      isLoggedIn: false,
      isLoggingIn: false,
      isSaving: false,
      isLoading: false,
      showLogin: false,
      showSnackbar: false,
      snackBarMessage: '',
      user: null,
      isEditable: false, // Check is row is editable or not
      isAdmin: false,
      filterText: null,
      filterDomain: null,
      filterPriority: null,
      filterStatus: null,
      showHelp: false,
      dirty: false
    }
    this.dbItems = ref.child('data')
  }

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        let isAdmin = false
        if (user.email === 'opensource@hcl.com') {
          isAdmin = true
        }
        this.setState({
          user: user,
          isAdmin: isAdmin,
          isLoggedIn: true,
          isLoggingIn: false,
          selected: []
        })
      } else {
        this.setState({
          user: null,
          isAdmin: false,
          isLoggedIn: false,
          selected: []
        })
      }
    })
    this.setState({ isLoading: true })
    this.dbItems.on('value', dataSnapshot => {
      var items = []

      dataSnapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val()
        items.push(item)
      })

      this.setState({
        data: items.sort((a, b) => (a.name < b.name ? -1 : 1)),
        isLoading: false
      })
    })
  }

  componentWillUnmount() {
    this.removeListener()
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))

    this.setState({ data, order, orderBy })
  }

  handleSelectAllClick = (event, checked) => {
    const { editing } = this.state
    if (editing) return
    this.setState({ selected: [] })
  }

  handleRowClick = (event, id) => {
    const { selected, editing, data, isLoggedIn } = this.state
    if (editing || !isLoggedIn) {
      return
    }
    let newSelected = []
    if (selected.indexOf(id) !== 0) newSelected.push(id)
    const currentItem = data.find(item => item.id === id)
    const isEditable = this.checkEditStatus(currentItem)

    const formElementsArray = this.transformRowToForm(currentItem)
    this.setState({
      selected: newSelected,
      isEditable: isEditable,
      selectedRow: formElementsArray.sort(
        (a, b) =>
          a.id === 'name' ? -1 : b.id === 'name' ? 1 : a.id < b.id ? -1 : 1
      )
    })
  }

  checkEditStatus = currentItem => {
    const { isAdmin, user } = this.state
    // If you are not an admin
    // Then you cannot edit any one else's content
    // and for your content you cannot edit any other entry except the Approval Pending ones
    if (!isAdmin) {
      if (
        currentItem.contributor !== user.email ||
        (currentItem.contributor === user.email &&
          currentItem.status !== 'Approval Pending')
      ) {
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  }

  transformRowToForm = currentItem => {
    const formElementsArray = []
    for (let key in currentItem) {
      if (key !== 'id') {
        let colData = []

        colData = getColumnData(this.state.isAdmin).filter(data => {
          return data.id === key
        })
        if (colData === undefined) {
          colData[0] = {
            type: 'text',
            helperText: 'Enter Value'
          }
        }
        formElementsArray.push({
          id: key,
          value: currentItem[key],
          type: colData[0].type,
          multiline: colData[0].multiline ? colData[0].multiline : false,
          helperText: colData[0].helperText,
          disabled: colData[0].disabled ? colData[0].disabled : false,
          options: colData[0].options ? colData[0].options : []
        })
      }
    }
    return formElementsArray
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  handleEditClick = event => {
    const { editing } = this.state
    this.setState({ editing: !editing })
  }

  handleAddClick = event => {
    const { data } = this.state
    // Create new row
    const newRow = createData(this.state.user.email)
    const newData = List(data).push(newRow)

    // Update data state as well as
    // select newly created row
    // call edit on the row
    this.setState(
      {
        data: newData.toArray().sort((a, b) => (a.name < b.name ? -1 : 1))
      },
      function() {
        this.handleRowClick(null, newRow.id)
        this.handleEditClick(null)
      }
    )
  }

  handleDeleteClick = event => {
    const { selected, data } = this.state

    const newData = data.filter(item => item.id !== selected[0])
    this.setState({ data: newData, selected: [], dirty: true })
  }

  handleSearchClick = event => {
    const { filter } = this.state
    this.setState({ filter: !filter })
  }

  handleFormSubmit = (event, formData) => {
    const { selected, data } = this.state
    // Immutable List
    const newData = List(data)

    // Map formData to data list
    newData.map(item => {
      if (item.id === selected[0]) {
        for (let key in item) {
          if (key !== 'id') {
            const entry = formData.filter(data => data.id === key)
            item[key] = entry[0].value
          } else {
            item
          }
        }
      } else {
        item
      }
    })

    this.setState({
      editing: false,
      data: newData.toArray(),
      selected: [],
      dirty: true
    })
  }

  handleFormCancel = event => {
    this.setState({ editing: false })
  }

  handleLoginClick = event => {
    this.setState({ showLogin: true })
  }

  handleLoginCancel = event => {
    this.setState({ showLogin: false, isLoggingIn: false })
  }

  handleLoginSubmit = event => {
    this.setState({ showLogin: false, isLoggingIn: true })
    if (event.usertype === 'new') {
      this.loginNewUser(event.username, event.password)
    } else {
      this.loginExistingUser(event.username, event.password)
    }
  }

  loginNewUser = (username, password) => {
    createUser(username, password)
      .then(data => {
        this.setState({
          showSnackbar: true,
          snackBarMessage: data.email + ' Logged In'
        })
      })
      .catch(err => {
        this.setState({ isLoggingIn: false })
        this.setState({
          showSnackbar: true,
          snackBarMessage: 'Invalid Username/Password'
        })
      })
  }

  loginExistingUser = (username, password) => {
    login(username, password)
      .then(data => {
        this.setState({
          showSnackbar: true,
          snackBarMessage: data.email + ' Logged In'
        })
      })
      .catch(err => {
        this.setState({ isLoggingIn: false })
        this.setState({
          showSnackbar: true,
          snackBarMessage: 'Invalid Username/Password'
        })
      })
  }

  handleLogOutClick = event => {
    logout()
  }

  handleSaveClick = event => {
    this.setState({ isSaving: true })
    ref
      .child('data')
      .set(this.state.data)
      .catch(err => {
        this.setState({
          showSnackbar: true,
          snackBarMessage: 'Failed to save data !!',
          isSaving: false
        })
      })
      .then(() =>
        this.setState({
          showSnackbar: true,
          snackBarMessage: 'Data saved !!',
          isSaving: false
        })
      )
  }

  handleCloseSnackBar = () => {
    this.setState({ showSnackbar: false })
  }

  handleHelpClick = () => {
    this.setState({ showHelp: !this.state.showHelp })
  }

  handleClearFilter = () => {
    this.setState({ filterText: null })
  }

  handleSearchFilter = filter => {
    this.setState({
      filterText: filter.text,
      filterDomain: filter.domain,
      filterPriority: filter.priority,
      filterStatus: filter.status
    })
  }

  applyfilter = item => {
    const isTextFiltered = this.state.filterText
      ? item.name.toLowerCase().includes(this.state.filterText.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(this.state.filterText.toLowerCase())
      : true

    const isDomainFiltered = this.state.filterDomain
      ? item.domain
          .toLowerCase()
          .includes(this.state.filterDomain.toLowerCase())
      : true

    const isPriorityFiltered = this.state.filterPriority
      ? item.priority
          .toLowerCase()
          .includes(this.state.filterPriority.toLowerCase())
      : true

    const isStatusFiltered = this.state.filterStatus
      ? item.status
          .toLowerCase()
          .includes(this.state.filterStatus.toLowerCase())
      : true

    const isApprovalPendingFiltered = this.state.isLoggedIn
      ? true
      : !item.status.toLowerCase().includes('Approval Pending'.toLowerCase())

    return (
      isTextFiltered &&
      isDomainFiltered &&
      isPriorityFiltered &&
      isStatusFiltered &&
      isApprovalPendingFiltered
    )
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1

  render() {
    const { classes } = this.props
    const {
      user,
      isAdmin,
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      rowsPerPageOptions,
      page,
      selectedRow,
      isLoggedIn,
      isLoggingIn,
      isLoading,
      isSaving,
      isEditable,
      showSnackbar,
      snackBarMessage,
      showLogin,
      showHelp,
      dirty
    } = this.state
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
    const snackBar = showSnackbar ? (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={showSnackbar}
        onClose={this.handleCloseSnackBar}
        SnackbarContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{snackBarMessage}</span>}
      />
    ) : null

    const loginForm = showLogin ? (
      <LoginForm
        handleLoginSubmit={this.handleLoginSubmit}
        handleLoginCancel={this.handleLoginCancel}
        open={showLogin}
      />
    ) : null

    const newData = data.filter(item => this.applyfilter(item))
    const getURLs = urlData => {
      const urls = { urlData }

      return urls.urlData
        ? urls.urlData.split(',').map(data => (
            <ListItem
              component="a"
              dense
              href={data}
              target="_blank"
              key={data}
              className={classes.gitUrl}
            >
              <ListItemText primary={data} />
            </ListItem>
          ))
        : null
    }
    const helpInfo = showHelp ? <HelpInfo /> : null
    return (
      <div className={classes.root}>
        <ChallengeHeader />
        {helpInfo}
        {snackBar}
        {loginForm}
        <Paper className={classes.paper}>
          {this.state.editing === true ? (
            <ChallengeForm
              selectedRow={selectedRow}
              handleFormCancel={this.handleFormCancel}
              handleFormSubmit={this.handleFormSubmit}
            />
          ) : null}
          {this.state.filter === true ? (
            <SearchBox
              handleSearch={this.handleSearchFilter}
              searchText={this.state.filterText}
              searchDomain={this.state.filterDomain}
              searchPriority={this.state.filterPriority}
              searchStatus={this.state.filterStatus}
            />
          ) : null}
          <EnhancedTableToolbar
            numSelected={selected.length}
            onClickEdit={this.handleEditClick}
            onClickAdd={this.handleAddClick}
            onClickSearch={this.handleSearchClick}
            onClickDelete={this.handleDeleteClick}
            onClickLogin={this.handleLoginClick}
            onClickSave={this.handleSaveClick}
            onClickLogout={this.handleLogOutClick}
            onClickHelp={this.handleHelpClick}
            isLoggedIn={isLoggedIn}
            isLoggingIn={isLoggingIn}
            isSaving={isSaving}
            isLoading={isLoading}
            isEditable={isEditable}
            isDirty={dirty}
            showHelp={showHelp}
            user={user}
          />
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {newData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id)
                    const mailTo =
                      'mailto:' + n.contributor + '?Subject=' + n.name
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleRowClick(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                        className={classes.row}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell padding="none">{n.name}</TableCell>
                        <TableCell padding="none">{n.description}</TableCell>
                        <TableCell padding="none">
                          <a href={mailTo} target="_top">
                            {n.contributor}
                          </a>
                        </TableCell>
                        <TableCell padding="none">{n.domain}</TableCell>
                        <TableCell padding="none">{n.status}</TableCell>
                        <TableCell padding="none">{n.priority}</TableCell>
                        <TableCell padding="none">
                          {getURLs(n.githubURL)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={6}
                    count={newData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    rowsPerPageOptions={rowsPerPageOptions}
                    backIconButtonProps={{
                      'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                      'aria-label': 'Next Page'
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
      </div>
    )
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EnhancedTable)
