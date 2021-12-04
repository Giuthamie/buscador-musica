const form = document.querySelector('#form');
const searchInput = document.querySelector('#search');
const songsContainer = document.querySelector('#songs-container');
const prevAndNextContainer = document.querySelector('#prev-and-next-container');

/* armazenando a url da api*/
const apiUrl = `https://api.lyrics.ovh/`

/*printando os dados na tela*/
const insertSongsIntoPage = songsInfo => {    
    songsContainer.innerHTML = songsInfo.data.map(song => `
    <li clas="song">
    <span class="song-artist"><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}"></button>
    </li>
    `).join('')
}

/*requisição das letras das músicas*/

const fetchSongs = async term => {
    const response = await fetch(`${apiUrl}/suggest/${term}`)
    const data = await response.json()
    
    insertSongsIntoPage(data)
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