import React, { useState } from 'react';
import { Menuprog } from './menuprog'; // importation du  component => tableau menuprog.jsx

import "../css/Dropdown.css";// importation du fichier css Dropdown
import { Link } from 'react-router-dom'; // importation de Link pour les call to action 

function Dropdown() {
const [click, setClick] = useState(false); // Etat pour enregistrer si click a lieu ou non 

const handleClick = () => setClick(!click);   

return (
<>
<ul
onClick={handleClick} // action click 
className={click ? 'dropdown-menu clicked' : 'dropdown-menu'} // click sur menu dropdown si la class click est appliquée
>
{Menuprog.map((item, index) => {// map du tableau pour récupérer les données du component Menuprog.jsx)
return (
<li key={index}>
<Link
className={item.Name}
to={item.path}
onClick={() => setClick(false)}
>
{item.title}
</Link>
</li>
);
})}
</ul>

</>
);
}

export default Dropdown;