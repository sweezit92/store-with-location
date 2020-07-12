export const createStore = (storeData) => {
    return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      firestore.collection('store').add({
        ...storeData,
        date: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_STORE_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_STORE_ERROR' }, err);
      });
    }
  }; 