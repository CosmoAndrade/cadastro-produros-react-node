import service from "./service";

const usuarioMock = {
    id: 1,
    nome:"fulano de tal",
    email:"fulano@exemplo.com",
    perfil: {
        id:1,
        descricao: "manager"
    }
};

const autenticado = {
    token:"bWluaGFzZW5oYXN1cGVyZm9ydGU=",
    usuario : usuarioMock
}

function login(email, senha){
    return new Promise((resolve,reject) => {

        email = email && email.toLowerCase();

        if(email !== "admin@admin.com" || senha !== "123456"){
            return reject("Usuário ou senha inválidos!")
        }

        return resolve(autenticado);
    })
}


// Metodo real qu vai na api tentar logar o usuario.
// function login(email, senha){
//     return new Promise((resolve, reject) => {
//         return service.post("/api/login", {email, senha})
//         .then(response => resolve(response))
//         .catch(error => reject(error));
//     })
// }

function obterTodos(){
    return new Promise((resolve, reject) => {
        return service.get("/api/usuarios")
        .then(response => resolve(response))
        .catch(error => reject(error));
    })
}

export default {
    login,
    obterTodos
}