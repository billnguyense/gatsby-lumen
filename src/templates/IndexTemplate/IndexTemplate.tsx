import { graphql } from "gatsby";
import { SharedIndexTemplate } from "./SharedIndexTemplate";

export const query = graphql`
  query IndexTemplate {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          draft: { ne: true }
          tags: { ne: "vi_VN" }
        }
      }
    ) {
      edges {
        node {
          fields {
            categorySlug
            slug
          }
          frontmatter {
            description
            category
            title
            date
          }
        }
      }
    }
  }
`;

export default SharedIndexTemplate;
