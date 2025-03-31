function updateSizeInfo() {
    let largura = window.innerWidth
    document.getElementById("sizeInfo").textContent = `Largura da janela: ${largura}px`

    let container = document.getElementByClass("container")
    let inputs = document.querySelectorAll("input, select")

    if (largura < 600) {
        container.style.backgroundColor = "#222"
        inputs.forEach(input => {
            input.style.width = "70%"
            input.style.padding = "6px"
        })
    } else {
        container.style.backgroundColor = "#333"
        inputs.forEach(input => {
            input.style.width = "90%"
            input.style.padding = "8px"
        })
    }
}

window.addEventListener("resize", updateSizeInfo)
updateSizeInfo()

// cadastro

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cadastrar").addEventListener("click", cadastrar);
});


async function cadastrar(event){
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const tipo = document.getElementById("tipo").value;
    const apartamento = document.getElementById("apartamento").value;

    console.log(nome, telefone, email, tipo, apartamento);

    try {
        const response = await fetch("http://localhost:3000/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({nome, telefone, email, tipo, apartamento}),
        });

        const result = await response.json();

        if (result.success) {
            alert("Cadastro feito com sucesso");
            document.getElementById("cadastroForm").reset();
        } else {
            alert(result.message || "Houve um erro ao cadastrar");
        }
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao cadastrar. Verifique a conexão com o servidor.");
    } 
}

// listar

document.addEventListener("DOMContentLoaded", () => {
    listar()
});

let placaAntiga = "";
let placaNova = "";

  async function listar() {
    const tbody = document.getElementById("tbody");

    if (!tbody) {
        console.error("Erro: Elemento tbody não encontrado!");
        return;
    }

    const response = await fetch("http://localhost:3000/listar");
    const data = await response.json();
    tbody.innerHTML = ""; // Limpa a tabela antes de adicionar os novos itens

    data.carro.forEach((carro) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${carro.placa}</td>
            <td>${carro.tipo}</td>
            <td>${carro.dono}</td>
            <td>${carro.cpf}</td>
            <td>${carro.vaga}</td>
            <td class="delete-btn" onclick="excluir('${carro.placa}')">✖</td>
            <td class="editar-btn" onclick="abrirModal('${carro.dono}', '${carro.placa}', '${carro.cpf}', '${carro.tipo}', '${carro.vaga}')">Editar</td>
        `;
        tbody.appendChild(row);
    });
}

async function excluir(placa) {
    const response = await fetch(`http://localhost:3000/deletar/${placa}`, {
        method: 'DELETE'
    });

    const result = await response.json();
    if (result.success) {
        alert('Carro removido com sucesso!');
        listarGaragem(); // Recarrega a lista após a exclusão
    } else {
        alert(result.message || 'Erro ao remover o carro!');
    }
}

// Função para abrir o modal e preencher os campos
function abrirModal(dono, placa, cpf, tipo, vaga, placaAntigaParam) {
    placaAntiga = placaAntigaParam; 
    document.getElementById('dono').value = dono;
    document.getElementById('placa').value = placa;
    document.getElementById('cpf').value = cpf;
    document.getElementById('tipo').value = tipo;
    document.getElementById('vaga').value = vaga;

    // Exibir o modal
    document.getElementById('modal').style.display = 'flex';
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

async function editar(placaAntiga) {
    const dono = document.getElementById('nome').value;
    const placaNova = document.getElementById('telefone').value;
    const cpf = document.getElementById('email').value;
    const tipo = document.getElementById('tipo').value;
    const vaga = document.getElementById('vaga').value;

    console.log('Dados enviados:', { dono, placaNova, cpf, tipo, vaga });

    const response = await fetch(`http://localhost:3000/editar/${placaAntiga}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dono, placaNova, cpf, tipo, vaga })

    });

    const result = await response.json();
    if (result.success) {
        alert('Carro editado com sucesso!');
        fecharModal(); 
        listar();
    } else {
        alert(result.message || 'Erro ao editar o carro!');
    }
}