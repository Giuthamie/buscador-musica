const form = document.querySelector('#form');
const searchInput = document.querySelector('#search');
const songsContainer = document.querySelector('#songs-container');
const prevAndNextContainer = document.querySelector('#prev-and-next-container');

/* armazenando a url da api*/
const apiUrl = `https://api.lyrics.ovh/`

const getMoreSongs = async url => {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    const data = await response.json()
    
    insertSongsIntoPage(data)

}

/*printando os dados na tela*/
const insertSongsIntoPage = songsInfo => {
    songsContainer.innerHTML = songsInfo.data.map(song => `
    <li clas="song">
    <span class="song-artist"><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}">Ver letra</button>
    </li>
    `).join('')
    if(songsInfo.prev || songsInfo.next){
        prevAndNextContainer.innerHTML = `
        ${songsInfo.prev ? `<button class="btn" onClick="getMoreSongs('${songsInfo.prev}')">Anteriores</button>` : ''}
        ${songsInfo.next ? `<button class="btn" onClick="getMoreSongs('${songsInfo.next}')">Próximas</button>` : ''}
        `
        return
    }
    prevAndNextContainer.innerHTML = ''
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