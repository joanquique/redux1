import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  decreaseQuantity,
  addToCart,
  clearCart,
} from '../features/cart/cartSlice';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleIncrease = (product) => {
    dispatch(addToCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">El carrito está vacío</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li className="cart-item" key={item.product.id}>
                <img src={item.product.image} alt={item.product.title} width="50" />
                <div className="cart-item-details">
                  <h4>{item.product.title}</h4>
                  <p>Precio: ${item.product.price}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <div className="cart-item-actions">
                    <button onClick={() => handleIncrease(item.product)}>+</button>
                    <button onClick={() => handleDecrease(item.product.id)}>-</button>
                    <button onClick={() => handleRemove(item.product.id)}>Eliminar</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={handleClearCart} className="clear-cart-button">
            Vaciar Carrito
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
