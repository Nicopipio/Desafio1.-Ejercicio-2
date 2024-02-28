// Componente principal. Es el encabezado de la aplicación web, 
//tiene como función es la gestion del carrito de compra.

"use client"

import React, { useState } from 'react';
import CantidadItem from './CantidadItem';
import GraciasItem from './GraciasItem';

export const Headers = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
}) => {

  const [active, setActive] = useState(false);

  const onDeleteProduct = (productId) => {

    // Busca el producto a eliminar

    const deletedProduct = allProducts.find((item) => item.id === productId);
  
    // Pregunta al usuario si está seguro de eliminar el producto

    const isConfirmed = window.confirm(`¿Estás seguro de eliminar "${deletedProduct.title}" del carrito?`);
  
    // Si el usuario confirma, procede con la eliminación.

    if (isConfirmed) {
      const updatedProducts = allProducts.filter((item) => item.id !== productId);
      setTotal(total - deletedProduct.price * deletedProduct.quantity);
      setCountProducts(countProducts - deletedProduct.quantity);
      setAllProducts(updatedProducts);
    }
  };

  const onQuantityChange = (productId, newQuantity) => {
    const updatedProducts = allProducts.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setAllProducts(updatedProducts);
    updateTotalAndCount(updatedProducts);
  };

  // Función que calcula el total. 

  const updateTotalAndCount = (updatedProducts) => {
    const newTotal = updatedProducts.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    const newCount = updatedProducts.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    setTotal(newTotal);
    setCountProducts(newCount);
  };

  //Función para limpiar el carrito
  const onCleanCart = () => {
    const confirmarVaciar = window.confirm('¿Seguro que deseas vaciar el carrito de compras?');

    if (confirmarVaciar) {
      setAllProducts([]);
      setTotal(0);
      setCountProducts(0);
    }
  };

  return (
    <header>
      <h1> Café Himalaya</h1>
      <div className='container-icon'>

        <div className='container-cart-icon' onClick={() => setActive(!active)}>
          <img
            src="https://e7.pngegg.com/pngimages/833/426/png-clipart-black-shopping-cart-icon-for-free-black-shopping-cart.png"
            alt="carrito"
            className="icon-cart"
          />
          <div className='count-products'>
            <span id='contador-productos'>{countProducts}</span>
          </div>
        </div>
        <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
          {allProducts.length ? (
            <>
              <div className='row-product'>

               {/*Component para dar gracias al usuario por la compra.*/}
                <GraciasItem
                  title="¡Gracias por tu compra!"
                  body="Te agradecemos por elegir Café Himalaya. ¡Esperamos que disfrutes de nuestros productos!"
                />

              {/*Component para asignar la cantidad que se desea comprar del producto seleccionado. */}
                {allProducts.map((product) => (
                  <CantidadItem
                    key={product.id}
                    product={product}
                    onQuantityChange={onQuantityChange}
                    onDeleteProduct={onDeleteProduct}

                  />
                ))}
                
              </div>
              <div className='cart-total'>
                <h3>Total:</h3>
                <span className='total-pagar'>${total}</span>
              </div>
              <button className='btn-clear-all' onClick={onCleanCart}>
                Vaciar Carrito
              </button>
            </>
          ) : (
            <p className='cart-empty'>El carrito está vacío</p>
          )}
        </div>
      </div>
    </header>
   
  );
};