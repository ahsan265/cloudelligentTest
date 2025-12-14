import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { IDeviceItem } from "../types/device-types";
import { useCrud } from "../context/crud-context";

interface cardProps {
  data: IDeviceItem;
  onDelete?: (val: IDeviceItem) => void;
  onUpdate?: (val: IDeviceItem) => void;
}
export const DeviceCard = React.memo(
  ({ data, onUpdate, onDelete }: cardProps) => {
    const handleDelete = useCallback(
      (device: IDeviceItem) => {
        onDelete?.(device);
      },
      [onDelete]
    );

    const handleUpdate = useCallback(
      (device: IDeviceItem) => {
        onUpdate?.(device);
      },
      [onUpdate]
    );
    return (
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              {`NAME: ${data.name}`}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              {`CPU: ${data.data.cpu}`}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              {`PRICE: ${data.data.price}`}
            </Typography>
            <Typography variant="body2">
              {`HARD DRIVE: ${data.data.hard}`}
              <br />
            </Typography>
          </CardContent>
          <CardActions
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={() => handleDelete(data)}
            >
              Delete
            </Button>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={() => handleUpdate(data)}
            >
              Update
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.data.name === nextProps.data.name &&
      prevProps.data.data.cpu === nextProps.data.data.cpu &&
      prevProps.data.data.price === nextProps.data.data.price &&
      prevProps.data.data.hard === nextProps.data.data.hard &&
      prevProps.onUpdate === nextProps.onUpdate &&
      prevProps.onDelete === nextProps.onDelete
    );
  }
);
interface listCardProps {
  onDelete?: (val: IDeviceItem) => void;
  onUpdate?: (val: IDeviceItem) => void;
}

export const ListCardComponent = ({ onDelete, onUpdate }: listCardProps) => {
  const { items } = useCrud();

  const handleDelete = useCallback(
    (device: IDeviceItem) => {
      onDelete?.(device);
    },
    [onDelete]
  );

  const handleUpdate = useCallback(
    (device: IDeviceItem) => {
      onUpdate?.(device);
    },
    [onUpdate]
  );
  return (
    <>
      {items.map((device) => {
        return (
          <DeviceCard
            key={device.id}
            data={device}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        );
      })}
    </>
  );
};
export const ListCard = React.memo(ListCardComponent);
