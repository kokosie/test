// event listners
document.getElementById("search").addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredMovies = MoviesData.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );
  renderMovies(filteredMovies);
});

document.getElementById("toggleOuterDetails").addEventListener("click", () => {
  const movieCards = document.querySelectorAll(".movieCard");
  const isChecked = document.getElementById("toggleOuterDetails").checked;
  if (isChecked) movieCards.forEach((mc) => (mc.open = true));
  else movieCards.forEach((mc) => (mc.open = false));
});

document.getElementById("toggleInnerDetails").addEventListener("click", () => {
  const Scenes = document.querySelectorAll(".scene");
  const isChecked = document.getElementById("toggleInnerDetails").checked;
  if (isChecked) Scenes.forEach((s) => (s.open = true));
  else Scenes.forEach((s) => (s.open = false));
});

// main
let MoviesData = [];
fetch("/data")
  .then((response) => response.text())
  .then((txt) => {
    txt.split("\n\n").forEach((mtxt) => MoviesData.push(movieParser(mtxt)));
    renderMovies(MoviesData);
  });
