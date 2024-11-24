// Function to fetch and display Pokémon details
async function fetchPokemonDetails() {
    const params = new URLSearchParams(window.location.search);
    const pokemonIdOrName = params.get("id");

    if (!pokemonIdOrName) {
        document.querySelector(".details-container").innerHTML = "<p class='text-danger'>No Pokémon ID or name provided.</p>";
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`);
        if (!response.ok) throw new Error("Pokémon not found!");

        const pokemon = await response.json();

        // Populate details on the page
        document.getElementById("pokemon-name").textContent = pokemon.name.toUpperCase();
        document.getElementById("pokemon-image").src = pokemon.sprites.front_default;
        document.getElementById("pokemon-image").alt = pokemon.name;
        document.getElementById("pokemon-id").textContent = `ID: ${pokemon.id}`;
        document.getElementById("pokemon-type").textContent = `Type: ${pokemon.types.map(t => t.type.name).join(", ")}`;
        document.getElementById("pokemon-height").textContent = `Height: ${pokemon.height}`;
        document.getElementById("pokemon-weight").textContent = `Weight: ${pokemon.weight}`;
    } catch (error) {
        document.querySelector(".details-container").innerHTML = `<p class='text-danger'>${error.message}</p>`;
    }
}

// Call the function to fetch details on page load
fetchPokemonDetails();
