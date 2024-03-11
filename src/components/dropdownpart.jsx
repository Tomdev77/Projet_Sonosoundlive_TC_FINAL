import React, { useState } from 'react';
import { Menupart } from './menupart';  // importation du  component => tableau menupart.jsx
import "../css/Dropdownpart.css"; // importation du fichier css Dropdownpart
import { Link } from 'react-router-dom';

function Dropdownpart() {
    const [click, setClick] = useState(false);// Etat pour enregistrer si click a lieu ou non 

    const handleClick = () => setClick(!click);/* La fonction est appelée et met à jour la clé action click. Quand leclick est true, il sera false*/

    return (
        <>
            <ul onClick={handleClick} className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}> {/* action click*/} 
                {Menupart.map((item, index) => (// map du tableau pour récupérer les données du component Menupart.jsx)
                    <li key={index}>
                        <Link className={item.Name} to={item.path} onClick={() => setClick(false)}>
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Dropdownpart;
