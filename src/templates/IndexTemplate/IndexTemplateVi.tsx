import { graphql } from "gatsby";
import { SharedIndexTemplate } from "./SharedIndexTemplate";

export const query = graphql`
  query IndexTemplateVi {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          draft: { ne: true }
          tags: { eq: "vi_VN" }
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