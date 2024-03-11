import React, { useEffect, useState, useMemo } from 'react'; // Importer useState et useEffect et Usememo depuis React
import "../../css/programmations.css";

const API_URL = 'https://sonosound.online/wp-json/wp/v2/posts?per_page=100';

const Artistes = () => {
  const [artistes, setArtistes] = useState([]); // Etat pour la récupération des données artistes via la méthode fetch
  const [rechercheArtiste, setRechercheArtiste] = useState(''); // Etat Recherche d'artiste (stock)
  const [rechercheScene, setRechercheScene] = useState(''); // Etat Recherche de scène (stock)
  const [rechercheDate, setRechercheDate] = useState(''); // Etat Recherche de date (stock)
  const [rechercheLieu, setRechercheLieu] = useState(''); // Etat Recherche de lieu (stock)
  const [aucuneDateTrouvee, setAucuneDateTrouvee] = useState(false); // État pour indiquer si aucune date n'est trouvée (stock)
  const [aucunArtisteTrouve, setAucunArtisteTrouve] = useState(false); // État pour indiquer si aucun artiste n'est trouvé (stock)
  const [aucuneSceneTrouve, setAucuneSceneTrouve] = useState(false); // État pour indiquer si aucun artiste n'est trouvé (stock)

  // Déclaration des IDs à afficher et filtrer depuis l'API wp 
  const filteredIds = useMemo(() => [227, 190, 196, 195, 202, 209, 213, 218, 221, 224, 230, 234, 237, 240, 599, 603, 608, 611, 621, 627, 630, 633, 639, 642, 646, 653, 657, 661, 664, 667], []);// fonction filtrage des ID => articles intégrés dans wordpress

  useEffect(() => {
    const fetchArtistes = async () => {
      try {
        const username = 'tom'; // Remplacez par votre nom d'utilisateur
        const password = 'Petitcalvejunior2025!!$$'; 
        const basicAuth = btoa(`${username}:${password}`);
  
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Basic ${basicAuth}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("La réponse du serveur n'est pas OK");
        }
  
        const data = await response.json();
        setArtistes(data); // Met à jour l'état des artistes avec les données récupérées depuis l'API
      } catch (error) {
        console.error("erreur récupération données:", error);
      }
    };
  
    fetchArtistes();
  }, [filteredIds]);

  const rechercherArtistes = (event) => { // Fonction pour rechercher des artistes
    setRechercheArtiste(event.target.value); // Met à jour l'état de recherche d'artiste avec la nouvelle valeur
};

  const rechercherScenes = (event) => {// Fonction pour rechercher par scène
    setRechercheScene(event.target.value);// Met à jour l'état de recherche de scène avec la nouvelle valeur
  };

  const rechercherDate = (event) => { // Fonction pour rechercher par date
    setRechercheDate(event.target.value); // Met à jour l'état de recherche de date avec la nouvelle valeur
};

  const rechercherLieu = (lieu) => {// Fonction pour rechercher par lieu
    setRechercheLieu(lieu);// Met à jour l'état de recherche de lieu avec la nouvelle valeur
  };


  const reinitialiser = () => {    // Fonction pour réinitialiser  des artistes, dates, lieux scènes.
    setRechercheArtiste('');//  met à jour l'étatde recherche d'artistes avec l'initialisation
    setRechercheDate('');//  met à jour l'étatde recherchede date avec l'initialisation
    setRechercheLieu('')//  met à jour l'étatde recherche de lieu avec l'initialisation
    setRechercheScene('')//  met à jour l'étatde recherche de scène avec l'initialisation
  };

