async function buscarPersonagem() {

  const nome = document.getElementById("busca").value.toLowerCase();

  const resultado = document.getElementById("resultado")
  const mensagem = document.getElementById("mensagem")

  resultado.innerHTML = ""
  mensagem.innerHTML = "Carregando..."

  try {

    const resposta = await fetch("https://api.tvmaze.com/singlesearch/shows?q=Stranger%20Things&embed=cast")
    const curiosidade = await fetch('../curiosidades.json')

    if (!resposta.ok) {
      throw new Error("Erro na API")
    }

    const dados = await resposta.json()
    const dadosCurio = await curiosidade.json()

    const elenco = dados._embedded.cast

    mensagem.innerHTML = ""

    const filtrados = elenco.filter(item =>
      item.character.name.toLowerCase().includes(nome)
    )

    if (filtrados.length === 0) {
      mensagem.innerHTML = "Personagem não encontrado"
      return
    }

    filtrados.forEach(item => {
      const personagem = item.character.name
      const ator = item.person.name
      const imagem = item.character.image?.medium || "assets/img/sem-imagem.png"

      const curiosidadePersonagem = dadosCurio.personagens?.find(p =>
        p.nome.toLowerCase() === personagem.toLowerCase())

      const fatoCurioso = curiosidadePersonagem ? curiosidadePersonagem.curiosidade : "Sem curiosidade cadastrada"

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

  } catch (error) {

    mensagem.innerHTML = "Erro ao carregar dados da API."

  }

}
