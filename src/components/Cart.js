import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/actions';
import './Cart.css';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">El carrito está vacío</p>
      ) : (
        <ul>
          {cart.map((product, index) => (
            <li className="cart-item" key={`${product.id}-${index}`}>
              <p>{product.name} - ${product.price}</p>
              <button onClick={() => dispatch(removeFromCart(index))}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
