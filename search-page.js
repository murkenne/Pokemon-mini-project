// API Base URL
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

// Function to generate a random color
function getRandomColor() {
  const red = Math.floor(Math.random() * 256); // Random red (0-255)
  const green = Math.floor(Math.random() * 256); // Random green (0-255)
  const blue = Math.floor(Math.random() * 256); // Random blue (0-255)
  return `rgb(${red}, ${green}, ${blue})`;
}

// Form setup
document.getElementById("pokemon-form").addEventListener("submit", async (event) => {
  // Prevent form from reloading the page
  event.preventDefault();
  
  const input = document.getElementById("pokemon-input").value.trim().toLowerCase();
  const container = document.getElementById("pokemon-container");
  
  // Clear previous results or error messages
  container.innerHTML = "";

  // Input validation
  if (!input) {
    container.innerHTML = "<p class='error'>Please enter a Pokemon name or ID.</p>"; 
    return;
  }

  try {
    // Fetch Pokemon data
    const response = await fetch(`${baseUrl}${input}`);
    if (!response.ok) throw new Error("Pokemon not found!");

    const pokemon = await response.json();

    // Display Pokemon details
    container.innerHTML = `
      <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <p><strong>ID:</strong> ${pokemon.id}</p>
      <p><strong>Type:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
      <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
      <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
    `;

    // Change the background color to a random color
    document.body.style.backgroundColor = getRandomColor();
  } catch (error) {
    container.innerHTML = `<p class="error">${error.message}</p>`;
  }
});

