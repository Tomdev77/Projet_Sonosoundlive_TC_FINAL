import React, { useEffect, useState, useMemo } from 'react'; // Importer useState et useEffect et Usememo depuis React
import "../../css/partenaires.css";

const API_URL = 'https://sonosound.online/wp-json/wp/v2/posts?per_page=100';

const Partenaires = () => {
  const [categories, setCategories] = useState([]);// Etat pour la récupération des données catégories  via la méthode fetch
  const [rechercheCategorie, setRechercheCategorie] = useState('');//  Etat pour la recherche de catégories (stock)
  const [aucunecategoriesTrouvees, setAucunecategoriesTrouvees] = useState(false); //  État pour indiquer si aucune catégorie n'est trouvée, affiche le message false

  const filteredIds = useMemo(() => [370, 375, 392, 395, 398, 412, 417, 425, 431, 434, 435, 440, 443, 540, 545, 550], []); // fonction filtrage des ID => articles intégrés dans wordpress

  useEffect(() => {
    const fetchCategories = async () => {
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
        setCategories(data); // Met à jour l'état des catégories avec les données récupérées depuis l'API
      } catch (error) {
        console.error("erreur récupération données:", error);
      }
    };
  
    fetchCategories();
  }, [filteredIds]);

  const Recherchercategorie = (categorie) => {// Fonction pour rechercher des catégories
    setRechercheCategorie(categorie);// Met à jour l'état de recherche de catégories avec la nouvelle valeur
  };


  const resetcategorie = () => {// Fonction pour réinitialiser des catégories
    setRechercheCategorie('');// Met à jour l'état de recherche de catégories avec la nouvelle valeur
  };

// Filtrage des artistes en fonction des critères de recherche
  const filtrercategories = categories.filter(categorie => {
      // vérifie si le contenu de la catégorie contient le terme de recherche pour la catégorie
    const categorieInclus = categorie.content.rendered.toLowerCase().includes(rechercheCategorie.toLowerCase());
    const idInclus = filteredIds.includes(categorie.id); 
    return categorieInclus && idInclus;
  });

  useEffect(() => {
    // Vérification, si aucune catégorie n'est trouvé après le filtrage basé sur les catégories
    setAucunecategoriesTrouvees(filtrercategories.length === 0 && rechercheCategorie !== '');
  }, [filtrercategories, rechercheCategorie]);

  return (
    <div className="partner-container">
      <h1 className="titrepartenaires">NOS PARTENAIRES</h1>

      {/* Category buttons */}
      <div className='catbuttoncontainer'>
        <button className='categorie' onClick={() => Recherchercategorie('Food')}>Food</button>
        {/* Bouton de filtre, appel de la fonction Recherchercategorie qui met à jour l'état de recherche catégorie avec l'évenement on click (stock) */}

        <button className='categorie' onClick={() => Recherchercategorie('Collectivite')}>Collectivite</button>
        {/* Bouton de filtre, appel de la fonction Recherchercategorie qui met à jour l'état de recherche catégorie avec l'évenement on click (stock) */}

        <button className='categorie' onClick={() => Recherchercategorie('Transports')}>Transports</button>
        {/* Bouton de filtre, appel de la fonction Recherchercategorie qui met à jour l'état de recherche catégorie avec l'évenement on click (stock) */}

        <button className='categorie' onClick={() => Recherchercategorie('Media')}>Media</button>
        {/* Bouton de filtre, appel de la fonction Recherchercategorie qui met à jour l'état de recherche catégorie avec l'évenement on click (stock) */}

        <button className='categorie' onClick={() => Recherchercategorie('Tourisme')}>Tourisme</button>
        {/* Bouton de filtre, appel de la fonction Recherchercategorie qui met à jour l'état de recherche catégorie avec l'évenement on click (stock) */}

        <button className='categorie' onClick={() => Recherchercategorie('Sécurité')}>Sécurité</button>
        {/* Bouton de filtre, appel de la fonction Recherchercategorie qui met à jour l'état de recherche catégorie avec l'évenement on click (stock) */}

        <button className='categorie' onClick={() => Recherchercategorie('Environnement')}>Environnement</button>
        {/* Bouton de filtre, appel de la fonction Recherchercategorie qui met à jour l'état de recherche catégorie avec l'évenement on click (stock) */}



        <button className='reset2' onClick={resetcategorie}>Réinitialiser les catégories</button>
      {/* La fonction est appelée et met à jour la clé de réinitialisation du carrousel à chaque clic */}
      </div>

      <div className="artistes-grid">
        {/* Filtre les catégories dont le contenu inclut la valeur de recherche (rechercheCategorie)
        Si aucuneCategorieTrouvee  est vrai, aucun filtrage n'est appliqué.
        */} {aucunecategoriesTrouvees && <div className='catfindprog'>Aucune catégorie trouvée :(</div>}
        {!aucunecategoriesTrouvees && filtrercategories.map(category => (// map d ficher json pour récupérer les donnes du fichier json wordpress pour chaque id filtré (id & titré & contenu)
          <div className={`boxlargepart`} key={category.id}>
            <a href={category.link} className="partner-link">
              <div>
                <h2 className='title'>{category.title.rendered}</h2>
                <div dangerouslySetInnerHTML={{ __html: category.content.rendered }} />
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partenaires;
