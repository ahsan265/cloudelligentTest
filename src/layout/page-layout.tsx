import styled from "styled-components";
import { Header } from "../components/header";
import { AddItemPage, type formValues } from "../feature/Add-item-page";
import { Button } from "@mui/material";
import React, { useMemo } from "react";
import { AlertDialog } from "../components/modal";
import { ListCard } from "../components/device";
import type { IDeviceItem } from "../types/device-types";
import { SearchBar } from "../components/search";
import debounce from "lodash.debounce";
import { useCrud } from "../context/crud-context";

export const PageLayout = () => {
  const { addItem, updateItem, deleteItem, searchItem } = useCrud();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [updateItemData, setUpdateItemData] =
    React.useState<IDeviceItem | null>(null);

  const handleOnAddItemDialog = () => {
    setUpdateItemData(null);
    setOpenDialog(true);
  };

  const handleOnItemDelete = React.useCallback(async (val: IDeviceItem) => {
    try {
      await deleteItem(val.id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }, []);

  const handleOnItemUpdate = React.useCallback((val: IDeviceItem) => {
    setUpdateItemData(val);
    setOpenDialog(true);
  }, []);

  const updateItemHandler = async (val: formValues) => {
    if (!updateItemData) return;
    try {
      await updateItem(updateItemData.id, {
        name: val.name,
        data: {
          year: val.year,
          cpu: val.cpu,
          hard: val.hard,
          price: val.price,
        },
      });
    } catch (error) {
      console.error("Error updating item:", error);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleAddItem = async (val: formValues) => {
    if (updateItemData) {
      await updateItemHandler(val);
    } else {
      try {
        await addItem({
          name: val.name,
          data: {
            year: val.year,
            cpu: val.cpu,
            hard: val.hard,
            price: val.price,
          },
        });
      } catch (error) {
        console.error("Error adding item:", error);
      } finally {
        setOpenDialog(false);
      }
    }
  };

  const handleSearch = (searchQuery: string) => {
    searchItem(searchQuery);
  };

  const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);
  return (
    <StyledWrapper>
      <Header />
      <SyledContentArea>
        <StypedActionWrapper>
          <SearchBar onSearch={debouncedSearch} />
          <Button variant="contained" onClick={handleOnAddItemDialog}>
            Add Item
          </Button>
        </StypedActionWrapper>
        <StyledItemsWrapper>
          <ListCard
            onUpdate={handleOnItemUpdate}
            onDelete={handleOnItemDelete}
          />
        </StyledItemsWrapper>
      </SyledContentArea>
      <AlertDialog
        isOpen={openDialog}
        onClose={(val) => {
          setOpenDialog(val);
        }}
      >
        <AddItemPage data={updateItemData} onSubmitted={handleAddItem} />
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

const StypedActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  gap: 12px;
`;
