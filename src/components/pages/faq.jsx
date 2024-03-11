import React, { useState } from 'react';
import '../../css/faq.css'; // importation Fichier .css faq
import { Link } from 'react-router-dom';

export default function FAQ() { // Component Section FAQ
  const [formData, setFormData] = useState({ /*Eat formulaire données (stock)*/ 
    firstName: '', // prénom
    lastName: '', // nom
    email: '',
    message: ''
  });

  
const [isSubmitted, setIsSubmitted] = useState(false);/*Eat envoir formulaire données (stock)*/ 


  const handleChange = (e) => {// Fonction pour cibler les données formulaire avec l'evenement e
    const { name, value } = e.target;
    setFormData({ // mise à jour de l'état de donnée du formulaire
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Les données du formulaire sont disponibles dans l'état formData
    // Ajoutez ici le code pour traiter le formulaire, par exemple, l'envoyer à un serveur
    setIsSubmitted(true);
  };

  const reset = () => { // fonction reinitialiser 
    setFormData({// mise à jour de l'état de donnée du formulaire
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  setIsSubmitted(false); // Réinitialisation de la variable isSubmitted à false
 
  };
  return (
    <>
     <div className="containerinfos">
        <div className='childcontainer'>
          <h1 id='titlefaq'>Bienvenue dans notre page FAQ . Des questions à ce stade?</h1><br/>
          <h1 id='soustitlefaq'>Vous trouverez ci-dessous les réponses aux questions les plus fréquemment posées. Si vous ne trouvez pas la réponse à votre question, n'hésitez pas à nous contacter.</h1>
          <div class="box1">
            <h2 id='billeterie'>Billeterie</h2>
            <h3>1. Comment acheter des billets pour le festival ?</h3>
            <p className='question1'>Pour acheter des billets pour le festival, vous pouvez vous rendre sur notre site web officiel et suivre les consignes pour effectuer votre achat en ligne. Les billets peuvent également être disponibles dans certains points de vente physiques. N'hésitez pas à consulter notre site web pour plus d'informations</p>
            <h3>2. Puis-je acheter des billets sur place ?</h3>
            <p className='question2'>Oui, des billets pour le festival seront disponibles à l'achat sur place, sous réserve de disponibilité. Cependant, nous recommandons vivement d'acheter vos billets à l'avance pour garantir votre entrée au festival.</p>
            <h3>3. Y a-t-il des billets VIP disponibles ?</h3>
            <p className='question3'>Oui, nous proposons des billets VIP offrant divers avantages exclusifs, tels que des zones de vision privilégiées, des salons VIP, et bien plus encore. Consultez notre site web pour plus de détails sur les options VIP disponibles.</p>
           </div>

          <div class="box2">
            <h2 id='logements'>Logements</h2>
            <h3>1. Y a-t-il un camping ou un hotel sur place ?</h3>
            <p className='question1'>
              Oui, nous proposons un camping sur place pour les festivaliers qui souhaitent séjourner à proximité de l'événement. Des emplacements de camping sont disponibles à l'achat sur notre site web. N'hésitez pas à consulter les partenaires avec qui nous sommes associés dans la rubrique "partenaires".
              <Link to="/partenaires" id="clickhere" target="_blank"> Cliquez ici.</Link>
            </p>
            <h3>2. Existe-t-il des options d'hébergement alternatives à proximité du festival ?</h3>
            <p className='question2'>Oui, il existe plusieurs options d'hébergement alternatives à proximité du site du festival, y compris des hôtels, des auberges de jeunesse et des locations de vacances. Nous recommandons de réserver votre hébergement à l'avance, car les disponibilités peuvent être limitées pendant le festival. Notre partenaire Trivago pourra vous donner toutes les informations requises à vos demandes <Link to="/partenaires" id="clickhere" target="_blank"> Cliquez ici.</Link></p>
          </div>

          <div class="box3">
            <h2 id='progartistes'>Programmation et Artistes</h2>
            <h3>1. Où puis-je trouver le programme complet du festival ?</h3>
            <p className='question1'>
              Le programme complet du festival, y compris les horaires de chaque artiste et les activités prévues, sont disponibles sur notre site web dans la rubrique "programmations". Assurez-vous de consulter régulièrement notre site pour les mises à jour et les annonces importantes.
              <Link to="/programmations" id="clickhere" target="_blank"> Cliquez ici.</Link>
              Si vous souhaitez plus d'informations sur leurs prochaines tournées, vous pouvez consulter leurs prochaines dates dans notre sous-rubrique "artistes" ou<Link to="/artistes" id="clickhere" target="_blank"> Cliquez ici.</Link>
            </p>
            <h3>2. Qui sont les artistes confirmés pour cette année ?</h3>
            <p className='question2'>Vous pouvez consulter notre rubrique "programmations" pour retrouver tous les artistes du festival <Link to="/programmations" id="clickhere" target="_blank"> Cliquez ici.</Link></p>
           </div>
           </div>
           </div>

         <div className='formcontainer'>
          <h2 id='titleform'>FORMULAIRE DE CONTACT</h2>
          <form onSubmit={handleSubmit}> 
            <div>
            <label htmlFor="firstName">Prénom :</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder='Entrez votre prénom'
              value={formData.firstName} /* affiche la valeur correcte */ 
              onChange={handleChange} /* la fonction est appelée à chaque fois que la valeur du formulaire change*/
              required
            />
           </div>
          <div>
            <label htmlFor="lastName">Nom :</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder='Entrez votre nom'
              value={formData.lastName}/* affiche la valeur correcte */ 
              onChange={handleChange}/* la fonction est appelée à chaque fois que la valeur du formulaire change*/
              required
            />
           </div>
          <div>
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Entrez votre email'
              value={formData.email}/* affiche la valeur correcte */ 
              onChange={handleChange}/* la fonction est appelée à chaque fois que la valeur du formulaire change*/
            />
           </div>
          <div>
            <label htmlFor="message">Message :</label>
            <textarea
              id="message"
              name="message"
              placeholder='Entrez votre message'
              value={formData.message}/* affiche la valeur correcte */ 
              onChange={handleChange} /* la fonction est appelée à chaque fois que la valeur du formulaire change*/
            ></textarea>
            </div>
          <button className="submit" type="submit">Envoyer</button>
          <button className='reset'type="reset"onClick={reset}>Reinitialiser</button>
                {/* La fonction est appelée et met à jour la clé de réinitialisation du carrousel à chaque clic */}


           </form>

        {isSubmitted && ( // mise à jour de l'état de donnée du formulaire et envoi du message p
          <p id='oksubmit'>Merci ! Votre demande a été soumis avec succès :).</p>
        )}
           </div>
    </>
  );
  }
