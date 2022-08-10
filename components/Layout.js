import React from 'react';

const Layout = (props) => (
  <div>
    <h1>HEADER</h1>
    {props.children}
  </div>
);

export default Layout;
