import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { db } from "../db-local/index-db-wrapper";
import { registerDevice, updateDevice, deleteDevice } from "../api/api-service";
import type { IDeviceItem } from "../types/device-types";
import { useLiveQuery } from "dexie-react-hooks";

interface CrudContextType {
  items: IDeviceItem[];
  addItem: (item: Omit<IDeviceItem, "id">) => Promise<void>;
  updateItem: (id: string, item: Omit<IDeviceItem, "id">) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  searchItem: (query: string) => Promise<void>;
}

const CrudContext = createContext<CrudContextType | undefined>(undefined);

export const useCrud = () => {
  const context = useContext(CrudContext);
  if (!context) {
    throw new Error("useCrud must be used within a Crud Provider");
  }
  return context;
};

export const CrudProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<IDeviceItem[]>([]);
  const dbItems = useLiveQuery(() => db.getAllDevices(), []);

  useEffect(() => {
    if (dbItems) {
      setItems(dbItems);
    }
  }, [dbItems]);

  const addItem = async (item: Omit<IDeviceItem, "id">) => {
    try {
      const created = await registerDevice(item);
      await db.setDevice(created);
    } catch (error) {}
  };

  const updateItem = async (id: string, item: Omit<IDeviceItem, "id">) => {
    try {
      const updated = await updateDevice(id, item);
      await db.setDevice(updated);
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, ...updated } : it))
      );
    } catch (error) {}
  };

  const deleteItem = async (id: string) => {
    try {
      await deleteDevice(id);
      await db.deleteDevice(id);
    } catch (error) {}
  };
  const searchItem = async (query: string) => {
    try {
      if (query) {
        const trimmeredQuery = query.trim();
        const result = dbItems?.filter((data) =>
          data.name.toLowerCase().includes(trimmeredQuery.toLowerCase())
        );
        setItems(result ?? []);
      } else {
        setItems(dbItems ?? []);
      }
    } catch (error) {
      console.error("Error searching items:", error);
    }
  };
  return (
    <CrudContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        deleteItem,
        searchItem,
      }}
    >
      {children}
    </CrudContext.Provider>
  );
};
