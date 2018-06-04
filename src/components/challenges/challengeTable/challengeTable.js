import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Popover from '@material-ui/core/Popover'
import Snackbar from '@material-ui/core/Snackbar'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { List } from 'immutable'
import * as _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { challengeTableStyles } from '../../../style/components/challenges/challenges'
import { createUser, loginOAuth, logout } from '../../../utils/auth'
import { firebaseAuth, ref } from '../../../utils/firebase'
import ChallengeForm from '../challengeForm/challengeForm'
import ChallengeHeader from '../challengeHeader/challengeHeader'
import HelpInfo from '../helpInfo/helpInfo'
import getColumnData, { createData } from '../metadata'
import Reports from '../reports/reports'
import SearchBox from '../searchBox/searchBox'
import UpVote from '../upvote/upvote'
import ChallengeTableFooter from './challengeTableFooter/challengeTableFooter'
import ChallengeTableHead from './challengeTableHead/challengeTableHead'
import ChallengeTableToolbar from './challengeTableToolbar/challengeTableToolbar'
import PriorityChip from './priorityChip/priorityChip'
import StatusComponent from './statusComponent/statusComponent'
import SelectComponent from './selectComponent/selectComponent'
import UrlListComponent from './urlListComponent/urlListComponent'

class ChallengeTable extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      addInProgress: false,
      open: {},
      anchorEl: null,
      order: 'asc',
      orderBy: 'name',
      selected: [],
      data: [],
      filteredData: [],
      adminUsers: [],
      vote: [],
      votesAvailable: false,
      page: 0,
      rowsPerPage: 15,
      rowsPerPageOptions: [5, 15, 25],
      editing: false, // State: Editing data
      filter: false,
      selectedRow: null,
      isLoggedIn: false,
      isLoggingIn: false, // State: Is Logging in user
      isSaving: false, // State: Saving data
      isLoading: true, // State : Is Loading data
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
    this.dbAuthItems = ref.child('admin')
    this.dbVotes = ref.child('vote')
  }

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        let isAdmin = false
        if (user.email === undefined) user.email = user.displayName

        if (this.state.adminUsers.length === 0) {
          this.dbAuthItems.on('value', dataSnapshot => {
            var items = []

            dataSnapshot.forEach(function(childSnapshot) {
              var item = childSnapshot.val()
              items.push(item)
            })

            this.setState(
              {
                adminUsers: items
              },
              () => {
                isAdmin = this.isAdminUser(user.email)
                this.setState({
                  ...this.state,
                  user: user,
                  isAdmin: isAdmin,
                  isLoggedIn: true,
                  isLoggingIn: false,
                  selected: []
                })
              }
            )
          })
        } else {
          isAdmin = this.isAdminUser(user.email)
          this.setState({
            ...this.state,
            user: user,
            isAdmin: isAdmin,
            isLoggedIn: true,
            isLoggingIn: false,
            selected: []
          })
        }
      } else {
        this.setState({
          ...this.state,
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
        const item = childSnapshot.val()
        items.push(item)
      })

      const sortedItems = items.sort((a, b) => (a.name < b.name ? -1 : 1))
      this.setState({
        data: sortedItems,
        filteredData: sortedItems,
        isLoading: false
      })
    })

    this.dbVotes.on('value', dataSnapshot => {
      var items = []

      dataSnapshot.forEach(function(childSnapshot) {
        const item = childSnapshot.val()
        items.push(item)
      })

      const voteTransformed = _.chain(items)
        .groupBy('id')
        .map((objs, key) => ({
          id: isNaN(key) ? key : +key,
          total: _.reduce(
            objs,
            (count, v) => (v.type === 'upVote' ? count + 1 : count - 1),
            0
          )
        }))
        .value()

      const { data } = this.state
      const mergedVotes = []
      data.forEach(item => {
        const vote = voteTransformed.filter(data => data.id === item.id)[0]
        mergedVotes.push({
          ...item,
          votes: parseInt(vote ? vote.total : 0)
        })
      })

      const newData = mergedVotes.filter(item => this.applyfilter(item))
      //  const open = !!anchorEl;
      let open = {}
      // Set all pop overs off
      newData.map(item => {
        open[item.id] = false
      })
      // console.log(open);
      this.setState({
        ...this.state,
        open,
        vote: items,
        data: mergedVotes,
        filteredData: newData,
        votesAvailable: true
      })
    })
  }
  componentWillUnmount() {
    this.removeListener()
    this.dbItems.off()
    this.dbAuthItems.off()
    this.dbVotes.off()
  }

  handlePopoverOpen = (event, id) => {
    let { open } = this.state
    open[id] = true
    this.setState({ open, anchorEl: event.target })
  }

  handlePopoverClose = (event, id) => {
    let { open } = this.state
    open[id] = false
    this.setState({ open, anchorEl: null })
  }

  isAdminUser = email => {
    const adminUsers = this.state.adminUsers

    const emailMatch =
      adminUsers.filter(user => {
        return user.email.toLowerCase().includes(email.toLowerCase())
      }).length > 0

    const displayNameMatch =
      adminUsers.filter(user => {
        return user.displayName.toLowerCase().includes(email.toLowerCase())
      }).length > 0

    return emailMatch || displayNameMatch
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    const filteredData =
      order === 'desc'
        ? this.state.filteredData.sort(
            (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
          )
        : this.state.filteredData.sort(
            (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)
          )

    this.setState({ filteredData, order, orderBy })
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
      if (key !== 'id' && key !== 'vote' && key !== 'votes') {
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
    if (currentItem['githubURL'] === undefined) {
      formElementsArray.push({
        id: 'githubURL',
        value: '',
        type: 'text',
        disabled: false,
        type: 'text',
        multiline: true,
        helperText: 'Comma separated Github URLs',
        options: []
      })
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

  handleDownloadClick = event => {
    console.log('Download called')
  }

  handleAddClick = event => {
    const { data, orderBy, order } = this.state
    // Create new row
    const newRow = createData(this.state.user.email)
    const newData = List(data)
      .push(newRow)
      .toArray()

    // Update data state as well as
    // select newly created row
    // call edit on the row
    let filteredData = newData.filter(item => this.applyfilter(item))

    filteredData =
      order === 'desc'
        ? filteredData.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : filteredData.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))

    this.setState(
      {
        ...this.state,
        data: newData,
        addInProgress: true,
        filteredData: filteredData
      },
      function() {
        this.handleRowClick(null, newRow.id)
        this.handleEditClick(null)
        this.setState({
          addInProgress: false
        })
      }
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.addInProgress !== nextState.addInProgress &&
      nextState.addInProgress === true
    ) {
      return false
    }
    return true
  }

  handleDeleteClick = event => {
    const { selected, data } = this.state

    const newData = data.filter(item => item.id !== selected[0])
    const filteredData = newData.filter(item => this.applyfilter(item))
    this.setState({
      data: newData,
      selected: [],
      filteredData: filteredData,
      dirty: true,
      editing: false
    })
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
          if (key !== 'id' && key !== 'vote' && key !== 'votes') {
            const entry = formData.filter(data => data.id === key)
            item[key] = entry[0].value
          } else {
            item
          }
        }
        // Hack for older bug
        if (item['githubURL'] === undefined) {
          const entry = formData.filter(data => data.id === 'githubURL')
          item['githubURL'] = entry[0].value
        }
      } else {
        item
      }
    })
    const filteredData = newData
      .toArray()
      .filter(item => this.applyfilter(item))
    this.setState({
      editing: false,
      data: newData.toArray(),
      filteredData: filteredData,
      selected: [],
      dirty: true
    })
  }

  handleFormCancel = event => {
    this.setState({
      ...this.state,
      editing: false
    })
  }

  handleLoginClick = event => {
    loginOAuth()
      .then(data => {
        const username = data.additionalUserInfo.profile.email
          ? data.additionalUserInfo.profile.email
          : data.additionalUserInfo.profile.login

        this.setState({
          showSnackbar: true,
          snackBarMessage: username + ' Logged In'
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

  loginNewUser = (username, password) => {
    createUser(username, password)
      .then(data => {
        const username = data.additionalUserInfo.profile.email
          ? data.additionalUserInfo.profile.email
          : data.additionalUserInfo.profile.login

        this.setState({
          showSnackbar: true,
          snackBarMessage: username + ' Logged In'
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
          isSaving: false,
          dirty: false
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
    this.setState(
      {
        filterText: filter.text,
        filterDomain: filter.domain,
        filterPriority: filter.priority,
        filterStatus: filter.status
      },
      function() {
        const newData = this.state.data.filter(item => this.applyfilter(item))
        this.setState({
          ...this.state,
          filteredData: newData
        })
      }
    )
  }

  canVote = (vote, id, upVote) => {
    let upVoteCount = this.state.vote.filter(
      vote =>
        vote.id === id &&
        vote.email === this.state.user.email &&
        vote.type === 'upVote'
    ).length

    let downVoteCount = this.state.vote.filter(
      vote =>
        vote.id === id &&
        vote.email === this.state.user.email &&
        vote.type === 'downVote'
    ).length

    if (upVote) {
      upVoteCount++
    } else {
      downVoteCount++
    }

    return Math.abs(upVoteCount - downVoteCount) <= 1
  }

  handleUpVote = (id, count) => {
    let refVotes = ref.child('vote')
    // Check if user has previously upvoted
    if (this.canVote(this.state.vote, id, true)) {
      refVotes
        .push({
          id: id,
          email: this.state.user.email,
          type: 'upVote'
        })
        .catch(err => {
          console.log('Error saving up votes:' + err)
        })
    } else {
      this.setState({
        showSnackbar: true,
        snackBarMessage: 'You can up vote only once per challenge'
      })
    }
  }

  handlePriorityChange = (event, id) => {
    let { data, order, orderBy } = this.state
    _.find(data, { id: id }).priority = event.target.value
    this.setState({
      data: data,
      dirty: true
    })
  }

  handleStatusChange = (event, id) => {
    let { data, order, orderBy } = this.state
    _.find(data, { id: id }).status = event.target.value
    this.setState({
      data: data,
      dirty: true
    })
  }

  handleDownVote = (id, count) => {
    let refVotes = ref.child('vote')

    if (this.canVote(this.state.vote, id, false)) {
      refVotes
        .push({
          id: id,
          email: this.state.user.email,
          type: 'downVote'
        })
        .catch(err => {
          console.log('Error saving down votes:' + err)
        })
    } else {
      this.setState({
        showSnackbar: true,
        snackBarMessage: 'You can downvote only once per challenge'
      })
    }
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

    const isApprovalPendingFiltered = true
    /* this.state.isLoggedIn
      ? true
      : !item.status.toLowerCase().includes('Approval Pending'.toLowerCase())
 */
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
    // console.log('render')
    const { classes } = this.props
    const {
      open,
      anchorEl,
      user,
      isAdmin,
      data,
      filteredData,
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
      votesAvailable,
      dirty
    } = this.state

    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, filteredData.length - page * rowsPerPage)
    const snackBar = showSnackbar ? (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={showSnackbar}
        onClose={this.handleCloseSnackBar}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{snackBarMessage}</span>}
      />
    ) : null

    const helpInfo = showHelp ? <HelpInfo /> : null

    return (
      <div className={classes.root}>
        <ChallengeHeader />
        {helpInfo}
        {snackBar}
        {this.state.isLoading === false && <Reports data={data} />}
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
          <ChallengeTableToolbar
            numSelected={selected.length}
            onClickEdit={this.handleEditClick}
            onClickAdd={this.handleAddClick}
            onClickSearch={this.handleSearchClick}
            onClickDelete={this.handleDeleteClick}
            onClickLogin={this.handleLoginClick}
            onClickSave={this.handleSaveClick}
            onClickLogout={this.handleLogOutClick}
            onClickHelp={this.handleHelpClick}
            onClickDownload={this.handleDownloadClick}
            isLoggedIn={isLoggedIn}
            isLoggingIn={isLoggingIn}
            isSaving={isSaving}
            isLoading={isLoading}
            isEditable={isEditable}
            isDirty={dirty}
            showHelp={showHelp}
            user={user}
            data={data}
          />
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <ChallengeTableHead
                numSelected={selected.length}
                isLoggedIn={isLoggedIn}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={filteredData ? filteredData.length : 0}
              />
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id)
                    const mailTo =
                      'mailto:' + n.contributor + '?Subject=' + n.name
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                        className={classes.row}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            onClick={event => this.handleRowClick(event, n.id)}
                          />
                        </TableCell>
                        <TableCell padding="none">
                          {n.name.length > 100
                            ? n.name.slice(0, 100) + '...'
                            : n.name}
                        </TableCell>
                        <TableCell
                          padding="none"
                          onMouseOver={(event, id) =>
                            this.handlePopoverOpen(event, n.id)
                          }
                          onMouseOut={(event, id) =>
                            this.handlePopoverClose(event, n.id)
                          }
                          className={classes.hover}
                        >
                          {n.description.length > 100
                            ? n.description.slice(0, 100) + '...'
                            : n.description}
                          <Popover
                            className={classes.popover}
                            classes={{
                              paper: classes.paperPopover
                            }}
                            open={
                              open ? (open[n.id] ? open[n.id] : false) : false
                            }
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'left'
                            }}
                            transformOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left'
                            }}
                            onClose={(event, id) =>
                              this.handlePopoverClose(event, id)
                            }
                            disableRestoreFocus
                          >
                            <Typography>{n.description}</Typography>
                          </Popover>
                        </TableCell>
                        <TableCell padding="none">
                          <a href={mailTo} target="_top">
                            {n.contributor}
                          </a>
                        </TableCell>
                        <TableCell padding="none">{n.domain}</TableCell>
                        <TableCell padding="none">
                          
                        {isLoggedIn && isAdmin ? (<SelectComponent
                            option={n.status}
                            onChange={(event, id) =>
                              this.handleStatusChange(event, n.id)
                            }
                            disabled={isLoggedIn && isAdmin}
                            options={[
                              {
                                name: 'Approval Pending',
                                value: 'Approval Pending'
                              },
                              { name: 'Backlog', value: 'Backlog Item' },
                              { name: 'Done', value: 'Done' },
                              { name: 'In Progress', value: 'In Progress' }
                            ]}
                          /> ) : (
                            <StatusComponent status={n.status} />
                          )}
                        </TableCell>
                        <TableCell padding="none" className={classes.smallCell}>
                          {isLoggedIn && isAdmin ? (
                            <SelectComponent
                              option={n.priority}
                              onChange={(event, id) =>
                                this.handlePriorityChange(event, n.id)
                              }
                              disabled={isLoggedIn && isAdmin}
                              options={[
                                { name: 'High', value: 'High' },
                                { name: 'Medium', value: 'Medium' },
                                { name: 'Low', value: 'Low' }
                              ]}
                            />
                          ) : (
                            <PriorityChip priority={n.priority} />
                          )}
                        </TableCell>
                        <TableCell padding="none">
                          <UrlListComponent urls={n.githubURL} />
                        </TableCell>
                        <TableCell padding="none">
                          {isLoggedIn && votesAvailable ? (
                            <UpVote
                              votes={n.votes}
                              id={n.id}
                              onUpVote={this.handleUpVote}
                              onDownVote={this.handleDownVote}
                            />
                          ) : (
                            <div />
                          )}
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
              <ChallengeTableFooter
                filteredData={filteredData}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={rowsPerPageOptions}
                handleChangePage={this.handleChangePage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </Table>
          </div>
        </Paper>
      </div>
    )
  }
}

ChallengeTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(challengeTableStyles)(ChallengeTable)
