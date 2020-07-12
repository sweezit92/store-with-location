import storeReducer from './storeReducer'
import orderReducer from './orderReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  store: storeReducer,
  order: orderReducer,
  firestore: firestoreReducer
});

export default rootReducer