// Filtrage des artistes en fonction des critères de recherche
const filteredArtistes = artistes.filter(a => { // Utilisation de la méthode filter() sur le tableau artistes
  // vérifie si le titre de l'artiste contient le terme de recherche pour le nom de l'artiste
  const nomInclus = a.title.rendered.toLowerCase().includes(rechercheArtiste.toLowerCase());
  
  // vérifie si le titre de l'artiste contient le terme de recherche pour la scène
  const sceneInclus = a.title.rendered.toLowerCase().includes(rechercheScene.toLowerCase());
  
  // vérifie si le contenu de l'artiste contient le terme de recherche pour la date
  const dateInclus = a.content.rendered.toLowerCase().includes(rechercheDate.toLowerCase());
  
  // vérifie si le lieu de l'artiste correspond au lieu recherché, ou si aucun lieu n'est spécifié dans la recherche
  const lieuInclus = rechercheLieu === '' || a.content.rendered.toLowerCase().includes(rechercheLieu.toLowerCase());
  
  // Afficher un message de débogage dans la console
  console.log('retour map data');
  
  // Retourner true si tous les critères de filtrage sont ok pour cet artiste, sinon false
  return nomInclus && sceneInclus && dateInclus && lieuInclus;
});


  useEffect(() => {
    // Vérification, si aucun artiste n'est trouvé après le filtrage basé sur la date
    setAucuneDateTrouvee(filteredArtistes.length === 0 && rechercheDate !== '');
    // Vérification, si aucun artiste n'est trouvé après le filtrage basé sur le nom
    setAucunArtisteTrouve(filteredArtistes.length === 0 && rechercheArtiste !== '');
    // Vérification, si aucun artiste n'est trouvé après le filtrage basé sur la scene
    setAucuneSceneTrouve(filteredArtistes.length === 0 && rechercheScene  !== '');

  // Retourner true si tous les critères de filtrage sont ok pour cet artiste, sinon false
  }, [filteredArtistes, rechercheDate, rechercheArtiste, rechercheScene ]);

  return (
    <div className="artistes-container">
      <h1 className='progtitre'>CONCERTS FESTIVAL</h1>
      <input
        type="text"
        placeholder="Rechercher un artiste ou une heure"
        value={rechercheArtiste}// stock de l'info rentré par l'utilisateur
        onChange={rechercherArtistes}// Appel de la fonction rechercherArtistes pour mettre à jour l'état de recherche d'artiste(stock)
      />
      <input
        type="text"
        placeholder="Rechercher une Scene"
        value={rechercheScene}// stock de l'info rentré par l'utilisateur
        onChange={rechercherScenes}// Appel de la fonction rechercherArtistes pour mettre à jour l'état de recherche de scènes (stock)
      />
      <input
        type="text"
        placeholder="Rechercher une date"
        value={rechercheDate}// stock de l'info rentré par l'utilisateur
        onChange={rechercherDate}// Appel de la fonction rechercherArtistes pour mettre à jour l'état de recherche de date (stock)
        />
      

      <div className='lieubuttoncontainer'>
        <button className='lieu' onClick={() => rechercherLieu('Hotel de Ville')}>Hôtel de Ville</button>
        {/* Bouton de filtre, appel de la fonction rechercher lieu qui met à jour l'état de recherche lieu avec l'évenement on click (stock) */}
        
        <button className='lieu'onClick={() => rechercherLieu('Parc de Saint-Cloud')}>Parc de Saint-Cloud</button>
                {/* Bouton de filtre, appel de la fonction rechercher lieu qui met à jour l'état de recherche lieu avec l'évenement on click (stock) */}

        <button className='lieu'onClick={() => rechercherLieu('Bois de Boulogne')}>Bois de Boulogne</button>
                {/* Bouton de filtre, appel de la fonction rechercher lieu qui met à jour l'état de recherche lieu avec l'évenement on click (stock) */}

        <button className='lieu'onClick={() => rechercherLieu('Parc Saint Germain')}>Parc Saint Germain</button>
                {/* Bouton de filtre, appel de la fonction rechercher lieu qui met à jour l'état de recherche lieu avec l'évenement on click (stock) */}

        <button className='lieu'onClick={() => rechercherLieu('Golf de Saint Germain')}>Golf de Saint Germain</button>
                {/* Bouton de filtre, appel de la fonction rechercher lieu qui met à jour l'état de recherche lieu avec l'évenement on click (stock) */}

        <button className='reset'onClick={reinitialiser}>Réinitialiser tout</button>
        {/* La fonction est appelée et met à jour la clé de réinitialisation du carrousel à chaque clic */}

      </div>

      <div className="artistes-grid">
        {aucuneDateTrouvee && <div className='findprog'>Aucune date trouvée :(</div>} 
        {aucunArtisteTrouve && <div className='findprog'>Aucun artiste trouvé :(</div>}
        {aucuneSceneTrouve && <div className='findprog'>Aucune Scène trouvée :(</div>}
        {/* Filtre les artistes dont le contenu inclut la valeur de recherche (rechercheDate , recherche scene, recherche artiste)
        Si aucuneDateTrouvee ou aucunArtisteTrouve etc est vrai, aucun filtrage n'est appliqué.
        */}
        {!aucuneDateTrouvee && !aucunArtisteTrouve && !aucuneSceneTrouve && filteredArtistes.map((a, index) => (// map d ficher json pour récupérer les donnes du fichier json wordpress pour chaque id filtré (id & titré & contenu)
         <a key={a.id} href='/artistes' className="boxlarge">
         <section>
           <h2>{a.title.rendered}</h2>
           <div dangerouslySetInnerHTML={{ __html: a.content.rendered }} />
         </section>
       </a>
        ))}
      </div>
    </div>
  );
};

export default Artistes;

