import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { DeviceInformation } from "../types/device-types";

interface cardProps extends DeviceInformation {
  onClick: () => void;
}
export const DeviceCard = ({ name, data, onClick }: cardProps) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" onClick={onClick}>
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {name}
          </Typography>
          <Typography variant="h5" component="div">
            {data.cpu}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {data.price}
          </Typography>
          <Typography variant="body2">
            {data.hard}
            <br />
          </Typography>
          <Typography variant="body2">{data.year}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="warning" variant="text">
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export const ListCard = (data: cardProps[]) => {
  data.map((device, index) => {
    return (
      <DeviceCard
        key={index}
        name={device.name}
        data={device.data}
        onClick={device.onClick}
      />
    );
  });
};
