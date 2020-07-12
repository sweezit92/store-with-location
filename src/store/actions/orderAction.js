export const createOrder = (orderData) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('order').add({
            ...orderData,
            date: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_ORDER_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'CREATE_ORDER_ERROR' }, err);
        });
    }
};