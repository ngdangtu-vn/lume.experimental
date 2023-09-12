import lume from "lume/mod.ts";
import relations from "lume/plugins/relations.ts";
import wordpress, { presetRelation } from "../mod.ts";

const site = lume();
site.use(relations({
  foreignKeys: {
    ...presetRelation,
    chapter: {
      foreignKey: "chapter_id",
      pluralRelationKey: "chapters",
    },
    newsletter: {
      foreignKey: "newsletter_id",
      pluralRelationKey: "newsletters",
    },
  }
}));

site.use(wordpress({
  baseUrl: "https://css-tricks.com",
  limit: 100,
  collections: {
    'chapter': '/wp/v2/chapters',
    'newsletter': '/wp/v2/newsletters',
  },
  transform: {
    'chapter': (data, raw) => data,
    'newsletter': (data, raw) => data,
  }
}));

export default site;
