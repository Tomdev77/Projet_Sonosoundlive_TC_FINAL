import React, { useState } from 'react';
import Carousel from 'react-multi-carousel'; // import carrousel 
import 'react-multi-carousel/lib/styles.css'; // Import CSS for react-multi-carousel
import maneskinImage from '../profils/maneskin-2022.jpg'; // import image
import davidGuettaImage from '../profils/davidguetta.jpg'; // import image
import calvinHarrisImage from '../profils/calvinharris.jpg'; // import image
import OrelsanImage from '../profils/orelsanland.jpg'; // import image
import TaylorImage from '../profils/taylor.jpeg'; // import image
import "../css/carousel.css"; // importation Fichier .css carousel
import { Link } from 'react-router-dom'; // import Link
import LazyLoad from 'react-lazy-load';


const ArtistCarousel = () => {

  const [resetCarouselKey, setResetCarouselKey] = useState(0); // Etat stock carrousel =>   valeur 0 

  
const responsiveSettings = { // données qui intègre les param de réactivité du carousel sur les devices , nombre d'éléments à afficher selon les devices
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

  const images = [ // Récupération des données tableau 
    {
      concerts: [
        {
          id: 1,
          artiste: 'Maneskin - 22h',
          stage: 'Scène 1 (principal) - Hôtel de Ville 5 Rue de Lobau - 75004 Paris',
          profil: maneskinImage,
          date : 'Save the date : 2024-04-27',
        },
        {
          id: 2,
          artiste: 'David Guetta - 22h',
          stage: 'Scène 1 (principal) - Hôtel de Ville 5 Rue de Lobau - 75004 Paris',
          profil: davidGuettaImage,
          date : 'Save the date : 2024-04-28',
        },
        {
          id: 3,
          artiste: 'Orelsan - 20h',
          stage: 'Scène 2 - Parc de Saint-Cloud - 99210 Saint Cloud France.',
          profil: OrelsanImage,
          date : ' Save the date : 2024-04-27',
        },
        {
          id: 4,
          artiste: 'Calvin Harris - 20h',
          stage: 'Scène 1 - Hôtel de Ville 5 Rue de Lobau - 75004 Paris',
          profil: calvinHarrisImage,
          date : ' Save the date : 2024-04-27',
        },
        {
          id: 5,
          artiste: 'Taylor Swift- 22h',
          stage: 'Scène 2 - Parc de Saint-Cloud - 99210 Saint Cloud France',
          profil: TaylorImage,
          date : ' Save the date : 2024-04-27',
        },
      ],

    },
  ];
  

  const resetCarousel = () => { // fonction de reinitilisation carousel 
    setResetCarouselKey(prevKey => prevKey + 1); // mise à j0ur de l'état resetCarouselKey , incrémentation + 1 pour forcer le reset et qui diffère à chaque appel de celle-ci
  };

  return (
    <div className="carousel-container">
      <h1 className='titleconcertsweek'>QUELQUES ARTISTES DU FESTIVAL</h1>
      <LazyLoad>      

      <Carousel 
        responsive={responsiveSettings}
        className="crsl"
        autoPlay
        infiniteLoop
        centerMode
        interval={1000}
        key={resetCarouselKey} // clé état récupéré reset et qui agit sur  le carousel
      >
        {images[0].concerts.map((concert) => (
          <div key={concert.id}>

            <Link to="/programmations">
            <img className='img' src={concert.profil} width ="50px" alt={concert.artiste} />
            </Link>
            <p className='artistep'>{concert.artiste}</p>
            <p className='stagep'>{concert.stage}</p>
            <p className='datep'>{concert.date}</p>
          </div>
        ))}
      </Carousel>
        </LazyLoad>

      <span className='resetcarrousel' type="button" onClick={resetCarousel}>Reinitialiser</span>
      {/* La fonction est appelée et met à jour la clé de réinitialisation du carrousel à chaque clic */}

    </div>
  );
};

export default ArtistCarousel;
