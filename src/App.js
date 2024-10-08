import './App.css';

// src/App.js
import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      <h1>Mi tienda en línea</h1>
      <ProductList />
      <Cart />
    </div>
  );
}

export default App;
