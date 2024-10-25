import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductList from './ProductList';
import { addToCart } from '../features/cart/cartSlice';
import { act } from 'react';

const mockStore = configureStore([]);
const mockDispatch = jest.fn();

const product = { id: 1, title: 'Product 1', price: 100, image: 'product1.jpg' };

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('ProductList Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      products: {
        items: [],
        status: 'idle',
        error: null,
      },
    });
    mockDispatch.mockClear(); // Limpia cualquier llamada previa a mockDispatch
  });

  test('renders loading message when products are being fetched', () => {
    store = mockStore({
      products: {
        items: [],
        status: 'loading',
        error: null,
      },
    });
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    expect(screen.getByText(/Cargando productos.../i)).toBeInTheDocument();
  });

  test('renders error message on fetch failure', () => {
    store = mockStore({
      products: {
        items: [],
        status: 'failed',
        error: 'Failed to fetch products',
      },
    });
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    expect(screen.getByText(/Error: Failed to fetch products/i)).toBeInTheDocument();
  });

  test('renders products when fetch is successful', () => {
    const products = [
      { id: 1, title: 'Product 1', price: 100, image: 'product1.jpg' },
      { id: 2, title: 'Product 2', price: 200, image: 'product2.jpg' },
    ];
    store = mockStore({
      products: {
        items: products,
        status: 'succeeded',
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    products.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    });
  });

  test('calls handleAddToCart when "Agregar al carrito" button is clicked', () => {
    store = mockStore({
      products: {
        items: [product],
        status: 'succeeded',
        error: null,
      },
      cart: { items: [] },
    });

    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    const addButton = screen.getByText('Agregar al carrito');
    fireEvent.click(addButton);

    // Verifica que `mockDispatch` haya sido llamado con la acción específica `addToCart`
    expect(mockDispatch).toHaveBeenCalledWith(addToCart(product));
  });
});
