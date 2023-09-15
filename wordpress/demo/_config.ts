import lume from "lume/mod.ts";
import relations from "lume/plugins/relations.ts";
import wordpress, { presetRelation } from "../mod.ts";

const site = lume();
site.use(relations({ foreignKeys: { ...presetRelation } }));

site.use(wordpress({
  baseUrl: "https://blog.oscarotero.com",
  limit: 100,
  collections: {
    '/users': 'user',
    '/posts': 'post',
    '/pages': 'page',
    '/tags': 'tag',
    '/categories': 'category',
    '/media': 'media',
  },
}));

export default site;
