import React from 'react';
import '../css/footer.css'; // importation du fichier footer.css
import { Link } from 'react-router-dom'; // importation de Link pour les call to action 

export default function Footer() { // component footer.jsx
  return (
    
      <>
    <div className="boxparentfooter">
    <div className="boxchildrenfooter">
        <h2 id="titlefooter">Contact us</h2><br/>
        <p>Adresse : 51 Boulevard Haussman 75009 Paris </p>
        <p>Téléphone: 01 23 45 67 89 </p>
        <p>Horaires: 9h00-19h00 du Lundi au vendredi</p>
        </div>
      <div className="socialnetworkfooter">
      <h2 id="titlefooter">Follow us</h2>

        <Link to="https://www.facebook.com/?locale=fr_FR"target="_blank" rel="noopener noreferrer"><img
          id="fb1"
          src={require("../assets/facebook.png")}
          alt="Facebook" /></Link>
        <Link to="https://www.instagram.com/"target="_blank" rel="noopener noreferrer"><img
          id="inst1"
          src={require("../assets/instagram.png")}
          alt="Instagram" /></Link>
        <Link to="https://twitter.com/x/" target="_blank" rel="noopener noreferrer"><img
          id="x1"
          src={require("../assets/twitter.png")}
          alt="Twitter" /></Link>
        <Link to="https://www.youtube.com/"target="_blank" rel="noopener noreferrer"><img
          id="y1"
          src={require("../assets/youtube.png")}
          alt="Youtube" /></Link>
         <Link to="https://www.linkedin.com/"target="_blank" rel="noopener noreferrer"><img
          id="l1"
          src={require("../assets/linkedin.png")}
          alt="Linkedin" /></Link>
      </div>
      <div className='copyright'>
      <p>Copyright 2024 . Gérer mes préférences</p>
      <Link to="/informations" rel="noopener noreferrer">
      <p> Informations pratique</p></Link>
      <p><a href="/faq" rel="noopener noreferrer"> FAQ</a></p>

      </div>
      </div>

      <></></>
  );
}
