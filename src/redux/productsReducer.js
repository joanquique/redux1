const initialState = [
    { id: 1, name: 'Tenis', price: 10, 
        imageUrl: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/323b7d9b4770477f84e1bcff3df08204_9366/Tenis_adidas_Grand_Court_2.0_Negro_ID2963_01_standard.jpg' },
    { id: 2, name: 'Playera', price: 20, 
        imageUrl: 'https://sipromo.mx/cdn/shop/products/playera-pc-cr-mc-joven-100algodon-rojo_1_grande.png?v=1600466500' },
    { id: 3, name: 'Gorra', price: 30, 
        imageUrl: 'https://grupogranpremio.net/wp-content/uploads/2018/10/10.png' },
  ];
  
  const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  
  export default productsReducer;
  