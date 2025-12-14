import { useErrorBoundary } from "react-error-boundary";
import { Box, Typography, Button, Paper } from "@mui/material";

export const ErrorFallback = ({ error }: { error: Error }) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 4,
        m: 4,
        maxWidth: 400,
        mx: "auto",
        textAlign: "center",
        bgcolor: "background.paper",
      }}
      role="alert"
    >
      <Typography variant="h6" color="error" gutterBottom>
        Something went wrong
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {error.message}
      </Typography>
      <Button variant="contained" color="primary" onClick={resetBoundary}>
        Try again
      </Button>
    </Box>
  );
};
