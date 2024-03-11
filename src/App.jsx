import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import 'leaflet/dist/leaflet.css';
import Partenaires from './components/pages/partenaires';
import Informations from './components/pages/informations';
import FAQ from './components/pages/faq';
import Accueil from './components/pages/accueil'; 
import Programmations from './components/pages/programmations'; 
import Footer from "./components/footer";
import Artistes from './components/pages/artistes'; 
import Boutonscroll from "./components/scrollbouton";
import 'leaflet/dist/leaflet.css';
import  { useEffect } from 'react';

function App() {

// PWA / Progressive web app 

  useEffect(() => {
    const CACHE_NAME = 'Sonosound';
    const urlsToCache = [
      '/',
      '/styles/main.css',
      '/script/main.js'
    ];

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('Service worker ok PWA :', registration);
          })
          .catch(error => {
            console.log('Service worker erreur PWA:', error);
          });
      });
    }

    // Fonction =>  installation du service worker
    const installServiceWorker = async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(urlsToCache);
      console.log('Cache ok ouvert PWA');
    };

    installServiceWorker();

    // Gestionnaire => intercepte les requêtes réseau, mise en cache pour que l'utilisateur bénéficie du site en hors ligne avec une requête réseau normale
    const handleFetch = async event => {
      event.respondWith(
        (async () => {
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request);
        })()
      );
    };

    window.addEventListener('fetch', handleFetch);

    return () => {
      window.removeEventListener('fetch', handleFetch);
    };


    // App => Squelette de l'app


  }, []);

  return (
    <Router>{/* gestion navigation des routes/chemins, dynamiquement chargés SPA */}
      <Navbar /> {/* Component Navbar top */}
      <div className="App">

      <Routes>
        <Route path='/' element={<Accueil />} /> {/* Navigation auto chemin vers accueil*/}
        <Route path='/informations' element={<Informations />} /> {/*  Navigation liaison chemin vers informations au click sur le menu dropdown "Informations" */}
        <Route path='/programmations' element={<Programmations />} /> {/* Navigation liaison chemin  vers Programmations au click sur Programmations" dans navbar*/}
        <Route path='/artistes' element={<Artistes />} /> {/*  Navigation liaison chemin  vers Artistes au click sur le menu dropdown "Artistes" */}
        <Route path='/partenaires' element={<Partenaires />} /> {/* Navigation liaison chemin vers Partenaires au click sur Partenaires" dans navbar*/}
        <Route path='/faq' element={<FAQ />} /> {/* Navigation liaison chemin vers FAQ au click sur FAQ" dans navbar*/}

      </Routes> 
      <Boutonscroll/> {/* Component Bouton top on scroll qui permet de rendre plus intuitive la navigation */}

      <Footer /> {/* Component Footer bottom  */}
      </div>
    </Router> 
  );
}

export default App;
