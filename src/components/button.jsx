import React from 'react';
import '../css/button.css'; // importation Fichier .css button
import { Link } from 'react-router-dom';

function Button() // Component Button Billeterie => Navbar 
  {
  return (
    <Link to='https://www.ticketmaster.fr/fr/concert'
      target="_blank" rel="noopener noreferrer">
    <button className='btn'>Billeterie</button>
  </Link>
  );
}

export default Button;
