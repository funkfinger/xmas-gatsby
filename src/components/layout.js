/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div>
        <main>{children}</main>
        <footer>
          <p>
            All media on this website is for sampling and promotional purposes and we encourage you
            to purchase the albums of any song you hear and like. If you have rights to any of the
            media here (or represent those who do) and feel that we have not used your media in the
            way it was intended, please contact us (xmas [at] irk dot com) and we'll remove it.
            Happy holidays!
          </p>

          <p>
            Built with <a href="https://www.gatsbyjs.com">Gatsby</a>
          </p>
        </footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
