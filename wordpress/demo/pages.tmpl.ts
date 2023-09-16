export default async function* ({ wp }) {
  // api_path: /wp/v2/posts
  for await (const page of wp.collection("post")) {
    yield { ...page, layout: "post.njk" };
  }

  // api_path: /wp/v2/users
  for await (const page of wp.collection("author")) {
    yield { ...page, layout: "author.njk" };
  }

  // api_path: /wp/v2/tags
  for await (const page of wp.collection("tag")) {
    yield { ...page, layout: "tag.njk" };
  }

  // api_path: /wp/v2/categories
  for await (const page of wp.collection("category")) {
    yield { ...page, layout: "category.njk" };
  }

  // api_path: /wp/v2/pages
  for await (const page of wp.collection("page")) {
    if (page.url === "/") continue; // Skip the home page (it's already generated)
    yield { ...page, layout: "page.njk" };
  }

  // api_path: /wp/v2/movies
  for await (const page of wp.collection("movie")) {
    yield { ...page, layout: "movie.njk" };
  }

  // api_path: /wp/v2/genres
  for await (const page of wp.collection("genre")) {
    yield { ...page, layout: "genre.njk" };
  }

  // api_path: /wp/v2/cooking-recipes
  for await (const page of wp.collection("recipe")) {
    yield { ...page, layout: "recipe.njk" };
  }

  // api_path: /wp/v2/ingredients
  for await (const page of wp.collection("ingredient")) {
    yield { ...page, layout: "ingredient.njk" };
  }
}
