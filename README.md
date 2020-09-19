
# Pesquisa por músicas no youtube e retorna seus links

Como usar?

# instale a biblioteca com o comando abaixo.

npm i fetchyt

# Após a instalação...

# Importe o pacote para o seu projeto.

const fetchyt = require("fetchyt")

a biblioteca retorna uma função que é uma promise, então para ser executada precisa ser em uma função assíncrona.

const fetchMusics = async() => {

  Você manda a lista de músicas através de um array e mesmo se for uma única música, seu nome deve ser mandando em um array.

  const musics = ["Paradise city", "Back in black"]

  Utilize o await para que a função espere a busca finalizar para retornar o resultado.

  const results = await fetchyt(musics)

  após isso você pode dar um console.log() no resultado para mostrar todos os links

  console.log(results)

}

fetchMusics()


# O resultado do retorno é um objeto contendo o nome da música como "key", e seu valor é seu link do youtube.

{
  paradisecity: 'https://www.youtube.com/watch?v=o6BiIh6orig',
  backinblack: 'https://www.youtube.com/watch?v=KjJe1rBdm9U'
}



