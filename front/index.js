// function updateSizeInfo() {
//     let largura = window.innerWidth
//     document.getElementById("sizeInfo").textContent = `Largura da janela: ${largura}px`

//     let container = document.getElementsByClassName("container")
//     let inputs = document.querySelectorAll("input, select")

//     if (largura < 600) {
//         inputs.forEach(input => {
//             input.style.width = "70%"
//             input.style.padding = "6px"
//         })
//     } else {
//         inputs.forEach(input => {
//             input.style.width = "90%"
//             input.style.padding = "8px"
//         })
//     }
// }

// window.addEventListener("resize", updateSizeInfo)
// updateSizeInfo()

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

    const data = {nome, telefone,email,tipo,apartamento}
    console.log(data);


    try {
        const response = await fetch("http://localhost:3000/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
            alert("Cadastro feito com sucesso");
            // document.getElementById("formulario").reset();
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

  async function listar() {
    const tbody = document.getElementById("tbody");

    if (!tbody) {
        console.error("Erro: Elemento tbody não encontrado!");
        return;
    }

    const response = await fetch("http://localhost:3000/listar");
    const data = await response.json();
    tbody.innerHTML = ""; // Limpa a tabela antes de adicionar os novos itens

    data.pessoal.forEach((pessoal) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${pessoal.id}</td>
            <td>${pessoal.nome}</td>
            <td>${pessoal.tipo}</td>
            <td>${pessoal.telefone}</td>
            <td>${pessoal.placa}</td>
            <td>${pessoal.apartamento}</td>
            <td class="delete-btn" onclick="excluir('${pessoal.id}')">✖</td>
            <td class="editar-btn" onclick="abrirModal('${pessoal.nome}', '${pessoal.tipo}', '${pessoal.telefone}', '${pessoal.placa}', '${pessoal.apartamento}')">Editar</td>
        `;
        tbody.appendChild(row);
    });
}

// excluir

async function excluir(id) {
    const response = await fetch(`http://localhost:3000/deletar/${id}`, {
        method: 'DELETE'
    });

    const result = await response.json();
    if (result.success) {
        alert('Carro removido com sucesso!');
        listarPessoal(); // Recarrega a lista após a exclusão
    } else {
        alert(result.message || 'Erro ao remover o carro!');
    }
}

// Função para abrir o modal e preencher os campos
function abrirModal(nome, telefone, email, tipo, apartamento) {
    idAntigo = idAntigoParam; 
    document.getElementById('nome').value = nome;
    document.getElementById('telefone').value = telefone;
    document.getElementById('email').value = email;
    document.getElementById('tipo').value = tipo;
    document.getElementById('apartamento').value = apartamento;

    // Exibir o modal
    document.getElementById('modal').style.display = 'flex';
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

async function editar(id) {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const tipo = document.getElementById('tipo').value;
    const apartamento = document.getElementById('apartamento').value;

    console.log('Dados enviados:', { nome, telefone, email, tipo, apartamento });

    const response = await fetch(`http://localhost:3000/editar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, telefone, email, tipo, apartamento })

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