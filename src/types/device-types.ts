export interface DeviceData {
  year: number;
  price: number;
  cpu: string;
  hard: string;
}
export interface DeviceInformation {
  name: string;
  data: DeviceData;
}
export const DeviceType = {
  Laptop: "Laptop",
  Tablet: "Tablet",
  Smartphone: "Smartphone",
  Desktop: "Desktop",
};

export interface IDeviceItem extends DeviceInformation {
  id: string;
}
