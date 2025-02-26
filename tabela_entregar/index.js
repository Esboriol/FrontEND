let jogo = null;
let jogoEditando = null;

class Jogo  {
    constructor(nome, plataforma, lancamento, genero, est) {
        this.nome = nome;
        this.plataforma = plataforma;
        this.lancamento = lancamento;   
        this.genero = genero;
        this.est = est;
        this.favorito = false;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("atuales").style.display = "none";
});

class JogoCadastro {
    constructor() {
        this.jogos = [];
        this.mostrandoFavoritos = false;
    }

    limparFormulario() {
        document.getElementById("jogoForm").reset();
        document.getElementById("butes").textContent = "Adicionar";
        document.getElementById("atuales").style.display = "none";
        document.getElementById("butes").style.display = "inline-block"; 
        jogoEditando = null; 
    }

    adicionarOuAtualizar(jogo) {
        if (jogoEditando === null) {
            this.jogos.push(jogo); // Adiciona novo jogo
        } else {
            this.jogos[jogoEditando] = jogo; // Atualiza jogo existente
        }
        this.tabela();
        this.limparFormulario();
    }

    atualizar(indice) {
        const jogo = this.jogos[indice];

        document.getElementById("nome").value = jogo.nome;
        document.getElementById("plataforma").value = jogo.plataforma;
        document.getElementById("lancamento").value = jogo.lancamento;
        document.getElementById("genero").value = jogo.genero;
        document.getElementById("est").value = jogo.est;

        jogoEditando = indice;

        document.getElementById("butes").style.display = "none"; // Esconde o botão adicionar
        document.getElementById("atuales").style.display = "inline-block"; // Mostra o botão atualizar
    }

    remover(indice) {
        this.jogos.splice(indice, 1); 
        this.tabela(); 
    }

    favoritar(indice) {
        this.jogos[indice].favorito = !this.jogos[indice].favorito;
        this.tabela();
    }

    mostrarFavoritos() {
        this.mostrandoFavoritos = !this.mostrandoFavoritos;
        this.tabela();
    }

    tabela() {
        const tabes = document.getElementById('jogoTabs');
        tabes.innerHTML = ""; 

        const jogosParaExibir = this.mostrandoFavoritos
            ? this.jogos.filter(jogo => jogo.favorito)
            : this.jogos;

        for (let i = 0; i < jogosParaExibir.length; i++) {
            const jogo = jogosParaExibir[i];

            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${jogo.nome}</td>
                <td>${jogo.plataforma}</td>
                <td>${jogo.lancamento}</td>
                <td>${jogo.est}</td>
                <td>${jogo.genero}</td>
                <td>
                    <button onclick="jogoCadastro.remover(${this.jogos.indexOf(jogo)})" class="btn btn-info btn-sm">Apagar</button>
                    <button onclick="jogoCadastro.atualizar(${this.jogos.indexOf(jogo)})" class="btn btn-warning btn-sm">Editar</button>
                    <button onclick="jogoCadastro.favoritar(${this.jogos.indexOf(jogo)})" class="btn ${jogo.favorito ? 'btn-success' : 'btn-danger'} btn-sm">
                        ${jogo.favorito ? 'Desfavoritar' : 'Favoritar'}
                    </button>
                </td>
            `;
            tabes.appendChild(linha);
        }
    }
}

const jogoCadastro = new JogoCadastro();

document.getElementById("atuales").addEventListener("click", function(evento) {
    evento.preventDefault();

    if (jogoEditando !== null) {
        const nome = document.getElementById('nome').value;
        const plataforma = document.getElementById('plataforma').value;
        const lancamento = document.getElementById('lancamento').value;
        const genero = document.getElementById('genero').value;
        const est = document.getElementById('est').value;

        const jogo = new Jogo(nome, plataforma, lancamento, genero, est);
        jogoCadastro.adicionarOuAtualizar(jogo);
    }
});

document.getElementById("faves").addEventListener("click", function(evento) {
    evento.preventDefault();
    jogoCadastro.mostrarFavoritos();
    document.getElementById("faves").textContent = jogoCadastro.mostrandoFavoritos ? "Mostrar Todos" : "Mostrar Favoritos";
});

const formulario = document.getElementById('jogoForm');
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const nome = document.getElementById('nome').value;
    const plataforma = document.getElementById('plataforma').value;
    const lancamento = document.getElementById('lancamento').value;
    const genero = document.getElementById('genero').value;
    const est = document.getElementById('est').value;

    const jogo = new Jogo(nome, plataforma, lancamento, genero, est);
    jogoCadastro.adicionarOuAtualizar(jogo);
    console.log(jogoCadastro.jogos);
});

formulario.addEventListener('reset', function(evento) {
    evento.preventDefault();

    document.getElementById('nome').value = '';
    document.getElementById('plataforma').value = '';
    document.getElementById('lancamento').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('est').value = '';

    jogo = null;
    console.log(jogo);
});