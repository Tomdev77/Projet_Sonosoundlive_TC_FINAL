import React, { useState, useEffect } from 'react';
import "../css/boutonscroll.css"; // importation css Button scroll
import Arrow from "../assets/arrow.png"; // importation emoticone complémentaire

function Bouttonscroll() { // Component Button to scroll

  const [isVisible, setIsVisible] = useState(false); // Etat visibilité button (stock)

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility); // ecouteur d'évenement au défilement sur la fenêtre  du haut vers le bas
    // togglevisibility est appelé lors du déclenchement
    return () => {
      window.removeEventListener('scroll', toggleVisibility); // togglevisibility est enlevé lors du scroll inversé bas vers le haut 
    };
  }, []);

  const toggleVisibility = () => {
    if (window.scrollY > 300) { // Si la position de défilement est supérieure à 300 pixels depuis le haut
      setIsVisible(true);
    } else {
      setIsVisible(false); // Sinon, définit isVisible sur false, indiquant que le bouton doit être masqué
    }
  };

  const scrollToTop = () => {  // Utilise la méthode scrollTotop  pour faire défiler la fenêtre vers le haut de la page

    window.scrollTo({
      top: 0, // position haut de la page
      behavior: 'smooth' // défilement fluide pour améliorer l'ux
    });
  };

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button onClick={scrollToTop}> {/* Bouton pour revenir vers le haut de la page */}
        <img src={Arrow} alt="arrow" className="image" width="25px" height="25px" />

        </button>
      )}
    </div>
  );
}

export default Bouttonscroll;
