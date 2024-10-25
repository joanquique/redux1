import productsReducer, { fetchProducts } from './productsSlice';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const mock = new MockAdapter(axios);

// Configura el mockStore correctamente
const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false, // Puedes desactivar esto si necesitas evitar errores relacionados
  }),
});

describe('productsSlice', () => {
  let mockStore;

  beforeEach(() => {
    // Creamos una nueva instancia de mockStore para cada prueba
    mockStore = configureStore({
      reducer: {
        products: productsReducer,
      },
      middleware: getDefaultMiddleware({
        serializableCheck: false,
      }),
    });
  });

  afterEach(() => {
    mock.reset(); // Resetea el mock después de cada prueba
  });

  test('fetchProducts dispatches the correct actions on success', async () => {
    const products = [
      { id: 1, title: 'Product 1', price: 100, image: 'product1.jpg' },
      { id: 2, title: 'Product 2', price: 200, image: 'product2.jpg' },
    ];

    mock.onGet('https://fakestoreapi.com/products').reply(200, products);

    await mockStore.dispatch(fetchProducts());

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({ type: 'products/fetchProducts/pending' });
    expect(actions[1]).toEqual({ type: 'products/fetchProducts/fulfilled', payload: products });
  });

  test('fetchProducts dispatches the correct actions on failure', async () => {
    mock.onGet('https://fakestoreapi.com/products').reply(500);

    await mockStore.dispatch(fetchProducts());

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({ type: 'products/fetchProducts/pending' });
    expect(actions[1]).toEqual({ type: 'products/fetchProducts/rejected', error: expect.any(Object) });
  });
});