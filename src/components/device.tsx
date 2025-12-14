import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { DeviceInformation, IDeviceItem } from "../types/device-types";

interface cardProps extends DeviceInformation {
  onDelete?: () => void;
  onUpdate?: () => void;
}
export const DeviceCard = ({ name, data, onUpdate, onDelete }: cardProps) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {`NAME: ${name}`}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {`CPU: ${data.cpu}`}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {`PRICE: ${data.price}`}
          </Typography>
          <Typography variant="body2">
            {`HARD DRIVE: ${data.hard}`}
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
            onClick={onDelete}
          >
            Delete
          </Button>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={onUpdate}
          >
            Update
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
interface listCardProps {
  items: IDeviceItem[];
  onDelete?: (val: IDeviceItem) => void;
  onUpdate?: (val: IDeviceItem) => void;
}
export const ListCard = ({ items, onDelete, onUpdate }: listCardProps) => {
  return (
    <>
      {items.map((device, index) => (
        <DeviceCard
          key={index}
          name={device.name}
          data={device.data}
          onDelete={() => onDelete?.(device)}
          onUpdate={() => onUpdate?.(device)}
        />
      ))}
    </>
  );
};
