async function buscarPersonagem() {

  const nome = document.getElementById("busca").value.toLowerCase()

  const resultado = document.getElementById("resultado")
  const mensagem = document.getElementById("mensagem")

  resultado.innerHTML = ""
  mensagem.innerHTML = "Carregando..."

  try {

    const resposta = await fetch("https://api.tvmaze.com/singlesearch/shows?q=Stranger%20Things&embed=cast")
    const curiosidade = await fetch('../ curiosidade.json')



    if (!resposta.ok) {
      throw new Error("Erro na API")
    }

    const dados = await resposta.json()
    const dadosCurio = curiosidade.json()
    console.log(dadosCurio)
    const elenco = dados._embedded.cast

    mensagem.innerHTML = ""

    const filtrados = elenco.filter(item =>
      item.character.name.toLowerCase().includes(nome)
    )
    const curiosfiltrados = elenco.filter(item => item.personagens.nome.toLowerCase().includes(nome))

    if (filtrados.length === 0) {
      mensagem.innerHTML = "Personagem não encontrado"
      return
    }

    filtrados.forEach(item => {
      curiosfiltrados.forEach(item => {
        const fatoCurioso = item.personagens.curiosidade;


      const personagem = item.character.name
      const ator = item.person.name
      const imagem = item.character.image?.medium || "assets/img/sem-imagem.png"

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

      resultado.appendChild(card)
      })
    })

  } catch (error) {

    mensagem.innerHTML = "Erro ao carregar dados da API."

  }

}
//prontinho, ve la
//limpo
//o chat mandando de gente que nem ta na lista kkkskssks
//é pq eu usei a lista no prompt
//sim vou tirar os que n tem, eu olhei la na api
// tipo eles existem, mas como n sao principais é so com caminho especifico
//mas acho q tem alguns a maius, pra garantir
//ta bom, perfito. vou tenta usar o fatch para essa api
//pronto
//vc vai mexendo aqui, eu vou mexendo no html e css, arrumar algumas coisas
//okay. vou tenatr resolver aqui
//blz
//amg, vc vai ter que colocar a logo pra mim, pq eu n consigo add aq,  pasta ta no seu pc ai ne
//pede pro chat a logo se st em fundo transparente e png


//acho que foi. dá uma olhadinha, vê se faz sentido
//vou ver, queria abrir no web tbm, mas pra mim n vai
//acho q taok