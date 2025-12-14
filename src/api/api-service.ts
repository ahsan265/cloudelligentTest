import { db } from "../db-local/index-db-wrapper";
import apiService from "../services/middlewareService";
import type { DeviceInformation, IDeviceItem } from "../types/device-types";

export const getAllDevices = async () => {
  const data = await db.getAllDevices();
  if (data.length === 0) return [];
  const query = data.map((val) => `id=${val.id}`).join("&");
  const response = await apiService.get<DeviceInformation>(`/objects?${query}`);
  return response.data;
};
export const registerDevice = async (deviceData: DeviceInformation) => {
  const response = await apiService.post<IDeviceItem>("/objects", deviceData);
  await db.setDevices([response.data]);
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
