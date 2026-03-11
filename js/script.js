// Função assíncrona responsável por buscar um personagem
async function buscarPersonagem() {

  // Pega o valor digitado no input e converte para minúsculo
  const nome = document.getElementById("busca").value.toLowerCase();

  // Pega os elementos do HTML onde o resultado e a mensagem serão exibidos
  const resultado = document.getElementById("resultado")
  const mensagem = document.getElementById("mensagem")

  // Limpa os resultados anteriores e mostra mensagem de carregamento
  resultado.innerHTML = ""
  mensagem.innerHTML = "Carregando..."

  try {
    // Faz a requisição da API da TVMAZE que retorna os dados do elenco
    const resposta = await fetch("https://api.tvmaze.com/singlesearch/shows?q=Stranger%20Things&embed=cast")
    // Busca o arquivo local JSON que contém curiosidades adicionais
    const curiosidade = await fetch('../curiosidades.json')

    // Verifica se a resposta da API foi bem sucedida e se não foi retorna a mensagem de erro
    if (!resposta.ok) {
      throw new Error("Erro na API")
    }

    // Converte as respostas para JSON
    const dados = await resposta.json()
    const dadosCurio = await curiosidade.json()

    // Pega apenas o elenco da série
    const elenco = dados._embedded.cast

    // Remove a mensagem de carregamento
    mensagem.innerHTML = ""

    // Filtra os personagens de acordo com o nome digitado no input
    const filtrados = elenco.filter(item =>
      item.character.name.toLowerCase().includes(nome)
    )

    // Caso nenhum personagem seja encontrado
    if (filtrados.length === 0) {
      mensagem.innerHTML = "Personagem não encontrado"
      return
    }

    // Verifica se o campo de busca não esta vazio
    if (nome != null && nome != ""){

      // Percorre todos os personagens filtrados
      filtrados.forEach(item => {

        // Nome do personagem e do ator
        const personagem = item.character.name
        const ator = item.person.name

        // Caso não exista imagem, usa uma imagem padrão
        const imagem = item.character.image?.medium || "assets/img/sem-imagem.png"

        // Curiosidade padrão caso não exista no JSON
        let fatoCurioso = "Sem curiosidade cadastrada"

        // Curiosidades fixas para personagens específicos
        if (personagem === 'Jane "Eleven" Hopper') {
          fatoCurioso = "Millie Bobby Brown raspou o cabelo de verdade para interpretar Eleven na primeira temporada."
        }

        else if (personagem === 'Maxine "Max" Mayfield') {
          fatoCurioso = "A cena de Max correndo de Vecna ao som de 'Running Up That Hill' virou uma das mais icônicas da série."
        }
        // Caso não seja uma curiosidade fixa, busca no JSON local
        else {
          const curiosidadePersonagem = dadosCurio.personagens?.find(p =>
            p.nome.toLowerCase() === personagem.toLowerCase()
          )

          // Se encontrar curiosidade no JSON, substitui o valor padrão
          if (curiosidadePersonagem) {
            fatoCurioso = curiosidadePersonagem.curiosidade
          }
        }

        // Cria um card HTML para mostrar os dados do personagem
        const card = document.createElement("div")
        card.classList.add("card")

        card.innerHTML = `
      <img src="${imagem}" alt="${personagem}">
      <div class="card-content">
      <h3>${personagem}</h3>
      <p>Curiosidade: ${fatoCurioso}</p>
      <p>Ator: ${ator}</p>
      </div>
      `

        // Adiciona o card dentro do container de resultados
        resultado.appendChild(card)
      })
    } else {

      // Mensagem exibida se o usuário não digitar nada
      mensagem.innerHTML = `
      <p>Input do nome vazio<p/>
      `
    }

  } catch (error) {

    // Caso ocorra erro na requisição da API
    mensagem.innerHTML = "Erro ao carregar dados da API."

  }

}
