const initialState = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];

    case 'REMOVE_FROM_CART':
      const indexToRemove = action.payload;
      return state.filter((_, index) => index !== indexToRemove);

    default:
      return state;
  }
};

export default cartReducer;
