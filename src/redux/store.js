import { createStore, combineReducers } from 'redux';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';

// Combine los reducers
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

// Crear el store
const store = createStore(rootReducer);

export default store;
