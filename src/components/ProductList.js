import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';
import './ProductList.css';

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <div className="product-list">
      {/* Título fuera del contenedor de los productos */}
      <h2>Productos Disponibles</h2>
      
      {/* Contenedor de los productos */}
      <div className="product-list-container">
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="product-image" 
            />
            <p>{product.name}</p>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
