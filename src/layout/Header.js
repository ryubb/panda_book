import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.div`
  display: flex;
`;

const HeaderItem = styled(Link)`
  margin-right: 20px;
`;

const headerList = [
  { name: "トップへ", to: "/" },
  { name: "新規登録", to: "/signup" },
  { name: "ログイン", to: "/login" },
  { name: "タイムライン", to: "/timelines" }
];

const Header = () => (
  <HeaderWrapper>
    {headerList.map(item => (
      <HeaderItem key={item.to} to={item.to}>
        <p>{item.name}</p>
      </HeaderItem>
    ))}
  </HeaderWrapper>
);
export default Header;
