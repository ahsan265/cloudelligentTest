import type { IDeviceItem } from "../types/device-types";
import Dexie, { type Table } from "dexie";

//schema
const device = "id";

class DeviceDb extends Dexie {
  public devices!: Table<IDeviceItem, string>;

  constructor() {
    super("parkingLot");
    this.version(1).stores({
      devices: device,
    });
  }
  setDevice(item: IDeviceItem) {
    return this.devices.put(item);
  }
  deleteDevice(id: string) {
    return this.devices.delete(id);
  }
  getAllDevices() {
    return this.devices.toArray();
  }
  getDeviceById(id: string) {
    return this.devices.get(id);
  }
}

export const db = new DeviceDb();
