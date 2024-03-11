import React, { useEffect, useState, useMemo } from 'react'; // Importer useState et useEffect et Usememo depuis React
import "../../css/artistes.css"; // * importation du fichier css concerts, style
import axios from 'axios'; // Importer Axios

export default function Artistes() { // Component  Sous section Artistes de Programmations , Dropdown Menu Desktop => chemin liaison Menu.prog.jsx + dropdown.jsx


  const [artistes, setArtistes] = useState([]);
  // Etat pour la récupération des données artistes  via la méthode fetch
  const [searchArtiste, setsearchArtiste] = useState(''); //  Etat pour la recherche d'artiste (stock)
  const [searchDate, setsearchDate] = useState(''); //  Etat pour la recherche de date (stock)

  const filteredIds = useMemo(() => [114, 112, 110, 105, 102, 98, 89, 86, 74, 65, 56, 43, 81, 350, 670, 675, 678, 682, 569, 688, 691, 694, 705, 717, 720, 723, 727, 732, 736, 740], []);
  const [nodatefound, setnodatefound] = useState(false); //  État pour indiquer si aucune date n'est trouvée, affiche le message false
  const [noartistefound, setnoartistefound] = useState(false); //  État pour indiquer si aucun artiste n'est trouvé, affiche le message false

  useEffect(() => {
    const fetchData = async () => {
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

const searchFilterDate = (event) => { // Fonction pour rechercher par date
  setsearchDate(event.target.value); // Met à jour l'état de recherche de date avec la nouvelle valeur
};


  useEffect(() => {
    // Vérification, si aucun artiste n'est trouvé après le filtrage basé sur la date
    setnodatefound(artistes.filter(a => a.content.rendered.toLowerCase().includes(searchDate.toLowerCase())).length === 0 && searchDate !== '');
    // Vérification, si aucun artiste n'est trouvé après le filtrage basé sur le nom
    const filteredArtistes = artistes.filter(a => a.title.rendered.toLowerCase().includes(searchArtiste.toLowerCase()));
    setnoartistefound(filteredArtistes.length === 0 && searchArtiste !== '');
  }, [artistes, searchDate, searchArtiste]);

  const reset = () => {    // Fonction pour réinitialiser des artistes, dates.
    setsearchArtiste('');//  met à jour l'état de recherche d'artiste avec l'initialisation
    setsearchDate('');//  met à jour l'état de recherche de date  avec l'initialisation
  };

  return (
    <div className="artistesbio-container">
      <h1 className='progtitre'>PRESENTATION DES ARTISTES</h1>
      <input
    type="text"
    placeholder="Rechercher un artiste"
    value={searchArtiste}// stock de l'info rentré par l'utilisateur
    onChange={searchFilterArtistes} // Appel de la fonction rechercherArtistes pour mettre à jour l'état de recherche d'artiste(stock)
/>

      <input
        type="text"
        placeholder="Rechercher une date"
        value={searchDate}// stock de l'info rentré par l'utilisateur
        onChange={searchFilterDate} // Appel de la fonction rechercherDate pour mettre à jour l'état de recherche Date (stock)
      />
      <div className="filtres">
        <button className='resetconcerts' onClick={reset}>Réinitialiser tout</button>
        {/* La fonction est appelée et met à jour la clé de réinitialisation du carrousel à chaque clic */}


      </div>
      <div className="artiste-gridbio">

        {nodatefound && <div className='datefindconcerts'>Aucune date trouvée :(</div>} 
        {
        /* Filtre les artistes dont le contenu inclut la valeur de recherche (rechercheDate), si rechercheDate n'est pas vide.
        Si aucuneDateTrouvee ou aucunArtisteTrouve est vrai, aucun filtrage n'est appliqué.
        */}
        {noartistefound && <div className='datefindconcerts'>Aucun artiste trouvé :(</div>}
        {!nodatefound && !noartistefound && artistes 
        
          .filter(a => a.title.rendered.toLowerCase().includes(searchArtiste.toLowerCase()))  /* filtre les titres récupérés dans l'état  */
          .filter(a => searchDate === '' || a.content.rendered.toLowerCase().includes(searchDate.toLowerCase())) /* filtre les contenus récupérés dans l'état  */
          .map((a) => ( // map d ficher json pour récupérer les donnes du fichier json wordpress pour chaque id filtré (id & titré & contenu)
            <div className={`boxlarge1`} key={a.id}>
              <section>
                <h2>{a.title.rendered}</h2>
                <div dangerouslySetInnerHTML={{ __html: a.content.rendered }} />
              </section>
            </div>
          ))}
      </div>
    </div>

  );
}
