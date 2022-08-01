import { GatsbyNode } from "gatsby";

import * as constants from "./constants";
import * as queries from "./queries";
import * as utils from "./utils";

const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions;

  createPage({
    path: constants.routes.notFoundRoute,
    component: constants.templates.notFoundTemplate,
    context: {},
  });

  createPage({
    path: constants.routes.tagsListRoute,
    component: constants.templates.tagsTemplate,
    context: {},
  });

  createPage({
    path: constants.routes.categoriesListRoute,
    component: constants.templates.categoriesTemplate,
    context: {},
  });

  const pages = await queries.pagesQuery(graphql);

  pages.forEach((edge) => {
    const { node } = edge;

    if (node?.frontmatter?.template === "page" && node?.fields?.slug) {
      createPage({
        path: node.fields.slug,
        component: constants.templates.pageTemplate,
        context: { slug: node.fields.slug },
      });
    } else if (node?.frontmatter?.template === "post" && node?.fields?.slug) {
      createPage({
        path: node.fields.slug,
        component: constants.templates.postTemplate,
        context: { slug: node.fields.slug },
      });
    }
  });

  const categories = await queries.categoriesQuery(graphql);

  categories.forEach((category) => {
    const path = utils.concat(
      constants.routes.categoryRoute,
      "/",
      utils.toKebabCase(category.fieldValue),
    );
    console.log(category.fieldValue);
    createPage({
      path,
      component: constants.templates.categoryTemplate,
      context: {
        group: category.fieldValue,
      }
    })
  });

  const tags = await queries.tagsQuery(graphql);

  tags.forEach((tag) => {
    const path = utils.concat(
      constants.routes.tagRoute,
      "/",
      utils.toKebabCase(tag.fieldValue),
    );

    createPage({
      path,
      component: constants.templates.tagTemplate,
      context: {
        group: tag.fieldValue,
      }
    });
  });

  createPage({
    path: constants.routes.indexRoute,
    component: constants.templates.indexTemplate,
    context: {}
  });

  createPage({
    path: constants.routes.indexRouteVi,
    component: constants.templates.indexTemplateVi,
    context: {}
  });

};

export { createPages };
