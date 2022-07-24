import React, { useState, useEffect } from "react";
import { Button } from "../../styles/form-styles";
import { DivPersolalizada } from "../../styles/geral-styles";
import InputText from "../../components/InputText";
import usuarioService from "../../service/usuario-service";
import storage from "../../utils/storage";

import "./index.css";
import Usuario from "../../model/Usuario";
const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    let token = storage.obterToken();
 
    if(token){
        window.open('/', '_self');
    }
  });
  const login = () => {

    if(!email || !senha){
        alert("Favor informar o e-mail e senha.");
        return;
    }

    usuarioService.login(email, senha)
    .then(response => {
        const {token, usuario } = response;
        storage.salvarToken(token);
        storage.salvarUsuario(new Usuario(usuario))
        window.open("/", "_self");
    })
    .catch(error => {
        console.log(error);
        alert(error)
    })
  };

  return (
    <DivPersolalizada
      width="300px"
      margin="auto"
      border="1px solid #ddd"
      marginTop="50px"
    >
      <div className="logo">
        <h1>Login</h1>
      </div>

      <div className="group">
        <InputText
          id="email"
          placeholder="exemplo@exemplo.com"
          text="E-mail"
          callback={(e) => setEmail(e.target.value)}
        ></InputText>
      </div>

      <div className="group">
        <InputText
          id="senha"
          placeholder="123456"
          text="Senha"
          type="password"
          callback={(e) => setSenha(e.target.value)}
        ></InputText>
      </div>

      <Button onClick={login}>Entrar</Button>

      <div className="esqueci-senha">
        <a href="#">Esqueci minha senha</a>
      </div>
    </DivPersolalizada>
  );
};

export default Login;
/* 
   1°Importar os componentes que precisaremos para o projeto.
    1.1 Style Component - OK
    1.2 Criar novos componentes com base no Style Component - OK

   2° Criar um menu dinamico para o sistema.

   3°Aprender a trabalhar com requisições Ajax, o famoso HTTP.
    3.1 Axios, fech Api
  
   3° Aprender utilizar o localstorage

   4° A traballhar com Hooks (useState e UseEffect)

*/
