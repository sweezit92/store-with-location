import React, {useState} from 'react'
import { connect } from 'react-redux'
import { createOrder } from '../../store/actions/orderAction'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useStyles } from '../style/Utils';
import { Button, Grid, Paper, Modal, TextField, MenuItem , Tooltip, Snackbar } from '@material-ui/core/';
import MuiAlert from '@material-ui/lab/Alert';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function Alert(props) {
    return <MuiAlert elevation={5} variant="filled" {...props} />;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const modStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: 22.5726,
    lng: 88.3639
};

function AddOrder(props) {
    const classes = useStyles();
    const modClasses = modStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState({
        storeId: "",
        orderId: "",
        amount: null
    })
    const [state, setState] = React.useState({
        alertOpen: false,
        vertical: 'top',
        horizontal: 'center',
    });
    
    const { vertical, horizontal, alertOpen } = state;

    const handleCloseAlert = () => {
        setState({ ...state, alertOpen: false });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e, newState) => {
        e.preventDefault();
        props.createOrder(formData);
        setFormData({
            storeId: "",
            orderId: "",
            amount: null
        })
        handleClose()
        setState({ alertOpen: true,
            vertical: 'top',
            horizontal: 'center',
        });
    }

    console.warn("storeList :", props.storeList);
    const storeList = props.storeList;
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12} justify="center">
                <Snackbar open={alertOpen} autoHideDuration={5000} anchorOrigin={{ vertical, horizontal }} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="success">
                        Order Placed Successfully!
                    </Alert>
                </Snackbar>
                {
                    storeList && storeList.length > 0 
                    ?
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        Add Order
                    </Button>
                    :
                    <b>Create a store first in order to place an order</b>
                }
                
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                >
                    <div style={modalStyle} className={modClasses.paper}>
                        <h2>Create New Order</h2>
                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                            
                            <TextField
                                select
                                size="small"
                                required
                                fullWidth
                                label="Select Store"
                                name="storeId"
                                value={formData.storeId}
                                onChange={handleChange}
                                variant="outlined"
                                >
                                {
                                    storeList && storeList.length > 0 &&
                                storeList.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                    {option.storeName}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                name="orderId"
                                label="Order ID"
                                value={formData.orderId}
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                name="amount"
                                type="number"
                                label="Amount"
                                value={formData.amount}
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Place Order
                            </Button>
                        </form>
                    </div>
                </Modal>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                    <LoadScript
                        googleMapsApiKey="AIzaSyDezh_p4EVyNqYA7DO5Mp6CFSN0JwPu7DU"
                    >
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                        >
                            {
                                storeList && storeList.length > 0 &&
                                storeList.map((data)=>{
                                    console.log("data :", parseFloat(data.lat));
                                    return (
                                        <Tooltip title={data.storeName} arrow key={data.id}>
                                            <Marker
                                                position={{
                                                    "lat": parseFloat(data.lat),
                                                    "lng": parseFloat(data.long)
                                                }}
                                            />
                                        </Tooltip>
                                    );
                                })
                            }
                        </GoogleMap>
                    </LoadScript>
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        storeList: state.firestore.ordered.store
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createOrder: (orderData) => dispatch(createOrder(orderData))
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'store' }
    ])
)(AddOrder)
