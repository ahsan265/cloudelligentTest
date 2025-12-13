import type { DeviceInformation } from "../types/device-types";
import apiService from "./apiServiceInstance";

export const getAllDevices = async () => {
  const response = await apiService.get<DeviceInformation>("/object");
  return response.data;
};
export const registerDevice = async (deviceData: DeviceInformation) => {
  const response = await apiService.post<DeviceInformation>(
    "/object",
    deviceData
  );
  return response.data;
};
export const updateDevice = async (
  deviceId: string,
  updateData: DeviceInformation
) => {
  const response = await apiService.put(`/object/${deviceId}`, updateData);
  return response.data;
};
export const deleteDevice = async (deviceId: string) => {
  const response = await apiService.delete(`/object/${deviceId}`);
  return response.data;
};
