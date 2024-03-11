import React, { useState, useEffect } from 'react'; // importation du hook usestate
import "../../css/accueil.css"; // importation du fichier css accueil 
import CustomMap from '../map'; // component map, importation
import ArtistCarousel from '../Carousel'; // component carousel, importation
import store from '../../assets/billet.png';// images, importation
import ratp from '../../assets/RATP.svg.png';// images, importation
import trivago from '../../assets/trivago_logo_vf.jpg';// images, importation
import { Link } from 'react-router-dom';


export default function Accueil() { // Component section Accueil
  const center = [48.8566, 2.3522]; // données lattitude et longitude de la position sur la carte de l'evenement, paris Ile de france
  const zoom = 13; // zoom carte par défault sur la carte de la page d'accueil 
  const [countdown, setCountdown] = useState(null); // Etat compteur (stock)

  const [nouvelles] = useState([ // Etat pour déclarer les informations dans le fil d'actu de l'accueil et récupération des ces informations avec un map (stock)
  {
      id: 1,
      title: "Calvin Harris - 20h",
      description: "Scène 1 (principal) - Hôtel de Ville 5 Rue de Lobau - 75004 Paris.",
      date: "2024-04-27"
    },
    {
      id: 2,
      title: "Maneskin - 22h",
      description: "Scène 1 (principal) - Hôtel de Ville 5 Rue de Lobau - 75004 Paris.",
      date: "2024-04-27"
    },
    {
      id: 3,
      title: "Orelsan - 20h",
      description: "Scène 2 - Parc de Saint-Cloud - 99210 Saint Cloud France.",
      date: "2024-04-27"
    },
    {
      id: 4,
      title: "Taylor Swift - 22h",
      description: "Scène 2 - Parc de Saint-Cloud - 99210 Saint Cloud France.",
      date: "2024-04-27"
    },

    {
      id: 5,
      title: "SCH - 20h",
      description: "Scène 3 - Bois de Boulogne - 75016 Paris.",
      date: "2024-04-27"
    },
    {
      id: 6,
      title: "Martin Solveig - 22h",
      description: "Scène 3 - Bois de Boulogne - 75016 Paris.",
      date: "2024-04-27"
    },

    {
      id: 7,
      title: "Ofenbach - 20h",
      description: "Scène 4 - Parc saint germain 1 Place Charles de Gaulle - 78300 Saint-Germain-en-Laye.",
      date: "2024-04-27"
    },
    {
      id: 8,
      title: "Blink 182 - 22h",
      description: "Scène 4 - Parc saint germain 1 Place Charles de Gaulle - 78300 Saint-Germain-en-Laye",
      date: "2024-04-27"
    },

    {
      id: 9,
      title: "Jain - 20h",
      description: "Scène 5 - Golf de Saint germain Route de Poissy - 78300 Saint-Germain-en-Laye",
      date: "2024-04-27"
    },
    {
      id: 10,
      title: "Imagine Dragons - 22h",
      description: "Scène 5 - Golf de Saint germain Route de Poissy - 78300 Saint-Germain-en-Laye",
      date: "2024-04-27"
    },  
  ]);



    useEffect(() => {
      const targetDate = new Date('2024-04-27T00:00:00');//  date cible du compte à rebours (30 mars 2024)

      // Fonction pour mettre à jour le compte à rebours
      const updateCountdown = () => {
        const datenow = new Date();
        const ratio = targetDate - datenow;
  
        if (ratio > 0) {
          const days = Math.floor(ratio / (1000 * 60 * 60 * 24)); // calcul multiplication millisecondes x  secondes x minutes x heure
          const hours = Math.floor((ratio % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((ratio % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((ratio % (1000 * 60)) / 1000);
          setCountdown({ days, hours, minutes, seconds });
        } else {
          // Le compte à rebours est terminé
          setCountdown(null);
        }
       

      };
  
      // Mettre à jour le compte à rebours toutes les secondes
      const timer = setInterval(updateCountdown, 1000);
  
      // Nettoyer le timer lorsque le composant est démonté
      return () => clearInterval(timer);
    }, []);

  return (
      <div className="content">
        <div className="actucontainer">
        <ul className="compteurfestival">
            {/* Afficher le compte à rebours */}
            {countdown && (
              <div>
                <h5 id='welcome2'>BIENVENUE</h5>
                <p id='titlecompteurfestival'>SAVE THE DATE 27-04 au 29.04.24  </p>
                <p id="pcompteurfestival"> Il reste {countdown.days} jours, {countdown.hours} heures, {countdown.minutes} minutes, {countdown.seconds} secondes</p>
                <p>________</p>
              </div>
            )}
          </ul>
          <h4 className="actu">FIL D'ACTUALITES </h4>
          <h5>Journée du 27 Avril 2024</h5>
       
          <ul className="news-list">
            {nouvelles.map(item => ( //* mapping des data du tableau array soit 4 items et affichage dans le fil d'actu
              <li key={item.id}>
                <h5>{item.title}</h5>
                <p>{item.description}</p>
                <p>Date: {item.date}</p>
                <p>________</p>
              </li>
            ))}
          </ul>
        </div>
        <div className='billeteriecontainer'> 
          <span className="billet">BILLETERIE </span>
          <ul className="news-list2">
            <img className='store' src={store} alt="Store" width="250px"/> {/* image récupérée de l'importation*/}<br/>
            <a href="https://www.ticketmaster.fr/" target="_blank" rel="noopener noreferrer"> En savoir plus</a>
          </ul>
          <span className="transport">TRANSPORTS </span>
          <ul className="news-list2">
            <img className='ratplogo' src={ratp} alt="RATP" width="250px"/>{/* image récupérée de l'importation*/}<br/>
            <a href="https://www.ratp.fr/" target="_blank" rel="noopener noreferrer">En savoir plus</a>
          </ul>

          <span className="transport">LOGEMENT </span>
          <ul className="news-list2">
            <img className='trivagologo' src={trivago} alt="TRIVAGO" width="250px"/>{/* image récupérée de l'importation*/}<br/>
            <a href="https://www.trivago.fr/" target="_blank" rel="noopener noreferrer">En savoir plus</a>
          </ul>

        </div>
        <CustomMap center={center} zoom={zoom} />{/* component map, récupération des données center et zoom */}
        <ArtistCarousel />
        <div className='containerpartner'>
          <h1 className='partner'>NOS PARTENAIRES</h1>
          <div className='containerlogo'>
         
          <Link to="/partenaires" className="partneranimatedlink"><h1>EPSI WIS</h1> En savoir plus </Link>
          <Link to="/partenaires" className="partneranimatedlink"><h1>Région Ile de France</h1> En savoir plus </Link>
          <Link to="/partenaires" className="partneranimatedlink"><h1>20 Minutes</h1> En savoir plus</Link>
          <Link to="/partenaires" className="partneranimatedlink"><h1>Abritel</h1> En savoir plus </Link>
          <Link to="/partenaires" className="partneranimatedlink"><h1>FlyCup</h1> En savoir plus </Link>

           </div>

          </div>
        </div>

    
  );
}
