import React from "react";
import Header from "./Header";
import { Container } from "semantic-ui-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
