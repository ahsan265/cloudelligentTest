import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
interface SearchBarProps {
  onSearch: (val: string) => void;
}
export const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <Box sx={{ width: "100%", maxWidth: "100%", display: "flex" }}>
      <TextField
        fullWidth
        label="Search items..."
        onChange={(val) => {
          onSearch(val.target.value);
        }}
      />
    </Box>
  );
};
