// src/App.js
import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Mi Tienda en Línea</h1>
      </header>
      <main>
        <Cart />
        <ProductList />
      </main>
    </div>
  );
}

export default App;
