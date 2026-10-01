const form = document.getElementById("searchForm");
const input = document.getElementById("pokemonInput");
const mensagem = document.getElementById("mensagem");
const card = document.getElementById("pokemonCard");

form.addEventListener("submit", async function (event) {
  event.preventDefault(); // impede o form de recarregar a página

  const nome = input.value.toLowerCase().trim();
  await buscarPokemon(nome);
});

async function buscarPokemon(nome) {
  mensagem.textContent = "Buscando...";
  card.hidden = true;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`); // espera a API responder

    if (!response.ok) { // se a resposta NÃO foi ok. (o ! simboliza o não)
      throw new Error("Pokémon não encontrado");  // cria um erro de propósito e pula pro catch
    }

    const data = await response.json(); // espera a resposta virar objeto
    mostrarPokemon(data); // mostra os dados na tela
    mensagem.textContent = ""; // limpa a mensagem de erro antiga

  } catch (erro) { // se algo deu errado no try, cai aqui
    mensagem.textContent = erro.message; // mostra o texto do erro na tela
  }
}

function mostrarImagem(id, url, texto) {
  const imagem = document.getElementById(id); 
  imagem.src = url;   
  imagem.alt = texto; 
}

function mostrarPokemon(data) {
  document.getElementById("pokemonNome").textContent = data.name;
  document.getElementById("pokemonId").textContent = data.id;
  document.getElementById("pokemonPeso").textContent = data.weight;
  document.getElementById("pokemonTipo").textContent = data.types
    .map(item => item.type.name)
    .join(", ");

  mostrarImagem("pokemonImage", data.sprites.front_default, `Frente do ${data.name}`);
  mostrarImagem("pokemonImageCostas", data.sprites.back_default, `Costas do ${data.name}`);
  mostrarImagem("pokemonImageShiny", data.sprites.front_shiny, `Frente shiny do ${data.name}`);
  card.hidden = false;

}
