import Usuario from '../model/Usuario';

function salvarToken(token){
    localStorage.setItem('token', token);
}

function obterToken(){
   return localStorage.getItem('token');
}

function removerAutenticacao(){
    localStorage.clear();
}

function salvarUsuario(usuario){
    let json = JSON.stringify(usuario);
    localStorage.setItem('usuario', json);
}

function obterUsuario(){
    let json = localStorage.getItem('usuario');
    return new Usuario(JSON.parse(json));
}

export default {
    salvarToken,
    obterToken,
    removerAutenticacao,
    salvarUsuario,
    obterUsuario
}