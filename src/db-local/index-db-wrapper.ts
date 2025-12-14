import type { IDeviceItem } from "../types/device-types";
import Dexie, { type Table } from "dexie";

const themeId = 1;
//schema
const device = "id";
const theme = "id";
class DeviceDb extends Dexie {
  public devices!: Table<IDeviceItem, string>;
  public theme!: Table<{ id: number; value: string }, number>;
  constructor() {
    super("DeviceDatabase");
    this.version(1).stores({
      devices: device,
      theme: theme,
    });
  }

  setDevice(item: IDeviceItem) {
    return this.devices.put(item);
  }
  setDevices(items: IDeviceItem[]) {
    return this.devices.bulkPut(items);
  }
  deleteDevice(id: string) {
    return this.devices.delete(id);
  }
  async getAllDevices() {
    return await this.devices.toArray();
  }
  getDeviceById(id: string) {
    return this.devices.get(id);
  }
  // keep the theme state even when refreshed
  updateTheme(value: string) {
    return this.theme.put({ id: themeId, value });
  }
}

export const db = new DeviceDb();
