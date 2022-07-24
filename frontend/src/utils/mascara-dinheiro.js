function aplicarMascaraParaReal(valor) {
    if (isNaN(valor)) {
        return 0;
    }
    return Number(valor).toLocaleString('pr-BR', { minimumFractionDigits: 2 });
}

function aplicarMascaraParaRealComPrefixo(valor) {
    if (isNaN(valor))
        return 0;
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    aplicarMascaraParaReal,
    aplicarMascaraParaRealComPrefixo
}