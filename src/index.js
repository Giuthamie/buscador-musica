const form = document.querySelector('#form');
const searchInput = document.querySelector('#search');
const songsContainer = document.querySelector('#songs-container');
const prevAndNextContainer = document.querySelector('#prev-and-next-container');

/* armazenando a url da api*/
const apiUrl = `https://api.lyrics.ovh/`

/*requisição das letras das músicas*/

const fetchSongs = term => {
    fetch(`${apiUrl}/suggest/${term}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })

}

form.addEventListener('submit', event => {
    event.preventDefault()

    const searchTerm = searchInput.value.trim();

    if (!searchTerm){
        songsContainer.innerHTML = `<li class="warning-message">Por favor, digite um termo válido!</li>`
        return
    }

    fetchSongs(searchTerm)
})