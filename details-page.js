// Fetch Pokémon details from localStorage
const pokemonData = JSON.parse(localStorage.getItem("selectedPokemon"));

async function fetchAdditionalDetails() {
  if (!pokemonData) {
    document.querySelector(".details-container").innerHTML = `
      <p class="text-danger">No Pokémon data found. Please search for a Pokémon first.</p>
    `;
    return;
  }

  try {
    // Fetch additional Pokémon data
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonData.name}`);
    if (!response.ok) throw new Error("Failed to fetch additional Pokémon details");

    const fullDetails = await response.json();

    // Extract additional details
    const abilities = fullDetails.abilities.map((ability) => ability.ability.name).join(", ");
    const stats = fullDetails.stats.map((stat) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join("");
    const moves = fullDetails.moves.map((move) => move.move.name).slice(0, 10).join(", "); // Limit to 10 moves for brevity

    // Display Pokémon details
    document.querySelector(".details-container").innerHTML = `
      <h1>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h1>
      <img src="${pokemonData.sprite}" alt="${pokemonData.name}" class="img-fluid">
      <p><strong>ID:</strong> ${pokemonData.id}</p>
      <p><strong>Type:</strong> ${pokemonData.types.join(", ")}</p>
      <p><strong>Height:</strong> ${pokemonData.height} m</p>
      <p><strong>Weight:</strong> ${pokemonData.weight} kg</p>
      <p><strong>Abilities:</strong> ${abilities}</p>
      <h3>Base Stats</h3>
      <ul>${stats}</ul>
      <h3>Top Moves</h3>
      <p>${moves}</p>
    `;
  } catch (error) {
    document.querySelector(".details-container").innerHTML = `
      <p class="text-danger">${error.message}</p>
    `;
  }
}

// Fetch and display additional details on page load
fetchAdditionalDetails();
