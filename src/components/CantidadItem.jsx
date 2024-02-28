//Component para asignar la cantidad que se desea comprar del producto seleccionado.

import React, { useState } from 'react';

const CantidadItem = ({ product, onQuantityChange, onDeleteProduct }) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setQuantity(newQuantity);
      onQuantityChange(product.id, newQuantity);
    }
  };

  return (
    <div className='cart-product' key={product.id}>
      <div className='info-cart-product'>
        <img src={product.urlImage} alt={product.title} className='product-image' />
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={handleQuantityChange}
          className='cantidad-producto-carrito'
        />
        <p className='titulo-producto-carrito'>{product.title}</p>
        <span className='precio-producto-carrito'>${product.price}</span>
      </div>
      <img
        src="https://static.vecteezy.com/system/resources/previews/013/124/554/non_2x/trash-icon-style-free-vector.jpg"
        alt="cerrar"
        className="icon-close"
        onClick={() => onDeleteProduct(product.id)}
      />
    </div>
  );
};

export default CantidadItem;