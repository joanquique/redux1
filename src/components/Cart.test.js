import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Cart from './Cart';
import { removeFromCart, decreaseQuantity, addToCart, clearCart } from '../features/cart/cartSlice';

const mockStore = configureStore([]);

describe('Cart Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [],
      },
    });
  });

  test('renders empty cart message when cart is empty', () => {
    act(() => {
        render(
          <Provider store={store}>
            <Cart />
          </Provider>
        );
      });

    expect(screen.getByText(/El carrito está vacío/i)).toBeInTheDocument();
  });

  test('renders cart items and total when cart is not empty', () => {
    const cartItems = [
      {
        product: { id: 1, title: 'Product 1', price: 100, image: 'product1.jpg' },
        quantity: 2,
      },
      {
        product: { id: 2, title: 'Product 2', price: 200, image: 'product2.jpg' },
        quantity: 1,
      },
    ];

    store = mockStore({
      cart: {
        items: cartItems,
      },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText(/Carrito de Compras/i)).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText(/Total: \$400.00/i)).toBeInTheDocument();
  });

  test('calls handleRemove when Eliminar button is clicked', () => {
    const cartItems = [
      {
        product: { id: 1, title: 'Product 1', price: 100, image: 'product1.jpg' },
        quantity: 1,
      },
    ];

    store = mockStore({
      cart: {
        items: cartItems,
      },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const removeButton = screen.getByText('Eliminar');
    fireEvent.click(removeButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(removeFromCart(1));
  });

  test('calls handleDecrease when - button is clicked', () => {
    const cartItems = [
      {
        product: { id: 1, title: 'Product 1', price: 100, image: 'product1.jpg' },
        quantity: 2,
      },
    ];

    store = mockStore({
      cart: {
        items: cartItems,
      },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const decreaseButton = screen.getByText('-');
    fireEvent.click(decreaseButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(decreaseQuantity(1));
  });

  test('calls handleIncrease when + button is clicked', () => {
    const cartItems = [
      {
        product: { id: 1, title: 'Product 1', price: 100, image: 'product1.jpg' },
        quantity: 1,
      },
    ];

    store = mockStore({
      cart: {
        items: cartItems,
      },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const increaseButton = screen.getByText('+');
    fireEvent.click(increaseButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(addToCart(cartItems[0].product));
  });

  test('calls handleClearCart when Vaciar Carrito button is clicked', () => {
    const cartItems = [
      {
        product: { id: 1, title: 'Product 1', price: 100, image: 'product1.jpg' },
        quantity: 1,
      },
    ];

    store = mockStore({
      cart: {
        items: cartItems,
      },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const clearButton = screen.getByText('Vaciar Carrito');
    fireEvent.click(clearButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(clearCart());
  });
});
