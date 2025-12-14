import styled from "styled-components";
import { Header } from "../components/header";
import { AddItemPage, type formValues } from "../feature/Add-item-page";
import { Button } from "@mui/material";
import React from "react";
import { AlertDialog } from "../components/modal";
import { registerDevice } from "../api/api-service";

export const PageLayout = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOnAddItem = () => {
    setOpenDialog(true);
  };

  const handleAddItem = async (val: formValues) => {
    console.log("Item added:", val);
    await registerDevice({
      name: val.name,
      data: { year: val.year, cpu: val.cpu, hard: val.hard, price: val.price },
    })
      .catch((error) => {
        console.error("Error adding item:", error);
      })
      .finally(() => {
        setOpenDialog(false);
      });
  };
  return (
    <StyledWrapper>
      <Header></Header>
      <SyledContentArea>
        <Button variant="contained" onClick={handleOnAddItem}>
          Add Item
        </Button>
        <StyledItemsWrapper></StyledItemsWrapper>
      </SyledContentArea>
      <AlertDialog
        isOpen={openDialog}
        onClose={(val) => {
          setOpenDialog(val);
        }}
      >
        <AddItemPage onItemAdded={handleAddItem} />
      </AlertDialog>
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

const StyledItemsWrapper = styled.div`
  margin-top: 16px;
  display: flex;
`;
