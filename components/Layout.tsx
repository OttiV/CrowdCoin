import React, { FC, ReactNode } from 'react';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Header from './Header';

interface LayoutProps {
  children:ReactNode
}

const Layout:FC<LayoutProps> = ({ children }) => (
  <Container>
    <Header />
    {children}
  </Container>
);

export default Layout;
