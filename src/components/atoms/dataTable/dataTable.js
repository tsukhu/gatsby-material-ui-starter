import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import blueGrey from 'material-ui/colors/blueGrey'
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from 'material-ui/Table'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Edit'
import AddIcon from 'material-ui-icons/Add'
import FilterListIcon from 'material-ui-icons/FilterList'
import { lighten } from 'material-ui/styles/colorManipulator'
import ChallengeForm from '../challengeForm/challengeForm'
import SearchBox from '../searchBox/searchBox'
import { List } from 'immutable'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import { ref, firebaseAuth } from '../../../utils/firebase'
import { login, logout } from '../../../utils/auth'
const uuidv4 = require('uuid/v4')

let counter = 0
function createData(
  name,
  description,
  contributor,
  domain,
  status,
  priority,
  githubURL
) {
  counter += 1
  return {
    id: uuidv4(),
    name,
    description,
    contributor,
    domain,
    status,
    priority,
    githubURL
  }
}

const columnData = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
    type: 'text',
    helperText: 'Challenge Name'
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
    type: 'text',
    helperText: 'Description'
  },
  {
    id: 'contributor',
    numeric: false,
    disablePadding: false,
    label: 'Contributor',
    type: 'text',
    helperText: 'Challenge Name'
  },
  {
    id: 'domain',
    numeric: false,
    disablePadding: false,
    label: 'Domain',
    type: 'text',
    helperText: 'Domain'
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
    type: 'text',
    helperText: 'Status'
  },
  {
    id: 'priority',
    numeric: false,
    disablePadding: false,
    label: 'Priority',
    type: 'text',
    helperText: 'Priority'
  },
  {
    id: 'githubURL',
    numeric: false,
    disablePadding: false,
    label: 'githubURL',
    type: 'text',
    helperText: 'Github URL'
  }
]

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              checked={numSelected === rowCount}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

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

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar)

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
      // data: [
      //   createData(
      //     'Angular Challenge',
      //     'description 1',
      //     'contributor1',
      //     'domain1',
      //     'in-progress',
      //     'High',
      //     'http://www.github.com/ERS-HCL/xxx',
      //     'text',
      //     'Description'
      //   ),
      //   createData(
      //     'ReactJS ',
      //     'description 1',
      //     'contributor1',
      //     'domain1',
      //     'in-progress',
      //     'High',
      //     'http://www.github.com/ERS-HCL/xxx'
      //   ),
      //   createData(
      //     'VueJS',
      //     'description 1',
      //     'contributor1',
      //     'domain1',
      //     'in-progress',
      //     'High',
      //     'http://www.github.com/ERS-HCL/xxx'
      //   ),
      //   createData(
      //     'StoryBook',
      //     'description 1',
      //     'contributor1',
      //     'domain1',
      //     'in-progress',
      //     'High',
      //     'http://www.github.com/ERS-HCL/xxx'
      //   ),
      //   createData(
      //     'Microservices',
      //     'description 1',
      //     'contributor1',
      //     'domain1',
      //     'in-progress',
      //     'High',
      //     'http://www.github.com/ERS-HCL/xxx'
      //   ),
      //   createData(
      //     'Java',
      //     'description 1',
      //     'contributor1',
      //     'domain1',
      //     'in-progress',
      //     'High',
      //     'http://www.github.com/ERS-HCL/xxx'
      //   ),
      //   createData(
      //     'GraphQL',
      //     'description 1',
      //     'contributor1',
      //     'domain1',
      //     'in-progress',
      //     'High',
      //     'http://www.github.com/ERS-HCL/xxx'
      //   ),
      //   createData(
      //     'Node JS',
      //     'description 1',
      //     'contributor1',
      //     'domain1',
      //     'in-progress',
      //     'High',
      //     'http://www.github.com/ERS-HCL/xxx'
      //   ),
      //   createData(
      //     'Andriod',
      //     'description 1',
      //     'contributor1',
      //     'domain1',
      //     'in-progress',
      //     'High',
      //     'http://www.github.com/ERS-HCL/xxx'
      //   ),
      //   createData(
      //     'TerraForm',
      //     'description 1',
      //     'contributor1',
      //     'domain1',
      //     'in-progress',
      //     'High',
      //     'http://www.github.com/ERS-HCL/xxx'
      //   ),
      //   createData(
      //     'Kafka',
      //     'description 1',
      //     'contributor1',
      //     'domain1',
      //     'in-progress',
      //     'High',
      //     'http://www.github.com/ERS-HCL/xxx'
      //   ),
      //   createData(
      //     'Spring Boot 2',
      //     'description 1',
      //     'contributor1',
      //     'domain1',
      //     'in-progress',
      //     'High',
      //     'http://www.github.com/ERS-HCL/xxx'
      //   ),
      //   createData(
      //     'Cypress.io',
      //     'description 1',
      //     'contributor1',
      //     'domain1',
      //     'in-progress',
      //     'High',
      //     'http://www.github.com/ERS-HCL/xxx'
      //   )
      // ].sort((a, b) => (a.name < b.name ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
      editing: false,
      filter: false,
      selectedRow: null,
      isLoggedIn: false,
      showSnackbar: false
    }
    this.dbItems = ref.child('data')
  }

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isLoggedIn: true
        })
      } else {
        this.setState({
          isLoggedIn: false
        })
      }
    })
    this.dbItems.on('value', dataSnapshot => {
      var items = []

      dataSnapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val()
        //        item['.key'] = childSnapshot.key;
        items.push(item)
      })
      console.log(items)
      this.setState({
        data: items.sort((a, b) => (a.name < b.name ? -1 : 1))
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

  handleClick = (event, id) => {
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

        colData = columnData.filter(data => {
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
          helperText: colData[0].helperText
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
    login('test@gmail.com', 'testpwd')
  }

  handleLogOutClick = event => {
    logout()
  }

  handleSaveClick = event => {
    ref
      .child('data')
      .set(this.state.data)
      .then(() => this.setState({ showSnackbar: true }))
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
      page,
      selectedRow,
      isLoggedIn,
      showSnackbar
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
        message={<span id="message-id">Data saved !!</span>}
      />
    ) : null
    return (
      <div className={classes.root}>
        {snackBar}
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
                        onClick={event => this.handleClick(event, n.id)}
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
                        <TableCell padding="none">{n.priority}</TableCell>
                        <TableCell padding="none">{n.status}</TableCell>
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
