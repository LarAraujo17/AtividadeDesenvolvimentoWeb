// Preços dos combustíveis
const precoGasolina = 6.69;
const precoEtanol = 5.85;
const precoDiesel = 6.10;

// Função para formatar moeda
const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
};

// Função para validar valor
const validarValor = (valor, nomeCampo) => {
    if (valor === '' || valor === null || valor === undefined) {
        alert(`O campo ${nomeCampo} não pode estar vazio!`);
        return false;
    }
    
    const numero = parseFloat(valor);
    
    if (isNaN(numero)) {
        alert(`O campo ${nomeCampo} deve conter um número válido!`);
        return false;
    }
    
    if (numero < 0) {
        alert(`O campo ${nomeCampo} não pode ser negativo!`);
        return false;
    }
    
    return true;
};

// Função para calcular abastecimento
const calcularAbastecimento = (precoCombustivel, litros) => {
    const valorTotal = precoCombustivel * litros;
    document.getElementById("resultado").innerHTML = formatarMoeda(valorTotal);
    return valorTotal;
};

// Função para atualizar valor
const atualizarValor = () => {
    let tipo = document.getElementById("combustivel").value;
    let litros = document.getElementById("litros").value;
    
    if (tipo === "") {
        document.getElementById("resultado").innerHTML = "R$";
        return;
    }
    
    if (litros === "") {
        document.getElementById("resultado").innerHTML = "R$";
        return;
    }
    
    if (!validarValor(litros, "Quantidade de litros")) {
        document.getElementById("resultado").innerHTML = "R$";
        return;
    }
    
    let litrosNum = parseFloat(litros);
    let precoPorLitro;
    
    switch (tipo) {
        case "gasolina":
            precoPorLitro = precoGasolina;
            break;
        case "etanol":
            precoPorLitro = precoEtanol;
            break;
        case "diesel":
            precoPorLitro = precoDiesel;
            break;
        default:
            return;
    }
    
    calcularAbastecimento(precoPorLitro, litrosNum);
};

// Adicionar eventos quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const combustivelSelect = document.getElementById("combustivel");
    const litrosInput = document.getElementById("litros");
    
    combustivelSelect.addEventListener("change", atualizarValor);
    litrosInput.addEventListener("input", atualizarValor);
    
    litrosInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            atualizarValor();
        }
    });
});