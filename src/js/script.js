const baseMusicas = [
    {
        'name': 'Billie Eilish - Happier Than Ever',
        'artist': 'Billie Eilish',
        'path': './src/audio/Billie Eilish - Happier Than Ever.mp3',
        'album': 'Happier Than Ever',
    },
    {
        'name': 'Dua Lipa - Levitating',
        'artist': 'Dua Lipa',
        'path': './src/audio/Dua Lipa - Levitating.mp3',
        'album': 'Future Nostalgia',
    },
    {
        'name': 'Harry Styles - Golden',
        'artist': 'Harry Styles',
        'path': './src/audio/Harry Styles - Golden.mp3',
        'album': 'Fine Line',
    }
];

const listaMusicas = document.querySelector('.listaDeMusicas');

const tagAudio = document.getElementById('tagAudio');

const primeiraMusica = baseMusicas[0];
tagAudio.src = primeiraMusica.path;
atualizaReproduzir(baseMusicas[0].name, baseMusicas[0].album);

const botãoPausar = document.getElementById('btnPause');

const botaoPlay = document.getElementById('btnPlay');

let musicaAtual = 0;

function construirPlaylist(musica, musicaId) {
    const musicaElemento = document.createElement('li');
    const nomeMusica = document.createElement('p');
    const nomeArtista = document.createElement('p');
    const nomeAlbum = document.createElement('p');

    musicaElemento.dataset.id = musicaId;

    nomeMusica.className = 'primeiroItem';
    nomeMusica.innerText = musica.name;
    nomeArtista.innerText = musica.artist;
    nomeAlbum.innerText = musica.album;

    musicaElemento.appendChild(nomeMusica);
    musicaElemento.appendChild(nomeArtista);
    musicaElemento.appendChild(nomeAlbum);

    musicaElemento.addEventListener('click', tocarMusica);

    listaMusicas.appendChild(musicaElemento);
}

for(let contador = 0; contador < baseMusicas.length; contador++) {
    construirPlaylist(baseMusicas[contador], contador);
}

function tocarMusica(evento) {
    const elementoClicado = evento.currentTarget;

    if(elementoClicado.tagName == 'LI'){
    const musicaId = elementoClicado.dataset.id;
    
    const musicaSelecionada = baseMusicas[musicaId];
    tagAudio.src = musicaSelecionada.path;

    musicaAtual = Number(musicaId);
    tagAudio.play();
    botaoPlay.classList.add("pause");
    atualizaReproduzir(baseMusicas[musicaAtual].name, baseMusicas[musicaAtual].album);

    } else {
        if(tagAudio.paused) {
            tagAudio.play();
            botaoPlay.classList.add("pause");
        } else {
            tagAudio.pause();
            botaoPlay.classList.remove("pause");
        }
    }

}

botaoPlay.addEventListener('click', tocarMusica);

function pausarMusica() {
    tagAudio.pause();
    botaoPlay.classList.remove("pause");
}

botãoPausar.addEventListener('click', pausarMusica);


function tocarProximaMusica() {
    if(musicaAtual === baseMusicas.length - 1){
        musicaAtual = 0
    } else {
        musicaAtual++
    }

    tagAudio.src = baseMusicas[musicaAtual].path;
    tagAudio.play();

    let nomeMusica = baseMusicas[musicaAtual].name;
    let nomeAlbum = baseMusicas[musicaAtual].album;
    //adicionar imgs depois
    atualizaReproduzir(nomeMusica, nomeAlbum);
    botaoPlay.classList.add("pause");
   }

const btnNext = document.getElementById('btnNext');
btnNext.addEventListener('click', tocarProximaMusica);

function tocarMusicaAnterior(){
    if(musicaAtual === 0){
        musicaAtual =  baseMusicas.length - 1
    } else {
        musicaAtual--
    }

    tagAudio.src = baseMusicas[musicaAtual].path;
    tagAudio.play();
    atualizaReproduzir(nomeAlbum, nomeMusica);
    botaoPlay.classList.add("pause");
   }

const btnReturn = document.getElementById('btnReturn');
btnReturn.addEventListener('click', tocarMusicaAnterior);

const areaReproduzirVolume = document.querySelector(".areaReproduzirVolume input");
areaReproduzirVolume.addEventListener("input", ()=> {
    tagAudio.volume = areaReproduzirVolume.value;
})

function atualizaReproduzir(musica, nome){
    // Mudar para function atualizaReproduzir(musica, nome, foto) quando tiver as imgs
    const nomeMusica = document.getElementById('nomeMusica');
    const nomeAlbum = document.getElementById('nomeAlbum');
    const fotoAlbum = document.getElementById('fotoAlbum');
    
    // fotoAlbum.src = foto
    nomeMusica.innerText = musica
    nomeAlbum.innerText = nome
}