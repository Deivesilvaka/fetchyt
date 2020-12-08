
# Pesquisa por músicas no youtube e retorna seus links

Como usar?

# instale a biblioteca com o comando abaixo.

npm i fetchyt

# Após a instalação...

# Importe o pacote para o seu projeto.

const {fetchyt} = require("fetchyt")

a biblioteca retorna uma função que é uma promise, então para ser executada precisa ser em uma função assíncrona.

caso você precise buscar por muitos vídeos, você pode utilizar a função "cluster" ao invés da fetchyt

const fetchMusics = async() => {

  Você manda a lista de músicas através de um array e mesmo se for uma única música, seu nome deve ser mandando em um array.

  const musics = ["Paradise city", "Back in black"]

  Utilize o await para que a função espere a busca finalizar para retornar o resultado.

  const results = await fetchyt(musics)

  você também pode colocar um segundo parâmetro na função para definir que tipo de pesquisa você quer por exemplo...

  const results = await fetchyt(musics, "clipe")
  ou
  const results = await fetchyt(musics, "cover")
  ou até mesmo
  const results = await fetchyt(musics, "letra")

  vai do seu desejo.

  você pode fazer todo o tipo de pesquisa que quiser no youtube.

  após isso você pode dar um console.log() no resultado para mostrar todos os links

  console.log(results)

}

fetchMusics()


# O resultado do retorno é um objeto contendo o nome da música como "key", e seu valor é um objeto contendo seu link do youtube, sua thumbnail e o titulo do vídeo no youtube.

{
  paradisecity: {
    href: 'https://www.youtube.com/watch?v=Rbm6GXllBiw',
    thumbnail: 'https://i.ytimg.com/vi/Rbm6GXllBiw/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_0GYGuam1Tt2tYUFOD8lmX6cSwQ',
    title: "Guns N' Roses - Paradise City"
  },
  backinblack: {
    href: 'https://www.youtube.com/watch?v=pAgnJDJN4VA',
    thumbnail: 'https://i.ytimg.com/vi/pAgnJDJN4VA/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLBfP7lIrs8HvDd4ePMs2t8VspxMvw',
    title: 'AC/DC - Back In Black (Official Video)'
  }
}

# Também é possível realizar um scrapping pelo spotify.

const { spotifypl } = require("fetchyt")

const init = async() => {

    a url abaixo pertence a playlist do young lixo e ela é mandada como parametro para a função "spotifypl"

    const spotifyURL = "https://open.spotify.com/playlist/5knTQnV9T1OXMwyiYjwvs0?si=MiBA3yS8SAeCsc4uQLKfmg?si=H12hA24-QI-9iKyPyHccxQ"

    const musicsArray = await spotifypl(spotifyURL)

    a resposta da chamada é um array contendo o nome da música e o do artista.

    console.log(musicsArray)
}

init()

como o resultado retornado da "spotifypl" é um array, podemos utilizar seu retorno na função "fetchyt" para trazer o link das músicas depois.

# download de videos

a função "downloader" faz o download dos videos retornados da função "fetchyt", ela pede dois parametros cujo o primeiro é o objeto retornado com os dados dos videos e o segundo é um objeto indicando onde o video será salvo.

const { downloader } = require("fetchyt")

const init = async() => {

  const musicsObj = {...}

  await downloader(musicsObj, {
      path:`${__dirname}/videos`
  })
   
}

init()

no final os vídeos ficarão salvos na pasta que você selecionou