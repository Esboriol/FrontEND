
let filme = null

class Filme  {
    constructor(titulo, episodios, nota, genero, temporada) {
        this.titulo = titulo
        this.episodios = episodios
        this.nota = nota
        this.genero = genero
        this.temporada = temporada
    }
}

const formulario = document.getElementById('filmeForm')
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault()

    const titulo = document.getElementById('titulo')
    const episodios = document.getElementById('episodios')
    const nota = document.getElementById('nota')
    const genero = document.getElementById('genero')
    const temporada = document.getElementById('temporada')

    const filme = new Filme(titulo.value, episodios.value, nota.value, genero.value, temporada.value)
    console.log(filme)

})

formulario.addEventListener('reset', function(evento) {
    evento.preventDefault()

    document.getElementById('titulo').value = ''
    document.getElementById('episodios').value = ''
    document.getElementById('nota').value = ''
    document.getElementById('genero').value = ''
    document.getElementById('temporada').value = ''

    filme = null
    console.log(filme)

})