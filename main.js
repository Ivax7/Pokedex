const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll('.btn-header')

// Guardamos la url base para recorrerla el nro de veces de pokemons que queramos
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Recorremos la url 151 veces por 151 pokemons

for(let i = 1; i<=151; i++){
  fetch(URL + i) // concatena i al final de la URL por lo tanto tenemos acceso a todos los pokemon
  .then((response) => response.json()) // convertimos la respuesta a JSON para que la podamos tratar
  .then(data => mostrarPokemon(data)) // llamamos a la función para cada iteración, para cada pokemon y accedemos a sus datos
}

function mostrarPokemon(poke) {
  // map genera un array con lo que le pasemos 
  let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`)
  tipos = tipos.join(''); // juntamos los elementos del array en un string

  // Añadimos 0s delante si el pokemon no tiene 3 dígitos

  let pokeId = poke.id.toString() // convertimos el id a string
  // comprobamos la longitud del string y añadimos 0s hasta máximo de 3 números
  if(pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  };

  // Creamos los elementos HTML de los pokemon
  const div = document.createElement("div");
  div.classList.add("pokemon");
  /* Contenido del div padre */
  div.innerHTML = `
      <p class="pokemon-id-back">#${pokeId}</p>
      <div class="pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="Pikachu">
      </div>
      <did class="pokemon-info">
        <div class="nombre-contenedor">
          <p class="pokemon-id">#${pokeId}</p>
          <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
          ${tipos}
        </div>
        <div class="pokemon-stats">
          <p class="stat">${poke.height}M</p>
          <p class="stat">${poke.weight}KG</p>
        </div>
      </div>
  `;
  listaPokemon.appendChild(div)

}



botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
  const botonId = event.currentTarget.id; // al hacer click nos trae el id del elemento seleccionado
  // Vaciamos los actuales y añadimos los tipos a los que hagamos hecho click
  listaPokemon.innerHTML = ''
for(let i = 1; i<=151; i++){
  fetch(URL + i) 
  .then((response) => response.json())
  .then(data => {
    if(botonId === "ver-todos"){ // damos funcionalidad al boton ver todos
      mostrarPokemon(data)
    } else {
      const tipos = data.types.map(type => type.type.name); // filtramos por tipos
      if(tipos.some(tipo => tipo.includes(botonId))) {
        mostrarPokemon(data);
      }

    }
  })
  }
}))