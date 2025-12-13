export interface DeviceData {
  year: number;
  price: number;
  model: string;
  size: string;
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
