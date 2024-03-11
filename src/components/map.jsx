import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'; // importation carte  de la bibliothèque js leaflet
import { divIcon, point, Icon } from 'leaflet'; // importation emoticone de leaflet
import 'leaflet/dist/leaflet.css'; // importation css leaflet
import { FullscreenControl } from 'react-leaflet-fullscreen'; // importation ullscreen sur carte leaflet
import MarkerClusterGroup from 'react-leaflet-cluster'; // importation cluster (infos) sur carte leaflet
import '../css/map.css'; // importation carte fichier css
import shopIcon from "../assets/shop.png"; // importation emoticone complémentaire
import WCIcon from "../assets/wc.png"; // importation emoticone complémentaire
import userIconlocation from "../assets/user.png";// importation emoticone complémentaire


const customIcon = new Icon({
    iconUrl: require("../assets/location-pin.png"), // récupération de l'image dans les assets
    iconSize: [38, 38] // définition de sa taille
  });

  const shopMarkerIcon = new Icon({
    iconUrl: shopIcon, // récupération de l'image dans les assets
    iconSize: [38, 38], // définition de sa taille
  });

  const WCMarkerIcon = new Icon({
    iconUrl: WCIcon, // récupération de l'image dans les assets
    iconSize: [38, 38], // définition de sa taille
  });

  const userIcon = new Icon({
    iconUrl: userIconlocation, // récupération de l'image dans les assets
    iconSize: [38, 38], // définition de sa taille
    
  });

  
const createClusterCustomIcon = function (cluster) { // fonction création cluster emoticones // groupe de marqueurs =>> cartographie
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: point(33, 33, true), // 
  });
};

const markers = [ // tableau markers
  {
    geocode: [48.9000, 2.1000], // géocode latitude + longitude 
    popUp: 'Scène 4 - 1 Pl. Charles de Gaulle, 78100 Saint-Germain-en-Laye', // pop up figurant sur la carte
  },
  {
    geocode: [48.9113, 2.0869],
    popUp: 'Scène 5 - Golf Saint germain -  Route de Poissy - 78100 Saint-Germain-en-Laye',
  },
  {
    geocode: [48.8606, 2.2353],
    popUp: 'Scène 3 - Bois de Boulogne -  75016 Paris',
  },
  {
    geocode: [48.8465, 2.2204],
    popUp: 'Scène 2 - Parc de Saint-Cloud - 92210 Saint-Cloud France',
  },
  {
    geocode: [48.8566, 2.3522],
    popUp: 'Scène 1 (principal) - Hôtel de Ville 5 Rue de Lobau - 75004 Paris',
  },

];

const markershop= [
  {
    geocode: [48.9000, 2.1000],
    popUp: 'Buvette Scène 4 - 1 Pl. Charles de Gaulle, 78100 Saint-Germain-en-Laye',
  },
  {
    geocode: [48.9113, 2.0869],
    popUp: 'Buvette Scène 5 - Golf Saint germain -  Route de Poissy - 78100 Saint-Germain-en-Laye',
  },
  {
    geocode: [48.8606, 2.2353],
    popUp: ' Buvette Scène 3 - Bois de Boulogne -  75016 Paris',
  },
  {
    geocode: [48.8465, 2.2204],
    popUp: ' Buvette Scène 2 - Parc de Saint-Cloud - 92210 Saint-Cloud France',
  },
  {
    geocode: [48.8566, 2.3522],
    popUp: 'Buvette Scène 1 (principal) - Hôtel de Ville 5 Rue de Lobau - 75004 Paris',
  },

];

const markerwc= [
  {
    geocode: [48.9000, 2.1000],
    popUp: 'WC Scène 4 - 1 Pl. Charles de Gaulle, 78100 Saint-Germain-en-Laye',
  },
  {
    geocode: [48.9113, 2.0869],
    popUp: 'WC Scène 5 - Golf Saint germain -  Route de Poissy - 78100 Saint-Germain-en-Laye',
  },
  {
    geocode: [48.8606, 2.2353],
    popUp: ' WC Scène 3 - Bois de Boulogne -  75016 Paris',
  },
  {
    geocode: [48.8465, 2.2204],
    popUp: ' WC Scène 2 - Parc de Saint-Cloud - 92210 Saint-Cloud France',
  },
  {
    geocode: [48.8566, 2.3522],
    popUp: 'WC Scène 1 (principal) - Hôtel de Ville 5 Rue de Lobau - 75004 Paris',
  },

];


const CustomMap = () => {
  const [userLocation, setUserLocation] = useState(null); // État pour la localisation de l'utilisateur
  const mapRef = useRef(null); // Référence à l'instance de la carte
  
  useEffect(() => {
    if (userLocation) {
      mapRef.current.setView(userLocation, 15); // Zoom to user location with zoom level 15
    }
  }, [userLocation]);

  const locateUser = () => {
    mapRef.current.locate({setView: true}); // vue location trouvé
  };

  const [markerUser, setMarkerUser] = useState([]);


  const handleLocationFound = (e) => {
    setUserLocation(e.latlng);
  
    // Mettre à jour markerUser avec la position de l'utilisateur
    setMarkerUser([{ geocode: [e.latlng.lat, e.latlng.lng], popUp: 'Ma position' }]);
  };


  return (
    <div className="map-container">
      <h1 className="titlemap">CARTE DU FESTIVAL</h1>
      <MapContainer
        center={[48.9000, 2.1000]}
        zoom={7}
        style={{ height: '500px' }}
        ref={mapRef}
        onLocationfound={handleLocationFound}
      >
       <TileLayer
    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.mapbox.com">MapBox</a>'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
{userLocation && <Marker position={userLocation} icon={userIcon}><Popup>Votre position actuelle</Popup></Marker>} {/* Marqueur utilisateur */}
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {markers.map((marker, index) => ( /* boucle parmi les marqueurs*/
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup> {/* Popup pour le  marqueur */}
            </Marker>
          ))}

          {markershop.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={shopMarkerIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}

          {markerwc.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={WCMarkerIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}

        {markerUser.map((marker, index) => (
        <Marker key={index} position={marker.geocode} icon={userIconlocation}>
        <Popup>{marker.popUp}</Popup>
        </Marker>
          ))}
   
        </MarkerClusterGroup>
        <FullscreenControl position="topright" aria-hidden="true">  </FullscreenControl>

    <button className="locationbuttonMap" onClick={locateUser}>
      Se géolocaliser
    </button>
      </MapContainer>
      {/* La fonction est appelée et met à jour la référence à l'instance de la carte */}

    </div>
  );
};

export default CustomMap;

