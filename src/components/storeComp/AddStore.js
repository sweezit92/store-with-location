import React, {useState} from 'react'
import { connect } from 'react-redux'
import { createStore } from '../../store/actions/storeAction'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useStyles } from '../style/Utils';
import { Button, Grid, Paper, Modal, TextField, Avatar, Tooltip, Snackbar } from '@material-ui/core/';
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

// const position = {
//     lat: 22.5817,
//     lng: 88.3544
// }

// const position1 = {
//     lat: 22.5797,
//     lng: 88.4143
// }

function AddStore(props) {
    const classes = useStyles();
    const modClasses = modStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState({
        storeImage: "",
        storeName: "",
        lat: null,
        long: null
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            setFormData({
                ...formData,
                storeImage : base64
            })
        });
    }

    const getBase64 = (file) => {
        return new Promise((resolve,reject) => {
           const reader = new FileReader();
           reader.onload = () => resolve(reader.result);
           reader.onerror = error => reject(error);
           reader.readAsDataURL(file);
        });
    }

    const handleSubmit = (e, newState) => {
        e.preventDefault();
        props.createStore(formData);
        setFormData({
            storeImage: "",
            storeName: "",
            lat: null,
            long: null
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
                        Store Added Successfully!
                    </Alert>
                </Snackbar>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Add Store
                </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                >
                    <div style={modalStyle} className={modClasses.paper}>
                        <h2>Create New Store</h2>
                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                            {
                                formData.storeImage !== '' &&
                                <>
                                <Avatar alt="Store Image" src={formData.storeImage} className={classes.large} />
                                <br />
                                </>
                            }
                            <input type="file" name="storeImage" onChange={handleImageChange}
                            />
                            
                            <TextField
                                variant="outlined"
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                label="Store Name"
                                name="storeName"
                                autoFocus
                                value={formData.storeName}
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                name="lat"
                                type="number"
                                label="Latitude"
                                value={formData.lat}
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                name="long"
                                type="number"
                                label="Longitude"
                                value={formData.long}
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Create Store
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
        createStore: (storeData) => dispatch(createStore(storeData))
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'store' }
    ])
)(AddStore)
