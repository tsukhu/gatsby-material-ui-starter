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
import { login, logout } from '../../../utils/auth'
import EnhancedTableHead from './enhancedTableHead/enhancedTableHead'
import EnhancedTableToolbar from './enhancedTableToolbar/enhancedTableToolbar'
import getColumnData, { createData } from '../metadata'

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
  tableWrapper: {
    overflowX: 'auto'
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
      rowsPerPageOptions: [5,15,25],
      editing: false,
      filter: false,
      selectedRow: null,
      isLoggedIn: false,
      isLoggingIn: false,
      isLoading: false,
      showLogin: false,
      showSnackbar: false,
      snackBarMessage: ''
    }
    this.dbItems = ref.child('data')
  }

  componentDidMount() {
    
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isLoggedIn: true,
          isLoggingIn: false
        })
      } else {
        this.setState({
          isLoggedIn: false
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
    const { selected, editing, data } = this.state
    if (editing) {
      return
    }
    let newSelected = []
    if (selected.indexOf(id) !== 0) newSelected.push(id)
    const currentItem = data.find(item => item.id === id)
    const formElementsArray = []
    for (let key in currentItem) {
      if (key !== 'id') {
        let colData = []

        colData = getColumnData().filter(data => {
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
          helperText: colData[0].helperText,
          options: colData[0].options? colData[0].options: []
        })
      }
    }

    this.setState({
      selected: newSelected,
      selectedRow: formElementsArray.sort(
        (a, b) =>
          a.id === 'name' ? -1 : b.id === 'name' ? 1 : a.id < b.id ? -1 : 1
      )
    })
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

    const newData = List(data).push(
      createData('A new row', '', '', '', '', '', '', '', '')
    )

    this.setState({
      data: newData.toArray().sort((a, b) => (a.name < b.name ? -1 : 1))
    })
  }

  handleDeleteClick = event => {
    const { selected, data } = this.state

    console.log(selected, selected[0])
    const newData = data.filter(item => item.id !== selected[0])
    console.log(newData)
    this.setState({ data: newData, selected: [] })
    console.log('Delete called!')
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

    this.setState({ editing: false, data: newData.toArray() })
  }

  handleFormCancel = event => {
    this.setState({ editing: false })
  }

  handleLoginClick = event => {
    this.setState({ showLogin: true })
  }

  handleLoginSubmit = event => {
    this.setState({ showLogin: false, isLoggingIn: true })
    login(event.username, event.password)
    .then(
      data => {
        this.setState({ showSnackbar: true , snackBarMessage: data.email + ' Logged In' })
      }
    )
    .catch(err => {
      this.setState({ isLoggingIn: false })
      this.setState({ showSnackbar: true , snackBarMessage: 'Invalid Username/Password' })
    })
  }
  handleLogOutClick = event => {
    logout()
  }

  handleSaveClick = event => {
    ref
      .child('data')
      .set(this.state.data)
      .then(() => this.setState({ showSnackbar: true , snackBarMessage: 'Data saved !!' }))
  }

  handleCloseSnackBar = () => {
    this.setState({ showSnackbar: false })
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1

  render() {
    const { classes } = this.props
    const {
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
      showSnackbar,
      snackBarMessage,
      showLogin
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

    const loginForm = showLogin ? (<LoginForm handleLoginSubmit={this.handleLoginSubmit} open={showLogin}/>): null
    return (
      <div className={classes.root}>
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
          {this.state.filter === true ? <SearchBox /> : null}
          <EnhancedTableToolbar
            numSelected={selected.length}
            onClickEdit={this.handleEditClick}
            onClickAdd={this.handleAddClick}
            onClickSearch={this.handleSearchClick}
            onClickDelete={this.handleDeleteClick}
            onClickLogin={this.handleLoginClick}
            onClickSave={this.handleSaveClick}
            onClickLogout={this.handleLogOutClick}
            isLoggedIn={isLoggedIn}
            isLoggingIn={isLoggingIn}
            isLoading={isLoading}
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
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id)
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleRowClick(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell padding="none">{n.name}</TableCell>
                        <TableCell padding="none">{n.description}</TableCell>
                        <TableCell padding="none">{n.contributor}</TableCell>
                        <TableCell padding="none">{n.domain}</TableCell>
                        <TableCell padding="none">{n.status}</TableCell>
                        <TableCell padding="none">{n.priority}</TableCell>
                        <TableCell padding="none">{n.githubURL}</TableCell>
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
                    count={data.length}
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
