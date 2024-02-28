// Componente para dar gracias la usuario.
import React from 'react';

const GraciasItem = ({ title, body }) => {
  return (
    <div className='gracias-item'>
      <h2>{title}</h2>
      <h6>{body}</h6>
    </div>
  );
};

export default GraciasItem;
