function renderMovies(movies) {
  const moviesContainer = document.getElementById("movies");
  moviesContainer.innerHTML = "";
  movies.forEach((movie) => {
    const details = document.createElement("details");
    details.className = "movieCard";
    details.open = true;

    details.appendChild(getSummary(movie));
    details.appendChild(getContainer(movie));

    // Adding <details> to moviesContainer
    moviesContainer.appendChild(details);
  });
}
function getSummary(movie) {
  function getStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 > 0 ? 1 : 0;
    const emptyStars = Math.floor(5 - rating);
    console.log(fullStars, halfStars, emptyStars);
    const starsFragment = document.createDocumentFragment();
    for (let i = 0; i < fullStars; i++) {
      let starElement = document.createElement("div");
      starElement.classList.add("star", "full-star");
      starsFragment.appendChild(starElement);
    }
    for (let i = 0; i < halfStars; i++) {
      let starElement = document.createElement("div");
      starElement.classList.add("star", "half-star");
      starsFragment.appendChild(starElement);
    }
    for (let i = 0; i < emptyStars; i++) {
      let starElement = document.createElement("div");
      starElement.classList.add("star", "empty-star");
      starsFragment.appendChild(starElement);
    }
    return starsFragment;
  }
  const summary = document.createElement("summary");
  summary.className = "title";
  const titleSpan = document.createElement("span");
  titleSpan.textContent = movie.title;
  const ratingSpan = document.createElement("span");
  ratingSpan.className = "rating";
  ratingSpan.textContent = movie.rating;
  ratingSpan.appendChild(getStars(movie.rating));

  summary.appendChild(titleSpan);
  summary.appendChild(ratingSpan);

  return summary;
}

function getContainer(movie) {
  const container = document.createElement("div");
  container.className = "container";

  const textContainer = document.createElement("div");
  textContainer.className = "text-container";
  textContainer.appendChild(getDescription(movie));
  textContainer.appendChild(getMovieSection(movie));
  textContainer.appendChild(getScenes(movie));

  const imgContainer = document.createElement("div");
  imgContainer.className = "img-container";
  imgContainer.appendChild(getImage(movie));

  container.appendChild(textContainer);
  container.appendChild(imgContainer);

  return container;
}

function getImage(movie) {
  const img = document.createElement("img");
  img.src = movie.poster;
  return img;
}

function getDescription(movie) {
  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "description";
  descriptionDiv.textContent = movie.description;
  return descriptionDiv;
}
function getMovieSection(movie) {
  const section = document.createElement("section");
  section.className = "movie__section";

  function getCast(m) {
    let castFragment = document.createDocumentFragment();
    m.cast.forEach((castMember) => {
      let spanElement = document.createElement("span");
      spanElement.classList.add("tag");
      spanElement.textContent = castMember;
      castFragment.appendChild(spanElement);
    });
    return castFragment;
  }
  function getProduction(p) {
    let prodFragment = document.createDocumentFragment();
    p.forEach((com) => {
      let spanElement = document.createElement("span");
      spanElement.classList.add("tag");
      spanElement.textContent = com;
      prodFragment.appendChild(spanElement);
    });
    return prodFragment;
  }
  function getGenre(genre) {
    let genreFragment = document.createDocumentFragment();
    genre.forEach((genre) => {
      let spanElement = document.createElement("span");
      spanElement.classList.add("tag");
      spanElement.textContent = genre;
      genreFragment.appendChild(spanElement);
    });
    return genreFragment;
  }
  const castDiv = document.createElement("div");
  castDiv.className = "cast";
  castDiv.appendChild(getCast(movie));

  const productionDiv = document.createElement("div");
  productionDiv.className = "production";
  productionDiv.appendChild(getProduction(movie.production));

  const genreDiv = document.createElement("div");
  genreDiv.className = "genre";
  genreDiv.appendChild(getGenre(movie.genre));

  section.appendChild(castDiv);
  section.appendChild(productionDiv);
  section.appendChild(genreDiv);

  return section;
}
function getScenes(m) {
  const scenesDiv = document.createElement("div");
  scenesDiv.className = "scenes";

  m.scenes.forEach((s) => {
    const sceneDetails = document.createElement("details");
    sceneDetails.className = "scene";

    const sceneSummary = document.createElement("summary");
    sceneSummary.innerHTML = s.name;

    const sceneLinks = document.createElement("div");
    sceneLinks.className = "links";
    s.links.forEach((link) => {
      const aElement = document.createElement("a");
      aElement.href = link;
      aElement.textContent = link;
      sceneLinks.appendChild(aElement);
    });

    sceneDetails.appendChild(sceneSummary);
    sceneDetails.appendChild(sceneLinks);

    scenesDiv.appendChild(sceneDetails);
  });

  // const linksDiv = document.createElement("div");
  // linksDiv.className = "links";

  // let linksFragment = document.createDocumentFragment();
  // m.src.forEach((link) => {
  //   let aElement = document.createElement("a");
  //   aElement.href = link;
  //   aElement.textContent = link;
  //   linksFragment.appendChild(aElement);
  // });

  // linksDiv.appendChild(linksFragment);
  return scenesDiv;
}

/*
<details class="movie" open>
<summary class="title">
  <span>${movie.title}</span>
  <span class="rating">${movie.rating + getStars(movie.rating)}</span>
</summary>

<div class="description">${movie.description}</div>

<section class="movie__section">
  <div class="cast">${getCast(movie)}</div>
  <div class="company">${getCompany(movie)}</div>
  <div class="genre">${getGenre(movie)}</div>
</section>

<div class= "links">${getLinks(movie)}</div>
</details>
*/
