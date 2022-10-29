import * as React from "react";
import { StaticQuery, graphql } from "gatsby";

// import Link from './link';
import config from "../../config";
import { Sidebar, ListItem } from "./styles/Sidebar";

const SidebarLayout = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
              tableOfContents
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      let navItems = [];

      let finalNavItems;

      if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
        const navItems = allMdx.edges.map((item, index) => {
          let innerItems;

          if (item !== undefined) {
            if (
              item.node.fields.slug === location.pathname ||
              config.gatsby.pathPrefix + item.node.fields.slug ===
                location.pathname
            ) {
              if (item.node.tableOfContents.items) {
                innerItems = item.node.tableOfContents.items.map(
                  (innerItem, index) => {
                    const convertTitleToUrl = (title) =>
                      title ? title.replace(/\s+/g, "").toLowerCase() : "#";
                    const itemId = convertTitleToUrl(innerItem.title);

                    const secondLevelItems = innerItem.items?.[0].items;

                    return (
                      <React.Fragment key={index}>
                        <ListItem to={`#${itemId}`} level={1}>
                          {innerItem.title}
                        </ListItem>
                        {secondLevelItems &&
                          secondLevelItems.map((item, secondIndex) => (
                            <ListItem
                              key={`${index}_${secondIndex}`}
                              to={`#${convertTitleToUrl(item.title)}`}
                              level={2}
                            >
                              {item.title}
                            </ListItem>
                          ))}
                      </React.Fragment>
                    );
                  }
                );
              }
            }
          }
          if (innerItems) {
            finalNavItems = innerItems;
          }
        });
      }

      if (finalNavItems && finalNavItems.length) {
        return (
          <Sidebar>
            <ul className={"rightSideBarUL"}>
              <li className={"rightSideTitle"}>CONTENTS</li>
              {finalNavItems}
            </ul>
          </Sidebar>
        );
      } else {
        return (
          <Sidebar>
            <ul></ul>
          </Sidebar>
        );
      }
    }}
  />
);

export default SidebarLayout;
