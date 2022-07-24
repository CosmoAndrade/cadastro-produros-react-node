import React from "react";
import { NavBar } from "../../styles/geral-styles";
import { Link, useLocation } from "react-router-dom";
import storage from "../../utils/storage";

const Menu = () => {

    const logout = () => {
        storage.removerAutenticacao();
        window.open("/login", "_self");
    }

    // Renderização condicional.
    if (useLocation().pathname !== "/login") {
        return (
            <NavBar>
                <li>
                    <Link to={'/'}>Inicio</Link>
                </li>
                <li>
                    <Link to={'/contato'}>Contato</Link>
                </li>
                <li>
                    <Link to={'/sobre'}>Sobre</Link>
                </li>
                <li>
                    <Link to={'/controle-de-produtos'}>Produtos</Link>
                </li>
                <li>
                    <a href="#" onClick={logout}>Sair</a>
                </li>
            </NavBar>
        );
    } else {
        return (<div></div>);
    }
}

export default Menu;