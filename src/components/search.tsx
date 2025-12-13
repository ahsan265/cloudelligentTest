import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
interface searchProps {
  values: string[];
  searchOutput: () => void;
}

export default function ComboBox({ values, searchOutput }: searchProps) {
  return (
    <Autocomplete
      disablePortal
      options={values}
      sx={{ width: 300 }}
      onClick={searchOutput}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
}
