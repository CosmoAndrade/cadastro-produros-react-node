import service from './service';

function obterTodos(){
    return new Promise((resolve, reject) => {
        return service.get('/produtos')
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function cadastrar(produto){
    return new Promise((resolve, reject) => {
        return service.post(`/produtos`, produto)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function atualizar(produto){
    return new Promise((resolve, reject) => {
        return service.put(`/produtos/${produto.id}`, produto)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function deletar(produto){
    return new Promise((resolve, reject) => {
        return service.delete(`/produtos/${produto.id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

export default {
    obterTodos,
    cadastrar,
    atualizar,
    deletar
}