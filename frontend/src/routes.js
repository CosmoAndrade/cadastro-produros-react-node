// Importar o React
import React from "react";

// Importar as propriedades do react-router-dom
import {BrowserRouter, Switch, Route} from "react-router-dom";

// Importar componente
import Menu from "./components/Menu";

// Importar nossas pages
import Principal from "./pages/principal";
// import Detalhes from "./pages/detalhes";
import Login from "./pages/login";
import Contato from "./pages/contato";
import Sobre from "./pages/sobre";
import ControleDeProduto from "./pages/controleDeProdutos";

// Criar um componente chamado Routes que vai ter as configurações das nossas rotas.
const Routes = () => (
    <BrowserRouter>
        <Menu></Menu>
        <Switch>
            <Route exact path="/" component={Principal}/>
            {/* <Route path="/detalhes" component={Detalhes}/> */}
            <Route path="/login" component={Login}/>
            <Route path="/contato" component={Contato}/>
            <Route path="/sobre" component={Sobre}/>
            <Route path="/controle-de-produtos" component={ControleDeProduto}/>
        </Switch>
    </BrowserRouter>
);

// Vamos exportar esse componente.
export default Routes;