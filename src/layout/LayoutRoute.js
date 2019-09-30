import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
`;

const MainContent = styled.div`
  width: 100%;
`;

// eslint-disable-next-line react/prop-types
const LayoutRoute = ({ component, path, exact }) => {
  const ChildComponent = component;

  return (
    <Route path={path} exact={exact}>
      <MainLayout>
        <Header />
        <MainContent>
          <ChildComponent />
        </MainContent>
      </MainLayout>
    </Route>
  );
};

export default LayoutRoute;
