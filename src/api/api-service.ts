import apiService from "../services/middlewareService";
import type { DeviceInformation, IDeviceItem } from "../types/device-types";

export const getAllDevices = async () => {
  const response = await apiService.get<DeviceInformation>("/object");
  return response.data;
};
export const registerDevice = async (deviceData: DeviceInformation) => {
  const response = await apiService.post<IDeviceItem>("/objects", deviceData);
  return response.data;
};
export const updateDevice = async (
  deviceId: string,
  updateData: DeviceInformation
) => {
  const response = await apiService.put(`/objects/${deviceId}`, updateData);
  return response.data;
};
export const deleteDevice = async (deviceId: string) => {
  const response = await apiService.delete(`/objects/${deviceId}`);
  return response.data;
};
