class Pokemon {
  constructor(name, types, hp, sprite) {
    this.name = name;
    this.types = types;
    this.hp = hp;
    this.sprite = sprite;
  }
}

const pokemonTrainerOne = {
  name: "Trainer One",
  pokemons: []
}

const pokemonTrainerTwo = {
  name: "Trainer Two",
  pokemons: []
}

async function startBattle() {
  // assigns 6 pokemon to both trainers
  [pokemonTrainerOne.pokemons, pokemonTrainerTwo.pokemons] = await Promise.all([
    assignPokemon(),
    assignPokemon(),
  ]);

  // Displays trainer names and images
  document.getElementById('trainerOne').innerText = "Trainer One";
  document.getElementById('trainerTwo').innerText = "Trainer Two";
  
  // Displays pokemon names
  const pokemonOne = document.getElementById('pokemonOne');
  const pokemonTwo = document.getElementById('pokemonTwo');
  
  while (pokemonTrainerOne.pokemons.length && pokemonTrainerTwo.pokemons.length) {
    console.log("in battle");
    pokemonOne.innerText = pokemonTrainerOne.pokemons[0].name;
    pokemonTwo.innerText = pokemonTrainerTwo.pokemons[0].name;
    pokemonTrainerOne.pokemons.shift();
    pokemonTrainerTwo.pokemons.shift();
    console.log(pokemonTrainerOne.pokemons);
  }
}

async function assignPokemon() {
  let pokemons = [];
  for (let i = 0; i < 6; i++) {
    try {
      // randomly generates id between 1 and 150 to randomize pokemon
      let res = await axios.get("https://pokeapi.co/api/v2/pokemon/" + Math.round((Math.random() * 151) + 1));
      let pokemon = res.data;
      pokemons.push(new Pokemon(pokemon.name, pokemon.types, pokemon.stats[0].base_stat, pokemon.sprites.front_default));
    } catch (err) {
      console.error("Error fetching Pokemon: ", err);
    } 
  }
  return pokemons;
}

async function fight() {
  // Displays pokemon names
}