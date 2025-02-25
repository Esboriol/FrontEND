let filme = null;
let filmeEditando = null;

class Filme  {
    constructor(titulo, episodios, nota, genero, temporada) {
        this.titulo = titulo;
        this.episodios = episodios;
        this.nota = nota;
        this.genero = genero;
        this.temporada = temporada;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("atuales").style.display = "none";
});


class FilmeCadastro {
    constructor() {
        this.filmes = [];
    }

    limparFormulario() {
        document.getElementById("filmeForm").reset();
        document.getElementById("butes").textContent = "Adicionar";
        document.getElementById("atuales").style.display = "none";
        document.getElementById("butes").style.display = "inline-block"; 
        filmeEditando = null; 
    }

    adicionarOuAtualizar(filme) {
        if (filmeEditando === null) {
            this.filmes.push(filme); // Adiciona novo filme
        } else {
            this.filmes[filmeEditando] = filme; // Atualiza filme existente
        }
        this.tabela();
        this.limparFormulario();
    }

    atualizar(indice) {
        const filme = this.filmes[indice];

        document.getElementById("titulo").value = filme.titulo;
        document.getElementById("episodios").value = filme.episodios;
        document.getElementById("nota").value = filme.nota;
        document.getElementById("genero").value = filme.genero;
        document.getElementById("temporada").value = filme.temporada;

        filmeEditando = indice;

        document.getElementById("butes").style.display = "none"; // Esconde o botão adicionar
        document.getElementById("atuales").style.display = "inline-block"; // Mostra o botão atualizar
    }

    remover(indice) {
        this.filmes.splice(indice, 1); 
        this.tabela(); 
    }

    tabela() {
        const tabes = document.getElementById('tabelaFilmes');
        tabes.innerHTML = ""; 

        for (let i = 0; i < this.filmes.length; i++) {
            const filme = this.filmes[i];

            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${filme.titulo}</td>
                <td>${filme.episodios}</td>
                <td>${filme.nota}</td>
                <td>${filme.temporada}</td>
                <td>${filme.genero}</td>
                <td>
                    <button onclick="filmeCadastro.remover(${i})" class="btn btn-info btn-sm">Apagar</button>
                    <button onclick="filmeCadastro.atualizar(${i})" class="btn btn-warning btn-sm">Editar</button>
                </td>
            `;
            tabes.appendChild(linha);
        }
    }
}

const filmeCadastro = new FilmeCadastro();

document.getElementById("atuales").addEventListener("click", function(evento) {
    evento.preventDefault();

    if (filmeEditando !== null) {
        const titulo = document.getElementById('titulo').value;
        const episodios = document.getElementById('episodios').value;
        const nota = document.getElementById('nota').value;
        const genero = document.getElementById('genero').value;
        const temporada = document.getElementById('temporada').value;

        filmeCadastro.filmes[filmeEditando] = new Filme(titulo, episodios, nota, genero, temporada);
        filmeCadastro.tabela();
        filmeCadastro.limparFormulario();
    }
});

const formulario = document.getElementById('filmeForm');
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const episodios = document.getElementById('episodios').value;
    const nota = document.getElementById('nota').value;
    const genero = document.getElementById('genero').value;
    const temporada = document.getElementById('temporada').value;

    const filme = new Filme(titulo, episodios, nota, genero, temporada);
    filmeCadastro.adicionarOuAtualizar(filme);
    console.log(filmeCadastro.filmes);
});

formulario.addEventListener('reset', function(evento) {
    evento.preventDefault();

    document.getElementById('titulo').value = '';
    document.getElementById('episodios').value = '';
    document.getElementById('nota').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('temporada').value = '';

    filme = null;
    console.log(filme);
});
