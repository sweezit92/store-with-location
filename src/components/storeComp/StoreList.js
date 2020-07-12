import React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { withStyles } from '@material-ui/core/styles';
import { useStyles } from '../style/Utils';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@material-ui/core/';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function StoreList(props) {
  const classes = useStyles();
  const rows = props.storeList;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Store Name</StyledTableCell>
            <StyledTableCell>Store Image</StyledTableCell>
            <StyledTableCell>Latitude</StyledTableCell>
            <StyledTableCell>Longitude</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
              rows && rows.length > 0 
              ?
              rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th">
                    {row.storeName}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Avatar alt="Store Image" src={row.storeImage} className={classes.large} />
                  </StyledTableCell>
                  <StyledTableCell>{row.lat}</StyledTableCell>
                  <StyledTableCell>{row.long}</StyledTableCell>
                </StyledTableRow>
              ))
              :
              <StyledTableRow>
                  <StyledTableCell align="center" colspan={4}><b>No Data Found</b></StyledTableCell>
              </StyledTableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = (state) => {
    return {
        storeList: state.firestore.ordered.store
    }
}
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'store' }
    ])
)(StoreList)
