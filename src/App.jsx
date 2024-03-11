import React, { useEffect } from "react";
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


function App() {
  
  useEffect(() => {
    const registerServiceWorker = async () => {
      try {
        if ('serviceWorker' in navigator) {
          // Enregistrement du service worker
          const registration = await navigator.serviceWorker.register('/service-worker.js');
          console.log('Service worker registered:', registration);
          await installServiceWorker(); // Installation du cache après l'enregistrement du service worker
        }
      } catch (error) {
        console.log('Service worker registration failed:', error);
      }
    };

    const installServiceWorker = async () => {
      try {
        // Installation du cache
      } catch (error) {
        console.log('Cache installation failed:', error);
      }
    };
    
    registerServiceWorker();
  }, []);
    // App => Squelette de l'app



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
