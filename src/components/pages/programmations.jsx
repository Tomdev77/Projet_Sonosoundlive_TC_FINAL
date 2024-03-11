import React, { useEffect, useState, useMemo } from 'react'; // Importer useState et useEffect et Usememo depuis React
import "../../css/programmations.css";
import axios from 'axios'; // Importer Axios



const Artistes = () => {
  const [artistes, setArtistes] = useState([]); // Etat pour la récupération des données artistes via la méthode fetch
  const [searchArtiste, setsearchArtiste] = useState(''); // Etat Recherche d'artiste (stock)
  const [searchStage, setsearchStage] = useState(''); // Etat Recherche de scène (stock)
  const [searchDate, setsearchDate] = useState(''); // Etat Recherche de date (stock)
  const [searchPlace, setsearchPlace] = useState(''); // Etat Recherche de lieu (stock)
  const [nodatefound, setnodatefound] = useState(false); // État pour indiquer si aucune date n'est trouvée (stock)
  const [noartistefound, setnoartistefound] = useState(false); // État pour indiquer si aucun artiste n'est trouvé (stock)
  const [nostagefound, setnostagefound] = useState(false); // État pour indiquer si aucun artiste n'est trouvé (stock)
  // Déclaration des IDs à afficher et filtrer depuis l'API wp 
  const filteredIds = useMemo(() => [1057, 1060, 1061, 1064, 1066, 1068, 1070, 1072, 1074, 1076, 1078, 1080, 1082, 1084, 1086, 1088, 1090, 1092, 1095, 1097, 1099, 1101, 1103, 1105, 1107, 1109, 1111, 1113, 1115, 1117], []);// fonction filtrage des ID => articles intégrés dans wordpress

  useEffect(() => {
    const fetchData = async () => {
        try {
            const username = 'tom';
            const password = 'Petitcalvejunior2025!!$$';
            
            const basicAuth = btoa(`${username}:${password}`);
            const proxyUrl = 'https://corsproxy.io/?';
            const apiUrl = 'https://sonosound.online/wp-json/wp/v2/posts?per_page=30';
            
            
            const response = await axios.get(`${proxyUrl}${encodeURIComponent(apiUrl)}`, {
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Basic ${basicAuth}`,
                  "accept": 'application/json',
              },
          });
            
            const data = response.data;
            console.log(data);
            
            const filteredArticles = data.filter(article => filteredIds.includes(article.id));
    
            // Mettre à jour l'état des artistes avec les données filtrées
            setArtistes(filteredArticles);
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            // Gérer l'erreur réseau ici
        }
    };

    // Appel de la fonction fetchData lors du premier rendu et à chaque changement de filteredIds
    fetchData();
}, [filteredIds]);

  const searchFilterArtistes = (event) => { // Fonction pour rechercher des artistes
    setsearchArtiste(event.target.value); // Met à jour l'état de recherche d'artiste avec la nouvelle valeur
};

  const searchFilterStage = (event) => {// Fonction pour rechercher par scène
    setsearchStage(event.target.value);// Met à jour l'état de recherche de scène avec la nouvelle valeur
  };

  const searchFilterDate = (event) => { // Fonction pour rechercher par date
    setsearchDate(event.target.value); // Met à jour l'état de recherche de date avec la nouvelle valeur
};

  const searchFilterPlace = (lieu) => {// Fonction pour rechercher par lieu
    setsearchPlace(lieu);// Met à jour l'état de recherche de lieu avec la nouvelle valeur
  };


  const reset = () => {    // Fonction pour réinitialiser  des artistes, dates, lieux scènes.
    setsearchArtiste('');//  met à jour l'étatde recherche d'artistes avec l'initialisation
    setsearchDate('');//  met à jour l'étatde recherchede date avec l'initialisation
    setsearchPlace('')//  met à jour l'étatde recherche de lieu avec l'initialisation
    setsearchStage('')//  met à jour l'étatde recherche de scène avec l'initialisation
  };

// Filtrage des artistes en fonction des critères de recherche
const filteredArtistes = artistes.filter(a => { // Utilisation de la méthode filter() sur le tableau artistes
  // vérifie si le titre de l'artiste contient le terme de recherche pour le nom de l'artiste
  const nomInclus = a.title.rendered.toLowerCase().includes(searchArtiste.toLowerCase());
  
  // vérifie si le titre de l'artiste contient le terme de recherche pour la scène
  const sceneInclus = a.title.rendered.toLowerCase().includes(searchStage.toLowerCase());
  
  // vérifie si le contenu de l'artiste contient le terme de recherche pour la date
  const dateInclus = a.content.rendered.toLowerCase().includes(searchDate.toLowerCase());
  
  // vérifie si le lieu de l'artiste correspond au lieu recherché, ou si aucun lieu n'est spécifié dans la recherche
  const lieuInclus = searchPlace === '' || a.content.rendered.toLowerCase().includes(searchPlace.toLowerCase());
  
  // Afficher un message de débogage dans la console
  console.log('retour map data');
  
  // Retourner true si tous les critères de filtrage sont ok pour cet artiste, sinon false
  return nomInclus && sceneInclus && dateInclus && lieuInclus;
});


  useEffect(() => {
    // Vérification, si aucun artiste n'est trouvé après le filtrage basé sur la date
    setnodatefound(filteredArtistes.length === 0 && searchDate !== '');
    // Vérification, si aucun artiste n'est trouvé après le filtrage basé sur le nom
    setnoartistefound(filteredArtistes.length === 0 && searchArtiste !== '');
    // Vérification, si aucun artiste n'est trouvé après le filtrage basé sur la scene
    setnostagefound(filteredArtistes.length === 0 && searchStage  !== '');

  // Retourner true si tous les critères de filtrage sont ok pour cet artiste, sinon false
  }, [filteredArtistes, searchDate, searchArtiste, searchStage ]);

  return (
    <div className="artistes-container">
      <h1 className='progtitre'>CONCERTS FESTIVAL</h1>
      <input
        type="text"
        placeholder="Rechercher un artiste ou une heure"
        value={searchArtiste}// stock de l'info rentré par l'utilisateur
        onChange={searchFilterArtistes}// Appel de la fonction rechercherArtistes pour mettre à jour l'état de recherche d'artiste(stock)
      />
      <input
        type="text"
        placeholder="Rechercher une Scene"
        value={searchStage}// stock de l'info rentré par l'utilisateur
        onChange={searchFilterStage}// Appel de la fonction rechercherArtistes pour mettre à jour l'état de recherche de scènes (stock)
      />
      <input
        type="text"
        placeholder="Rechercher une date"
        value={searchDate}// stock de l'info rentré par l'utilisateur
        onChange={searchFilterDate}// Appel de la fonction rechercherArtistes pour mettre à jour l'état de recherche de date (stock)
        />
      

      <div className='lieubuttoncontainer'>
        <button className='lieu' onClick={() => searchFilterPlace('Hotel de Ville')}>Hôtel de Ville</button>
        {/* Bouton de filtre, appel de la fonction rechercher lieu qui met à jour l'état de recherche lieu avec l'évenement on click (stock) */}
        
        <button className='lieu'onClick={() => searchFilterPlace('Parc de Saint-Cloud')}>Parc de Saint-Cloud</button>
                {/* Bouton de filtre, appel de la fonction rechercher lieu qui met à jour l'état de recherche lieu avec l'évenement on click (stock) */}

        <button className='lieu'onClick={() => searchFilterPlace('Bois de Boulogne')}>Bois de Boulogne</button>
                {/* Bouton de filtre, appel de la fonction rechercher lieu qui met à jour l'état de recherche lieu avec l'évenement on click (stock) */}

        <button className='lieu'onClick={() => searchFilterPlace('Parc Saint Germain')}>Parc Saint Germain</button>
                {/* Bouton de filtre, appel de la fonction rechercher lieu qui met à jour l'état de recherche lieu avec l'évenement on click (stock) */}

        <button className='lieu'onClick={() => searchFilterPlace('Golf de Saint Germain')}>Golf de Saint Germain</button>
                {/* Bouton de filtre, appel de la fonction rechercher lieu qui met à jour l'état de recherche lieu avec l'évenement on click (stock) */}

        <button className='reset'onClick={reset}>Réinitialiser tout</button>
        {/* La fonction est appelée et met à jour la clé de réinitialisation du carrousel à chaque clic */}

      </div>

      <div className="artistes-grid">
        {nodatefound && <div className='findprog'>Aucune date trouvée :(</div>} 
        {noartistefound && <div className='findprog'>Aucun artiste trouvé :(</div>}
        {nostagefound && <div className='findprog'>Aucune Scène trouvée :(</div>}
        {/* Filtre les artistes dont le contenu inclut la valeur de recherche (rechercheDate , recherche scene, recherche artiste)
        Si aucuneDateTrouvee ou aucunArtisteTrouve etc est vrai, aucun filtrage n'est appliqué.
        */}
        {!nodatefound && !noartistefound && !nostagefound && filteredArtistes.map((a, index) => (// map d ficher json pour récupérer les donnes du fichier json wordpress pour chaque id filtré (id & titré & contenu)
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

