import lume from "lume/mod.ts";
import relations from "lume/plugins/relations.ts";
import wordpress from "../mod.ts";
import { PageData, Site } from "lume/core.ts";

const site = lume();
site.use(relations({
  foreignKeys: {
    post: {
      foreignKey: "post_id",
      pluralRelationKey: "posts",
    },
    tag: {
      foreignKey: "tag_id",
      pluralRelationKey: "tags",
    },
    author: {
      foreignKey: "author_id",
      pluralRelationKey: "authors",
    },
    category: {
      foreignKey: "category_id",
      pluralRelationKey: "categories",
    },
    page: {
      foreignKey: "page_id",
      pluralRelationKey: "pages",
    },
    movie: {
      foreignKey: "movie_id",
      pluralRelationKey: "movies",
    },
    genre: {
      foreignKey: "genre_id",
      pluralRelationKey: "genres",
    },
    recipe: {
      foreignKey: "recipe_id",
      pluralRelationKey: "recipes",
    },
    ingredient: {
      foreignKey: "ingredient_id",
      pluralRelationKey: "ingredients",
    },
  },
}));

// Test basic configurations
site.use(wordpress({
  baseUrl: "https://wplab.ngdangtu.dev",
  maxPerCollection: 500,
  auth: "lazy-dude:vCcT KmbC bw0f dCto oAer BJq9",
  collections: {
    movie: "/wp/v2/movies",
    genre: "/wp/v2/genres",
    recipe: "/wp/v2/cooking-recipes",
    ingredient: "/wp/v2/ingredients",
  },
  transform: {
    movie: (data, raw) => ({
      ...data,
      title: raw?.title?.rendered,
      excerpt: raw?.excerpt?.rendered,
      media_id: raw.acf?.poster,
      imdb_id: raw.acf?.imdb_id,
      genre_id: raw.genres,
    }),
    genre: (data, raw) => ({
      ...data,
      name: raw?.name,
      description: raw?.description,
    }),
    recipe: (data, raw) => ({
      ...data,
      title: raw?.title?.rendered,
      content: raw?.content?.rendered,
      excerpt: raw?.excerpt?.rendered,
      media_id: raw?.featured_media,
      author_id: raw?.author,
      ingredient_id: raw?.ingredients,
    }),
    ingredient: (data, raw) => ({
      ...data,
      name: raw?.name,
      description: raw?.description,
    }),
  },
}));

// Test Hooks
site.use((s: Site) =>
  s.hooks.addTransformer({
    post: (data: Partial<PageData>, raw: any) => ({
      ...data,
      modified_by_hook: raw?.title?.rendered + " modified by hook",
    }),
  })
);

export default site;
