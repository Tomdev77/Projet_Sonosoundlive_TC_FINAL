import React, { useEffect, useState, useMemo } from 'react'; // Importer useState et useEffect et Usememo depuis React
import "../../css/partenaires.css";
import axios from 'axios'; // Importer Axios



const Partenaires = () => {
  const [category, setCategories] = useState([]);// Etat pour la récupération des données catégories  via la méthode fetch
  const [searchCategory, setsearchCategoy] = useState('');//  Etat pour la recherche de catégories (stock)
  const [nocategoryfound, setnocategoryfound] = useState(false); //  État pour indiquer si aucune catégorie n'est trouvée, affiche le message false
  const filteredIds = useMemo(() => [370, 375, 392, 395, 398, 412, 417, 425, 431, 434, 435, 440, 443, 540, 545, 550], []); // fonction filtrage des ID => articles intégrés dans wordpress

  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const username = 'tom';
            const password = 'Petitcalvejunior2025!!$$';
            
            const basicAuth = btoa(`${username}:${password}`);
            const proxyUrl = 'https://corsproxy.io/?';
            const apiUrl = 'https://sonosound.online/wp-json/wp/v2/posts?per_page=100';
            
            
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
            setCategories(filteredArticles);
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            // Gérer l'erreur réseau ici
        }
    };

    // Appel de la fonction fetchData lors du premier rendu et à chaque changement de filteredIds
    fetchCategories();
}, [filteredIds]);

  
  const searchFilterCategory = (category) => {// Fonction pour rechercher des catégories
    setsearchCategoy(category);// Met à jour l'état de recherche de catégories avec la nouvelle valeur
  };


  const resetcategory = () => {// Fonction pour réinitialiser des catégories
    setsearchCategoy('');// Met à jour l'état de recherche de catégories avec la nouvelle valeur
  };

// Filtrage des artistes en fonction des critères de recherche
  const filtrercategories = category.filter(category => {
      // vérifie si le contenu de la catégorie contient le terme de recherche pour la catégorie
    const categorieInclus = category.content.rendered.toLowerCase().includes(searchCategory.toLowerCase());
    const idInclus = filteredIds.includes(category.id); 
    return categorieInclus && idInclus;
  });

  useEffect(() => {
    // Vérification, si aucune catégorie n'est trouvé après le filtrage basé sur les catégories
    setnocategoryfound(filtrercategories.length === 0 && searchCategory !== '');
  }, [filtrercategories, searchCategory]);

  return (
    <div className="partner-container">
      <h1 className="titrepartenaires">NOS PARTENAIRES</h1>

      {/* Category buttons */}
      <div className='catbuttoncontainer'>
        <button className='categorie' onClick={() => searchFilterCategory('Food')}>Food</button>
        {/* Bouton de filtre, appel de la fonction Recherchercategorie qui met à jour l'état de recherche catégorie avec l'évenement on click (stock) */}

        <button className='categorie' onClick={() => searchFilterCategory('Collectivite')}>Collectivite</button>
        {/* Bouton de filtre, appel de la fonction Recherchercategorie qui met à jour l'état de recherche catégorie avec l'évenement on click (stock) */}

        <button className='categorie' onClick={() => searchFilterCategory('Transports')}>Transports</button>
        {/* Bouton de filtre, appel de la fonction Recherchercategorie qui met à jour l'état de recherche catégorie avec l'évenement on click (stock) */}

        <button className='categorie' onClick={() => searchFilterCategory('Media')}>Media</button>
        {/* Bouton de filtre, appel de la fonction Recherchercategorie qui met à jour l'état de recherche catégorie avec l'évenement on click (stock) */}

        <button className='categorie' onClick={() => searchFilterCategory('Tourisme')}>Tourisme</button>
        {/* Bouton de filtre, appel de la fonction Recherchercategorie qui met à jour l'état de recherche catégorie avec l'évenement on click (stock) */}

        <button className='categorie' onClick={() => searchFilterCategory('Sécurité')}>Sécurité</button>
        {/* Bouton de filtre, appel de la fonction Recherchercategorie qui met à jour l'état de recherche catégorie avec l'évenement on click (stock) */}

        <button className='categorie' onClick={() => searchFilterCategory('Environnement')}>Environnement</button>
        {/* Bouton de filtre, appel de la fonction Recherchercategorie qui met à jour l'état de recherche catégorie avec l'évenement on click (stock) */}



        <button className='reset2' onClick={resetcategory}>Réinitialiser les catégories</button>
      {/* La fonction est appelée et met à jour la clé de réinitialisation du carrousel à chaque clic */}
      </div>

      <div className="artistes-grid">
        {/* Filtre les catégories dont le contenu inclut la valeur de recherche (rechercheCategorie)
        Si aucuneCategorieTrouvee  est vrai, aucun filtrage n'est appliqué.
        */} {nocategoryfound && <div className='catfindprog'>Aucune catégorie trouvée :(</div>}
        {!nocategoryfound && filtrercategories.map(category => (// map d ficher json pour récupérer les donnes du fichier json wordpress pour chaque id filtré (id & titré & contenu)
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
