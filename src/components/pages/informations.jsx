import React, { useEffect, useState, useMemo } from 'react'; // Importer useState et useEffect et Usememo depuis React
import "../../css/informations.css";

const API_URL = 'https://sonosound.online/wp-json/wp/v2/posts?per_page=100';

const Informations = () => {// Component Sous section Informations du logo Accueil , Dropdown Menu Desktop => chemin liaison Menu.part.jsx + dropdownpart.jsx


  const [informations, setInformations] = useState([]); // Etat pour la récupération des données infos viala méthode fetch (stock)
  const [rechercheInfos, setRechercheInfos] = useState('');//  Etat pour la recherche d'infos (stock)
  const [categorieFiltree] = useState(null); //  Etat pour le filtre d'infos (stock)
  const [aucuneInfosTrouvees, setAucuneInfosTrouvees] = useState(false); // État pour indiquer si aucune info n'est trouvée (stock)
  
  // Déclaration des IDs à afficher et filtrer depuis l'API wp
  const filteredIds = useMemo(() => [452, 496, 522, 526, 536, 554], []); // fonction filtrage des ID => articles intégrés dans wordpress

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const username = 'tom'; // Remplacez par votre nom d'utilisateur
        const password = 'Petitcalvejunior2025!!$$'; 
        const basicAuth = btoa(`${username}:${password}`);
  
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Basic ${basicAuth}`, // Ajout de l'en-tête d'authentification de base
          },
        });
  
        if (!response.ok) {
          throw new Error("La réponse du serveur n'est pas OK");
        }
  
        const data = await response.json();
        const updatedData = data.map(item => ({
          ...item,
          title: item.title.rendered.replace(/&#8211;/g, '-'),
          content: item.content.rendered,
        }));
  
        const sortedData = updatedData.sort((a, b) => {
          return filteredIds.indexOf(a.id) - filteredIds.indexOf(b.id);
        });
  
        setInformations(sortedData);
      } catch (error) {
        console.error("erreur récupération données:", error);
      }
    };
  
    fetchInfos();
  }, [filteredIds]);

  const rechercherInfos = event => { // Fonction pour rechercher des infos
    setRechercheInfos(event.target.value);// Met à jour l'état de recherche d'infos avec la nouvelle valeur
  };

  // Filtrage des infos en fonction des critères de recherche

  const filteredInfos = informations.filter(info => {
    const infosInclus =
      // vérifie si le contenu de l'info contient le terme de recherche pour le nom de l'info
      info.content.toLowerCase().includes(rechercheInfos.toLowerCase()) ||
      // vérifie si le titre de l'info contient le terme de recherche pour le nom de l'info
      info.title.toLowerCase().includes(rechercheInfos.toLowerCase());
    const idInclus = filteredIds.includes(info.id);
    const categorieInclus = !categorieFiltree || info.categorie === categorieFiltree;

    return infosInclus && idInclus && categorieInclus;
  });

  useEffect(() => {
    // Vérifier si aucune information n'a été trouvée après le filtrage
    setAucuneInfosTrouvees(filteredInfos.length === 0 && rechercheInfos !== '');
  }, [informations, rechercheInfos, categorieFiltree, filteredInfos.length]); 

  return (
    <div className="artistes-container1">
      <div className="artistecotainerchild1">
      <h1 className="titreinfos">LE DÉROULEMENT DU FESTIVAL</h1>
      <div className='catbuttoncontainer'>
      </div>
      <input
        type="text"
        placeholder="Rechercher une information"
        value={rechercheInfos} // stock de l'info rentré par l'utilisateur
        onChange={rechercherInfos}// Appel de la fonction rechercherInfos pour mettre à jour l'état de recherche d'infos(stock)
      />

      {/* Afficher les informations filtrées */}
      <div className="artistes-grid1">
        {aucuneInfosTrouvees && (// stock de l'info rentré par l'utilisateur mais fausse,  Si aucuneInfoTrouvee  est vrai, aucun filtrage n'est appliqué.
          <div className="datefindprog">Aucune information trouvée :(</div>
        )}
        {!aucuneInfosTrouvees &&
          filteredInfos.map(info => (// map d ficher json pour récupérer les donnes du fichier json wordpress pour chaque id filtré (id & titré & contenu)
            <div className={`boxlargeinfos`} key={info.id}>
              <a href={info.link} className="partner-link">
                <div>
                  <h2 className="title">{info.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: info.content }} />
                </div>
              </a>
            </div>
          ))}
      </div>
    </div></div>
  );
};

export default Informations;
