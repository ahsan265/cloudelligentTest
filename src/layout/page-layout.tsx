import styled from "styled-components";
import { Header } from "../components/header";
import { AddItemPage } from "../feature/Add-item-page";
export const PageLayout = () => {
  return (
    <StyledWrapper>
      <Header></Header>
      <SyledContentArea>
        <AddItemPage />
      </SyledContentArea>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const SyledContentArea = styled.div`
  height: calc(100vh - 64px);
  width: 100vw;
  padding: 16px;
`;
