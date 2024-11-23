// Function to fetch a random Pokemon's details
async function fetchPokemonDetails() {
  const randomId = Math.floor(Math.random() * 898) + 1; // Pokemon IDs range from 1 to 898
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return {
      name: data.name,
      id: data.id,
      imageUrl: data.sprites.front_default || "https://via.placeholder.com/150?text=No+Image",
    };
  } catch (error) {
    console.error("Error retrieving Pokemon", error);
    return {
      name: "Unknown",
      id: "N/A",
      imageUrl: "https://via.placeholder.com/150?text=Error",
    };
  }
}

// Function to handle images and details
const handleImages = async () => {
  const pokemonContainer = document.getElementById("pokemon-container");

  try {
    // Await the Pokemon details
    const [pokemon1, pokemon2, pokemon3] = await Promise.all([
      fetchPokemonDetails(),
      fetchPokemonDetails(),
      fetchPokemonDetails(),
    ]);

    // Dynamically update the container with names, IDs, and images
    pokemonContainer.innerHTML = `
      <div style="text-align: center; margin: 10px;">
        <img src="${pokemon1.imageUrl}" alt="${pokemon1.name}" style="width:150px; height:auto;">
        <p><strong>${pokemon1.name.toUpperCase()}</strong> (ID: ${pokemon1.id})</p>
      </div>
      <div style="text-align: center; margin: 10px;">
        <img src="${pokemon2.imageUrl}" alt="${pokemon2.name}" style="width:150px; height:auto;">
        <p><strong>${pokemon2.name.toUpperCase()}</strong> (ID: ${pokemon2.id})</p>
      </div>
      <div style="text-align: center; margin: 10px;">
        <img src="${pokemon3.imageUrl}" alt="${pokemon3.name}" style="width:150px; height:auto;">
        <p><strong>${pokemon3.name.toUpperCase()}</strong> (ID: ${pokemon3.id})</p>
      </div>
    `;
  } catch (error) {
    console.error("Error retrieving images", error);
    pokemonContainer.innerHTML = `<p class="error">Failed to load Pokémon details.</p>`;
  }
};

// Initial call to fetch images
const updateImages = () => {
  handleImages();
};

updateImages();

// Update images every 5 seconds
setInterval(updateImages, 5000);
