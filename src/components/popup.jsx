import React, { useState, useEffect } from 'react';
import "../css/popup.css"; // importation du fichier css Pop up 

function AccueilPopup() { // Component Popup
  const [open, setOpen] = useState(true); // Etat pour ouvrir le modal popup (stock)
  const [timer, setTimer] = useState(15); // Etat Compte à rebours en secondes , valeur 15 secondes (stock)

  useEffect(() => { // Mise en place du compte à rebours affichage pop up
    if (timer > 0 && open) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1500); // met à jour le compte à rebours avec la valeur 15 secondes pour 1500 millisecondes

      return () => clearTimeout(countdown); // Nettoie le compte à rebours lors de la fermeture de la popup
    } else {
      setOpen(false); // Ferme la popup lorsque le compte à rebours atteint zéro
    }
  }, [timer, open]); // Met à jour le compte à rebours et la popup ouverte

  const handleClose = () => { 
    setOpen(false); // met à jour l'affichage  avec set open = false contraire à l'état usestate (true)
  };
  
  return (
    <div className={`popup ${open ? 'open' : ''}`}> 
      <div className="popup-content">
        <span className="close" onClick={handleClose}>&times;</span>
        {/* Appel de la fonction mise à jour de l'état avec setOpen(false)*/}
        <h1>BIENVENUE À VOTRE FESTIVAL</h1><br/>
        <h3>Du 30 mars au 1er avril 2024</h3><br/>
        <h4>Profitez d'une réduction de 20% avec notre code promo <span id='promo'>SONOSOUND24</span></h4><br/>
        <p id='consultbuy'>Découvrez notre billetterie en ligne disponible<a href="https://www.ticketmaster.fr/" target="_blank" rel="noopener noreferrer"> ici</a></p><br/>
        <p>La popup se fermera automatiquement dans {timer} {timer === 1 ? 'seconde' : 'secondes'} ou  cliquer sur la croix de fermeture en haut à droite</p>
      </div>
    </div>
  );
}

export default AccueilPopup;
