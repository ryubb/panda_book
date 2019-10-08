import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import Header from "./Header";
import {
  actions as loginActions,
  selectors as loginSelectors
} from "../redux/modules/Login";

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
const LayoutRoute = ({ loginUser, fetchLoginUser, component, path, exact }) => {
  useEffect(() => {
    if (Object.keys(loginUser).length <= 0) {
      return fetchLoginUser();
    }
  }, []);

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

const mapStateToProps = state => ({
  loginUser: loginSelectors.loginUser(state)
});

const mapDispatchToProps = dispatch => ({
  fetchLoginUser: () => dispatch(loginActions.fetchLoginUserRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutRoute);
