import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ToggleButton } from "@mui/material";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          padding: 1,
          justifyContent: "space-between",
          alignContent: "space-between",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <ToggleButton selected={false} value={true}></ToggleButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
