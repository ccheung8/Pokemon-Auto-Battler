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
  // Clears winner text and battle log
  document.getElementById('winner').innerText = "";
  document.getElementById('battleLog').innerHTML = "";
  // assigns 6 pokemon to both trainers
  [pokemonTrainerOne.pokemons, pokemonTrainerTwo.pokemons] = await Promise.all([
    assignPokemon(),
    assignPokemon(),
  ]);

  // Displays trainer names and images
  document.getElementById('trainerOne').innerText = "Trainer One";
  document.getElementById('trainerTwo').innerText = "Trainer Two";

  // Displays pokimon info and starts fight
  updatePokemon();
  startFight();
}

function startFight() {
  console.log(pokemonTrainerOne.pokemons);
  console.log(pokemonTrainerTwo.pokemons);
  
  // determines who goes first
  const bLogText = document.createElement("p");
  if (pokemonTrainerOne.pokemons[0].speed >= pokemonTrainerTwo.pokemons[0].speed) {
    // displays who goes first in battle log
    bLogText.innerText = pokemonTrainerOne.pokemons[0].name + " goes first!"
    // trainer one goes first
    document.getElementById("battleLog").appendChild(bLogText);
    fightCalc(pokemonTrainerOne.pokemons, pokemonTrainerTwo.pokemons);
  } else {
    // displays who goes first in battle log
    bLogText.innerText = pokemonTrainerTwo.pokemons[0].name + " goes first!"
    // trainer two goes first
    document.getElementById("battleLog").appendChild(bLogText);
    fightCalc(pokemonTrainerTwo.pokemons, pokemonTrainerOne.pokemons);
  }

  // Initiates battle
  if (pokemonTrainerOne.pokemons.length && pokemonTrainerTwo.pokemons.length) {
    // fights with 2 second delay while pokemon are available
    setTimeout(() => {
      updatePokemon();
      startFight();
    }, 2000);
  } else {
    // Displays winner
    if (pokemonTrainerOne.pokemons.length > pokemonTrainerTwo.pokemons.length) {
      document.getElementById("winner").innerText = "Pokemon Trainer One Wins!"
    } else {
      document.getElementById("winner").innerText = "Pokemon Trainer Two Wins!"
    }
  }
}

function fightCalc(firstTrainerPokemons, secondTrainerPokemons) {
  // creates battle log text
  const feintText = document.createElement("p");
  const dmgText = document.createElement("p");
  dmgText.innerText = firstTrainerPokemons[0].name + " attacks " + secondTrainerPokemons[0].name + " for " + firstTrainerPokemons[0].attack + " damage!"

  secondTrainerPokemons[0].hp -= firstTrainerPokemons[0].attack;
  if (secondTrainerPokemons[0].hp > 0) {
    dmgText.innerText = secondTrainerPokemons[0].name + " attacks " + firstTrainerPokemons[0].name + " for " + secondTrainerPokemons[0].attack + " damage!"
    firstTrainerPokemons[0].hp -= secondTrainerPokemons[0].attack;
    if (firstTrainerPokemons[0].hp < 1) {
      updatePokemon();
      feintText.innerText += firstTrainerPokemons[0].name + " has feinted!";
      firstTrainerPokemons.shift();
      console.log("Trainer who went second won");
    }
  } else {
    updatePokemon();
    feintText.innerText = secondTrainerPokemons[0].name + " has feinted!";
    secondTrainerPokemons.shift();
    console.log("Trainer who went first won");
  }
  document.getElementById("battleLog").appendChild(dmgText);
  document.getElementById("battleLog").appendChild(feintText);
}

function updatePokemon() {
  if (pokemonTrainerOne.pokemons.length && pokemonTrainerTwo.pokemons.length) {
    // Get pokemon sprite containers and displays them
    document.getElementById('spriteOne').src = pokemonTrainerOne.pokemons[0].sprite;
    document.getElementById('spriteTwo').src = pokemonTrainerTwo.pokemons[0].sprite;
    
    // Displays pokemon name, hp, attack, and speed
    document.getElementById('pokemonOne').innerText = pokemonTrainerOne.pokemons[0].name;
    document.getElementById('pokemonOneHP').innerText = "HP: " + pokemonTrainerOne.pokemons[0].hp;
    console.log(pokemonTrainerOne.pokemons[0].hp);
    document.getElementById('pokemonOneAtk').innerText = "ATK: " + pokemonTrainerOne.pokemons[0].attack;
    document.getElementById('pokemonOneSPD').innerText = "SPD: " + pokemonTrainerOne.pokemons[0].speed;
    document.getElementById('pokemonTwo').innerText = pokemonTrainerTwo.pokemons[0].name;
    document.getElementById('pokemonTwoHP').innerText = "HP: " + pokemonTrainerTwo.pokemons[0].hp;
    console.log(pokemonTrainerTwo.pokemons[0].hp);
    document.getElementById('pokemonTwoAtk').innerText = "ATK: " + pokemonTrainerTwo.pokemons[0].attack;
    document.getElementById('pokemonTwoSPD').innerText = "SPD: " + pokemonTrainerTwo.pokemons[0].speed;
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
  return pokemons;
}