const pokemonTrainerOne = {
  name: "Trainer One",
  pokemons: []
}

const pokemonTrainerTwo = {
  name: "Trainer Two",
  pokemons: []
}

function startBattle() {
  // assigns 6 pokemon to both trainers
  for (let i = 0; i < 6; i++) {
    assignPokemon(pokemonTrainerOne);
    assignPokemon(pokemonTrainerTwo)
  }
}

async function assignPokemon(name) {
  try {
    // randomly generates id between 1 and 150 to randomize pokemon
    let res = await axios.get("https://pokeapi.co/api/v2/pokemon/" + Math.round((Math.random() * 150) + 1));
    name.pokemons.push(res.data);
  } catch (err) {
    console.error("Error fetching Pokemon: ", err);
  }
}