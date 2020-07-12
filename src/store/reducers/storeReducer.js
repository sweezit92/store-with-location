const initState = {}

const storeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_STORE_SUCCESS':
      return state;
    case 'CREATE_STORE_ERROR':
      return state;
    default:
      return state;
  }
};

export default storeReducer;