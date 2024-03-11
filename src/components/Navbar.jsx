import React, { useState, useEffect } from "react";
import "../css/navbar.css"; // importation css Navbar
import Button from "./button"; // importation Component scrollbouton.jsx
/*import Logomusique from "../assets/logomusique.png";*/ 
import Dropdown from './dropdown'; // importation COmponent Dropdown.jsx
import Dropdownpart from './dropdownpart'; // importation COmponent Dropdownpart.jsx

function Navbar() {
  const [showLinks, setShowLinks] = useState(false); // État pour contrôler la visibilité des liens
  const [color, setColor] = useState(false); // État pour contrôler la visibilité de la couleur lors du défilement  (stock)
  const [dropdown1, setDropdown1] = useState(false); // // État pour contrôler l'état du premier menu déroulant  (stock)
  const [dropdown2, setDropdown2] = useState(false) ; // État pour contrôler l'état du deuxième menu déroulant (stock)

// Fonction pour changer l'état de l'affichage des liens
const handleShowLinks = () => {
  setShowLinks(!showLinks);
};

// Fonction pour changer la couleur en fonction de la position de défilement
const changeColor = () => {
  setColor(window.scrollY >= 90);
};

// Effet pour ajouter et supprimer un écouteur d'événement de défilement lorsque le composant est scrollé ou non
useEffect(() => {
  window.addEventListener("scroll", changeColor);
  return () => {
    window.removeEventListener("scroll", changeColor);
  };
}, []);

// Fonction pour gérer le survol des menus déroulants
const onMouseEnter = (dropdown) => {
  if (window.innerWidth >= 960 || window.innerWidth <= 797) {
    if (dropdown === 'dropdown1') {
      setDropdown1(true);
      setDropdown2(false);
    } else if (dropdown === 'dropdown2') {
      setDropdown1(false);
      setDropdown2(true);
    }
  }
};

// Fonction pour gérer la sortie du survol des menus déroulants
const onMouseLeave = () => {
  if (window.innerWidth >= 960 || window.innerWidth <= 797) {
    setDropdown1(false);
    setDropdown2(false);
  }
};

// parametres du premier menu déroulant
const dropdownOptions1 = [
  { title: "Tournées 2025", link: "/tournees" },
];

// parametres du deuxième menu déroulant
const dropdownOptions2 = [
  { title: "Informations", link: "/informations" },
];



  return (
    <nav className={`navbar ${showLinks ? 'show-nav' : 'hide-nav'} ${color ? 'fixed navbar-bg' : 'fixed navbar'}`}> 
    {/* applique et fait apparaitre la navbar ainsi que ses liens  et change sa couleur si true sinon false */}

      <div className="navbar__logo">SONOSOUND</div>
      <ul className="navbar__links">


        <li className="navbar__item slideInDown-1mobile"
         onMouseEnter={() => onMouseEnter('dropdown2')}
         onMouseLeave={onMouseLeave}>
          <a href="/" className="navbar__link">Accueil</a>
          {dropdown2 && <Dropdownpart options={dropdownOptions2} />} 
        </li>

        
        <li className="navbar__item slideInDown-8mobile">
          <a href="/informations" className="navbar__link">Informations</a>
        </li>
        
        <li 
          className="navbar__item slideInDown-2mobile"
          onMouseEnter={() => onMouseEnter('dropdown1')}
          onMouseLeave={onMouseLeave}>


          <a href="/programmations"  className="navbar__link">Programmations</a>
          {dropdown1 && <Dropdown options={dropdownOptions1} />}
        </li>

        <li className="navbar__item slideInDown-3mobile">
          <a href="/artistes" className="navbar__link">Artistes</a>
        </li>


        <li 
          className="navbar__item slideInDown-4mobile">
          <a href="/partenaires" className="navbar__link">Partenaires</a>
        </li>

        <li className="navbar__item slideInDown-5mobile">
        <a href="/faq" className="navbar__link">FAQ</a>

        </li>
        <li className="navbar__item slideInDown-6mobile">
          <Button/>
        </li>
        <li className="navbar__item slideInDown-7mobile">
      {/*<img src={Logomusique} alt="logomusique" className="image" width="50px" height="40px" /> */}
        </li>
      </ul>
      <button className="navbar__burger" onClick={handleShowLinks}>
        <span className="burger-bar"></span>
      </button>
    </nav>
  );
}

export default Navbar;
