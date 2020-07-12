import React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { withStyles } from '@material-ui/core/styles';
import { useStyles } from '../style/Utils';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core/';

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

function OrderList(props) {
    const classes = useStyles();
    const rows = props.orderList;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Order Id</StyledTableCell>
                        <StyledTableCell>Store Id</StyledTableCell>
                        <StyledTableCell>Amount</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows && rows.length > 0
                            ?
                            rows.map((row) => (
                                <StyledTableRow key={row.id}>
                                  <StyledTableCell component="th">{row.orderId}</StyledTableCell>
                                  <StyledTableCell>{row.storeId}</StyledTableCell>
                                  <StyledTableCell>{row.amount}</StyledTableCell>
                                </StyledTableRow>
                            ))
                            :
                            <StyledTableRow>
                                <StyledTableCell align="center" colspan={3}><b>No Data Found</b></StyledTableCell>
                            </StyledTableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        orderList: state.firestore.ordered.order
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'order' }
    ])
)(OrderList)
