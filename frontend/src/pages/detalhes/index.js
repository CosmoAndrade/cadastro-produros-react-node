import React from "react";
import "./index.css";

import {Link} from "react-router-dom"

export default class Detalhes extends React.Component {

    render(){
        return (
            <div className="detalhes">
                <h1>Estou na pagina de detalhes</h1>
                <Link to="/"> Voltar para pagina principal</Link>
            </div>
        );
    }
}