function movieParser(text) {
  // Extracting title
  const titleMatch = text.match(/#(.+)/m);
  const title = titleMatch ? titleMatch[1].trim() : "<no title>";

  // Extracting poster url
  const posterMatch = text.match(/!(.+)/m);
  const poster = posterMatch
    ? posterMatch[1].trim()
    : "https://fakeimg.pl/600x400/141414/ffffff?text=no+img";

  // Extracting description
  const descriptionMatch = text.match(/\[(.+)\]/);
  const description = descriptionMatch ? descriptionMatch[1].trim() : "";

  // Extracting rating
  const ratingMatch = text.match(/^\^(.+)/m);
  const rating = ratingMatch ? parseFloat(ratingMatch[1]) : "";

  // Extracting cast
  const castMatch = text.match(/@(.+)/m);
  const cast = castMatch
    ? castMatch[1]
        .trim()
        .split(",")
        .map((i) => i.trim())
    : [];

  // Extracting genre
  const genreMatch = text.match(/&(.+)/m);
  const genre = genreMatch
    ? genreMatch[1]
        .trim()
        .split(",")
        .map((i) => i.trim())
    : [];

  // Extracting production
  const productionMatch = text.match(/\$(.+)/m);
  const production = productionMatch
    ? productionMatch[1]
        .trim()
        .split(",")
        .map((i) => i.trim())
    : [];

  // Extracting episodes

  const episodeMatch = text.match(/\{(.+)\}/s);
  const scenes = [];

  if (episodeMatch) {
    const episodeText = episodeMatch[1];
    const innerRegex = /^(.*?):(.*)\n?/gm;
    let innerMatch;
    while ((innerMatch = innerRegex.exec(episodeText)) !== null) {
      scenes.push({
        name: innerMatch[1].trim(),
        links: innerMatch[2].split(",").map((item) => item.trim()),
      });
    }
  }

  return {
    title,
    poster,
    rating,
    description,
    cast,
    genre,
    production,
    scenes,
  };
}
