import styled from "styled-components";
import { Header } from "../components/header";
import { AddItemPage, type formValues } from "../feature/Add-item-page";
import { Button } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { AlertDialog } from "../components/modal";
import {
  deleteDevice,
  getAllDevices,
  registerDevice,
  updateDevice,
} from "../api/api-service";
import { db } from "../db-local/index-db-wrapper";
import { ListCard } from "../components/device";
import { useLiveQuery } from "dexie-react-hooks";
import type { IDeviceItem } from "../types/device-types";
import { SearchBar } from "../components/search";
import debounce from "lodash.debounce";
import Fuse from "fuse.js";

const fuseOptions = {
  isCaseSensitive: false,
  shouldSort: true,
  minMatchCharLength: 1,
  keys: ["name"],
};

export const PageLayout = () => {
  const devices = useLiveQuery(() => db.getAllDevices());
  const [openDialog, setOpenDialog] = React.useState(false);
  const [updateItem, setUpdateItem] = React.useState<IDeviceItem | null>(null);
  const [items, setItems] = React.useState<IDeviceItem[] | null>(null);

  useEffect(() => {
    if (devices) {
      setItems(devices);
    }
  }, [devices]);
  useEffect(() => {
    getAllDevices();
  }, []);

  const handleOnAddItemDialog = () => {
    setUpdateItem(null);
    setOpenDialog(true);
  };

  const handleOnItemDelete = (val: IDeviceItem) => {
    db.deleteDevice(val.id)
      .then(() => {
        deleteDevice(val.id);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
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
  const fuse = new Fuse(devices ?? [], fuseOptions);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery) {
      const result = fuse
        .search(searchQuery)
        .map((res: any) => res.item as IDeviceItem);
      setItems(result);
    } else if (devices) {
      setItems(devices);
    }
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
            items={items ?? []}
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

const StypedActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  gap: 12px;
`;
