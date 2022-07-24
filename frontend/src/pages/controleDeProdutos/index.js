import React, { useState, useEffect } from "react";
import './index.css';

import produtoService from "../../service/produto-service";
import Produto from "../../model/Produto";

import mascaraData from "../../utils/data";
import mascaraDinheiro from "../../utils/mascara-dinheiro";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ControleDeProduto = () => {

    const [produto, setProduto] = useState(new Produto());
    const [produtos, setProdutos] = useState([]);
    const [modoCadastro, setModoCadastro] = useState(true);

    useEffect(() => {
        obterTodoOsProdutos();
    }, []);

    const adicionarProduto = () => {
        setModoCadastro(true);
        limparCampos();
    }

    const editarProduto = (e) => {
        setModoCadastro(false);
         let produtoEncontrato = produtos.find(p => p.id == e.target.id);
       
        // Tenho que converter a data de cadastro para uma data americana.
        produtoEncontrato.dataCadastro = mascaraData.aplicarMascaraDateAmericanEmDataIso(produtoEncontrato.dataCadastro);

        setProduto(produtoEncontrato);
    }

    const excluirProduto = (e) => {
        
        let produtoEncontrato = produtos.find(p => p.id == e.target.id);

        MySwal.fire({
            title: <p>Deseja realmente excluir o produto?</p>,
            text: `Produto "${produtoEncontrato.id} - ${produtoEncontrato.nome}"`,
            confirmButtonText: "Sim",
            confirmButtonColor: 'rgb(0, 123, 255)',
            showCancelButton: true,
            cancelButtonText: "Não",
            animate: true
        }).then((result) => {

            if(result.isConfirmed){

                produtoService.deletar(produtoEncontrato)
                .then(() =>{
                    let indice = produtos.findIndex(p => p.id == produtoEncontrato.id);
                    produtos.splice(indice, 1);
    
                    // Essas formas são iguais, você escolhe como quer fazer.
                    setProdutos([...produtos]);
                    // setProdutos(arr => [... arr]);

                    Swal.fire({
                        title: "Produto excluido com sucesso!",
                        icon: "success",
                        timer: 5000,
                        showConfirmButton: false
                    });

                })
                .catch(error =>{
                    console.log(error);
                });
            }
        });

       
    }

    const obterTodoOsProdutos = () => {
        produtoService
            .obterTodos()
            .then(response => {
                let produtos = response.data.map((p) => new Produto(p));
                setProdutos(produtos);
            })
            .catch(error => {
                console.log(error)
            });
    }

    const limparCampos = () => {
        setProduto({ ...produto, id: "", nome: "", quantidadeEstoque: "", valor: "", dataCadastro: "" });
    }

    const cadastrarProduto = () =>{
        produtoService
            .cadastrar(produto)
            .then(response => {
                setProdutos(arr => [...arr, new Produto(response.data)]);
                limparCampos();
                
                Swal.fire({
                    position:'center',
                    icon: 'success',
                    title: 'Produto cadastrado com sucesso!',
                    showConfirmButton: false,
                    timer: 5000,
                    animate: true  
                })
            })
            .catch(error => {
                Swal.fire({
                    position:'center',
                    icon: 'error',
                    title: 'Não foi possível cadastrar o produto',
                    showConfirmButton: false,
                    timer: 5000,
                    animate: true  
                })
                console.log(error);
            });
    }

    const atualizarProdutoNaTabela = (produtoAtualizado) => {
        let indice = produtos.findIndex(p => p.id == produtoAtualizado.id);
        produtos.splice(indice, 1, new Produto(produtoAtualizado));

        setProdutos(arr => [... arr]);
    };

    const atualizarProduto = () =>{
        produtoService
            .atualizar(produto)
            .then(response => {
                atualizarProdutoNaTabela(response.data);
                limparCampos();

                Swal.fire({
                    position:'center',
                    icon: 'success',
                    title: 'Produto atualizado com sucesso!',
                    showConfirmButton: false,
                    timer: 5000,
                    animate: true  
                })
                
            })
            .catch(error => {
                Swal.fire({
                    position:'center',
                    icon: 'error',
                    title: 'Não foi possível atualizar o produto',
                    showConfirmButton: false,
                    timer: 5000,
                    animate: true  
                })
                console.log(error);
            })
    }

    const salvarProduto = () => {
        produto.dataCadastro = mascaraData.aplicarMascaraISOEmDateAmerican(produto.dataCadastro);
        (modoCadastro) ? cadastrarProduto() : atualizarProduto();
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <h1>Controle de produtos</h1>
                    <hr />
                </div>

                <div className="col-sm-12">
                    <button className="btn btn-primary" onClick={adicionarProduto} data-toggle="modal" data-target="#modal-produtos" data-backdrop="static" >Adicionar</button>
                </div>

                <div className="col-sm-12">

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Quantidade</th>
                                <th>Valor</th>
                                <th>Data de cadastro</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map(produto => (
                                <tr>
                                    <td>{produto.id}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.quantidadeEstoque}</td>
                                    <td>{mascaraDinheiro.aplicarMascaraParaRealComPrefixo(produto.valor)}</td>
                                    <td>{mascaraData.aplicarMascaraEmDataIso(produto.dataCadastro)}</td>
                                    <td>
                                        <button id={produto.id} className="btn btn-link" onClick={editarProduto} data-toggle="modal" data-target="#modal-produtos" data-backdrop="static" >Editar</button>
                                        <button id={produto.id} className="btn btn-link" onClick={excluirProduto}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row">
                <div class="modal" id="modal-produtos">
                    <div class="modal-dialog">
                        <div class="modal-content">

                            {/* Aqui é o header do modal */}
                            <div class="modal-header">
                                <h4 class="modal-title">{modoCadastro ? 'Adicionar ' : 'Editar '} produto</h4>
                            </div>

                            {/* Aqui é o body do modal */}
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div class="form-group">
                                            <label for="nome">Nome</label>
                                            <input
                                                id="nome"
                                                type="text"
                                                class="form-control"
                                                value={produto.nome}
                                                onChange={(e) => setProduto({ ...produto, nome: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div class="form-group">
                                            <label for="quantidade">Quantidade</label>
                                            <input
                                                id="quantidade"
                                                type="text"
                                                class="form-control"
                                                value={produto.quantidadeEstoque}
                                                onChange={(e) => setProduto({ ...produto, quantidadeEstoque: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div class="form-group">
                                            <label for="valor">Valor</label>
                                            <input
                                                id="valor"
                                                type="text"
                                                class="form-control"
                                                value={produto.valor}
                                                onChange={(e) => setProduto({ ...produto, valor: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div class="form-group">
                                            <label for="data-cadastro">Data de cadastro</label>
                                            <input
                                                id="data-cadastro"
                                                type="date"
                                                class="form-control"
                                                value={produto.dataCadastro}
                                                onChange={(e) => setProduto({ ...produto, dataCadastro: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Aqui é o footer do modal */}
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" onClick={salvarProduto}>Salvar</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ControleDeProduto;