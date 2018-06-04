import React from 'react'
import PropTypes from 'prop-types'
import TableFooter from '@material-ui/core/TableFooter'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'

let ChallengeTableFooter = props => {
  const {
    filteredData,
    page,
    rowsPerPage,
    rowsPerPageOptions,
    handleChangePage,
    handleChangeRowsPerPage
  } = props

  return (
    <TableFooter>
    <TableRow>
      <TablePagination
        colSpan={6}
        count={filteredData ? filteredData.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        rowsPerPageOptions={rowsPerPageOptions}
        backIconButtonProps={{
          'aria-label': 'Previous Page'
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page'
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableRow>
  </TableFooter>
  )
}

ChallengeTableFooter.propTypes = {
  filteredData: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  rowsPerPageOptions: PropTypes.array.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired
}

export default ChallengeTableFooter
