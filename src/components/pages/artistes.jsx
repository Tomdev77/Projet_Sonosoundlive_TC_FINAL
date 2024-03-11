import React, { useEffect, useState, useMemo } from 'react'; // Importer useState et useEffect et Usememo depuis React
import "../../css/artistes.css"; // * importation du fichier css concerts, style

export default function Artistes() { // Component  Sous section Artistes de Programmations , Dropdown Menu Desktop => chemin liaison Menu.prog.jsx + dropdown.jsx


  const [artistes, setArtistes] = useState([]);
  // Etat pour la récupération des données artistes  via la méthode fetch
  const [rechercheArtiste, setRechercheArtiste] = useState(''); //  Etat pour la recherche d'artiste (stock)
  const [rechercheDate, setRechercheDate] = useState(''); //  Etat pour la recherche de date (stock)

  const filteredIds = useMemo(() => [114, 112, 110, 105, 102, 98, 89, 86, 74, 65, 56, 43, 81, 350, 670, 675, 678, 682, 569, 688, 691, 694, 705, 717, 720, 723, 727, 732, 736, 740], []);
  const [aucuneDateTrouvee, setAucuneDateTrouvee] = useState(false); //  État pour indiquer si aucune date n'est trouvée, affiche le message false
  const [aucunArtisteTrouve, setAucunArtisteTrouve] = useState(false); //  État pour indiquer si aucun artiste n'est trouvé, affiche le message false

  const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'; // Exemple de proxy, utilisez le vôtre si nécessaire
  const API_URL = 'https://sonosound.online/wp-json/wp/v2/posts?per_page=100';

useEffect(() => {
  const fetchArtistes = async () => {
    try {
      const username = 'tom'; 
      const password = 'Petitcalvejunior2025!!$$'; 
      const basicAuth = btoa(`${username}:${password}`);

      const response = await fetch(PROXY_URL + API_URL, {
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

const rechercherDate = (event) => { // Fonction pour rechercher par date
    setRechercheDate(event.target.value); // Met à jour l'état de recherche de date avec la nouvelle valeur
};


  useEffect(() => {
    // Vérification, si aucun artiste n'est trouvé après le filtrage basé sur la date
    setAucuneDateTrouvee(artistes.filter(a => a.content.rendered.toLowerCase().includes(rechercheDate.toLowerCase())).length === 0 && rechercheDate !== '');
    // Vérification, si aucun artiste n'est trouvé après le filtrage basé sur le nom
    const filteredArtistes = artistes.filter(a => a.title.rendered.toLowerCase().includes(rechercheArtiste.toLowerCase()));
    setAucunArtisteTrouve(filteredArtistes.length === 0 && rechercheArtiste !== '');
  }, [artistes, rechercheDate, rechercheArtiste]);

  const reinitialiser = () => {    // Fonction pour réinitialiser des artistes, dates.
    setRechercheArtiste('');//  met à jour l'état de recherche d'artiste avec l'initialisation
    setRechercheDate('');//  met à jour l'état de recherche de date  avec l'initialisation
  };

  return (
    <div className="artistesbio-container">
      <h1 className='progtitre'>PRESENTATION DES ARTISTES</h1>
      <input
    type="text"
    placeholder="Rechercher un artiste"
    value={rechercheArtiste}// stock de l'info rentré par l'utilisateur
    onChange={rechercherArtistes} // Appel de la fonction rechercherArtistes pour mettre à jour l'état de recherche d'artiste(stock)
/>

      <input
        type="text"
        placeholder="Rechercher une date"
        value={rechercheDate}// stock de l'info rentré par l'utilisateur
        onChange={rechercherDate} // Appel de la fonction rechercherDate pour mettre à jour l'état de recherche Date (stock)
      />
      <div className="filtres">
        <button className='resetconcerts' onClick={reinitialiser}>Réinitialiser tout</button>
        {/* La fonction est appelée et met à jour la clé de réinitialisation du carrousel à chaque clic */}


      </div>
      <div className="artiste-gridbio">

        {aucuneDateTrouvee && <div className='datefindconcerts'>Aucune date trouvée :(</div>} 
        {
        /* Filtre les artistes dont le contenu inclut la valeur de recherche (rechercheDate), si rechercheDate n'est pas vide.
        Si aucuneDateTrouvee ou aucunArtisteTrouve est vrai, aucun filtrage n'est appliqué.
        */}
        {aucunArtisteTrouve && <div className='datefindconcerts'>Aucun artiste trouvé :(</div>}
        {!aucuneDateTrouvee && !aucunArtisteTrouve && artistes 
        
          .filter(a => a.title.rendered.toLowerCase().includes(rechercheArtiste.toLowerCase()))  /* filtre les titres récupérés dans l'état  */
          .filter(a => rechercheDate === '' || a.content.rendered.toLowerCase().includes(rechercheDate.toLowerCase())) /* filtre les contenus récupérés dans l'état  */
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
