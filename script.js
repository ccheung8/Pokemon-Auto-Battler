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
  
  // Get pokemon name containers
  const pokemonOne = document.getElementById('pokemonOne');
  const pokemonTwo = document.getElementById('pokemonTwo');
  
  // Initiates battle
  while (pokemonTrainerOne.pokemons.length && pokemonTrainerTwo.pokemons.length) {
    // Displays pokemon names
    pokemonOne.innerText = pokemonTrainerOne.pokemons[0].name;
    pokemonTwo.innerText = pokemonTrainerTwo.pokemons[0].name;
    console.log(pokemonTrainerOne.pokemons);
    console.log(pokemonTrainerTwo.pokemons);
    
    // determines who goes first
    if (pokemonTrainerOne.pokemons[0].speed >= pokemonTrainerTwo.pokemons[0].speed) {
      // trainer one goes first
      console.log("trainer one went first");
      fightCalc(pokemonTrainerOne.pokemons, pokemonTrainerTwo.pokemons);
    } else {
      // trainer two goes first
      console.log("trainer two went first");
      fightCalc(pokemonTrainerTwo.pokemons, pokemonTrainerOne.pokemons);
    }
  }

  const winner = document.getElementById("winner");
  // Displays winner
  if (pokemonTrainerOne.pokemons.length > pokemonTrainerTwo.pokemons.length) {
    winner.innerText = "Pokemon Trainer One Wins!"
  } else {
    winner.innerText = "Pokemon Trainer Two Wins!"
  }
}

async function assignPokemon() {
  let pokemons = [];
  for (let i = 0; i < 6; i++) {
    try {
      // randomly generates id between 1 and 151 to randomize pokemon
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

function fightCalc(firstTrainerPokemons, secondTrainerPokemons) {
  secondTrainerPokemons[0].hp -= firstTrainerPokemons[0].attack;
  if (secondTrainerPokemons[0].hp > 0) {
    firstTrainerPokemons[0].hp -= secondTrainerPokemons[0].attack;
    if (firstTrainerPokemons[0].hp < 1) {
      firstTrainerPokemons.shift();
      console.log("Trainer who went first defeated");
    }
  } else {
    secondTrainerPokemons.shift();
    console.log("Trainer who went second defeated");
  }
}