import styled from "styled-components";
import { Header } from "../components/header";
import { AddItemPage, type formValues } from "../feature/Add-item-page";
import { Button } from "@mui/material";
import React from "react";
import { AlertDialog } from "../components/modal";
import { registerDevice, updateDevice } from "../api/api-service";
import { db } from "../db-local/index-db-wrapper";
import { ListCard } from "../components/device";
import { useLiveQuery } from "dexie-react-hooks";
import type { IDeviceItem } from "../types/device-types";

export const PageLayout = () => {
  const devices = useLiveQuery(() => db.getAllDevices());
  const [openDialog, setOpenDialog] = React.useState(false);
  const [updateItem, setUpdateItem] = React.useState<IDeviceItem | null>(null);
  const handleOnAddItemDialog = () => {
    setUpdateItem(null);
    setOpenDialog(true);
  };
  const handleOnItemUpdate = (val: IDeviceItem) => {
    setUpdateItem(val);
    setOpenDialog(true);
  };
  const updateItemHandler = (val: formValues) => {
    if (!updateItem) return;
    updateDevice(updateItem?.id, {
      name: val.name,
      data: { year: val.year, cpu: val.cpu, hard: val.hard, price: val.price },
    })
      .then((data) => {
        db.setDevice(data);
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      })
      .finally(() => {
        setOpenDialog(false);
      });
  };

  const handleAddItem = async (val: formValues) => {
    // for updating existing item
    if (updateItem) {
      updateItemHandler(val);
    } else {
      // for adding new item
      registerDevice({
        name: val.name,
        data: {
          year: val.year,
          cpu: val.cpu,
          hard: val.hard,
          price: val.price,
        },
      })
        .then((data) => {
          db.setDevice(data);
        })
        .catch((error) => {
          console.error("Error adding item:", error);
        })
        .finally(() => {
          setOpenDialog(false);
        });
    }
  };
  return (
    <StyledWrapper>
      <Header />
      <SyledContentArea>
        <Button variant="contained" onClick={handleOnAddItemDialog}>
          Add Item
        </Button>
        <StyledItemsWrapper>
          <ListCard items={devices ?? []} onUpdate={handleOnItemUpdate} />
        </StyledItemsWrapper>
      </SyledContentArea>
      <AlertDialog
        isOpen={openDialog}
        onClose={(val) => {
          setOpenDialog(val);
        }}
      >
        <AddItemPage data={updateItem} onSubmitted={handleAddItem} />
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
  gap: 12px;
  flex-wrap: wrap;
`;
