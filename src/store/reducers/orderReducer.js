const initState = {}

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_ORDER_SUCCESS':
      return state;
    case 'CREATE_ORDER_ERROR':
      return state;
    default:
      return state;
  }
};

export default orderReducer;