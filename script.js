class Pokemon {
  constructor(name, types, hp, attack, speed, sprite) {
    this.name = name;
    this.types = types;
    this.hp = hp;
    this.attack = attack;
    this.speed = speed;
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
  
  // Initiates battle
  // while (pokemonTrainerOne.pokemons.length && pokemonTrainerTwo.pokemons.length) {
    // determines who goes first
    if (pokemonTrainerOne.pokemons[0].speed >= pokemonTrainerTwo.pokemons[0].speed) {
      // trainer one goes first
      console.log("trainer one went first");
      pokemonTrainerTwo.pokemons[0].hp -= pokemonTrainerOne.pokemons[0].attack;
      // if second trainer's pokemon is still alive
      if (pokemonTrainerTwo.pokemons[0].hp > 0) {
        // attack
        pokemonTrainerOne.pokemons[0].hp -= pokemonTrainerTwo.pokemons[0].attack;
      } else {
        // shift
        pokemonTrainerTwo.pokemons.shift();
        console.log("trainer two's pokemon has been defeated");
        // continue;
      }
    } else {
      // trainer two goes first
      console.log("trainer two went first");
      pokemonTrainerOne.pokemons[0].hp -= pokemonTrainerTwo.pokemons[0].attack;
      // if first trainer's pokemon is still alive
      if (pokemonTrainerOne.pokemons[0].hp > 0) {
        // attack
        pokemonTrainerTwo.pokemons[0].hp -= pokemonTrainerOne.pokemons[0].attack;
      } else {
        // shift
        pokemonTrainerOne.pokemons.shift();
        console.log("trainer one's pokemon has been defeated");
        // continue;
      }
      pokemonTrainerTwo.pokemons[0].hp -= pokemonTrainerOne.pokemons[0].attack;
    }
    console.log(pokemonTrainerOne.pokemons[0].hp);
    console.log(pokemonTrainerTwo.pokemons[0].hp);
    // pokemonOne.innerText = pokemonTrainerOne.pokemons[0].name;
    // pokemonTwo.innerText = pokemonTrainerTwo.pokemons[0].name;
    // pokemonTrainerOne.pokemons.shift();
    // pokemonTrainerTwo.pokemons.shift();
    // // console.log(pokemonTrainerOne.pokemons);
  // }
}

async function assignPokemon() {
  let pokemons = [];
  for (let i = 0; i < 6; i++) {
    try {
      // randomly generates id between 1 and 150 to randomize pokemon
      let res = await axios.get("https://pokeapi.co/api/v2/pokemon/" + Math.round((Math.random() * 151) + 1));
      let pokemon = res.data;
      // console.log(pokemon);
      pokemons.push(new Pokemon(pokemon.name, pokemon.types, pokemon.stats[0].base_stat, pokemon.stats[1].base_stat, pokemon.stats[5].base_stat, pokemon.sprites.front_default));
    } catch (err) {
      console.error("Error fetching Pokemon: ", err);
    } 
  }
  console.log(pokemons);
  return pokemons;
}

async function fight() {
  // Displays pokemon names
}