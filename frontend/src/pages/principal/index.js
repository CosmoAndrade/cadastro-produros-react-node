import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import storage from "../../utils/storage";

import "./index.css";


const Principal = () => {

    useEffect(() => {
        let token = storage.obterToken();

        if(!token){
            window.open('/login', '_self');
        }
    });
 
    return (
        <div className="principal">
            <h1>Sou a pagina Principal</h1>
            <Link to="/detalhes">Detalhes</Link>
        </div>
    );
    
}

export default Principal;