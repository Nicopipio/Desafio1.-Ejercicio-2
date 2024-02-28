// Component para listar los productos los cuales se mandan a llamar del JSON
// y añadirlos al carito.

import React from "react";
import data from "../app/data";

export const ProductList = ({
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal,
}) => {

    const onAddProduct = (product) => {
        if (allProducts.find((item) => item.id === product.id)) {
          const products = allProducts.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          setTotal(total + product.price);
          setCountProducts(countProducts + 1);
          return setAllProducts([...products]);
        }
        setTotal(total + product.price);
        setCountProducts(countProducts + 1);
        setAllProducts([...allProducts, { ...product, quantity: 1 }]);
      };
      
return (
    <div className='container-items'>
        {data.map(product => (
            <div className='item' key={product.id}>
                <figure>
                    <img src={product.urlImage} alt={product.title}  />
                    </figure>
                    <div className='info-product'>
                        <h2>{product.title}</h2>
                        <p className='price'>${product.price}</p>
                        <p className='info'>{product.info}</p>
                        <button onClick={() => onAddProduct(product)}>Añadir al carrito</button>
                    </div>
            </div>
        ))}
    </div>
     );
};
