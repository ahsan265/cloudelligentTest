import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ToggleButton } from "@mui/material";
import { useTheme } from "../custome-hooks/theme-context";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
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
            Cloudelligent Assessment
          </Typography>
          <ToggleButton selected={true} value={true} onClick={toggleTheme}>
            {theme === "white" ? "Dark Mode" : "Light Mode"}
          </ToggleButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
