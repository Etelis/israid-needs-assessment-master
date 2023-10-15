import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchFilter = ({ placeholder, onChange }) => {
  return (
    <TextField 
      variant="outlined"
      placeholder={placeholder}
      fullWidth
      size="small"
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="disabled" />
          </InputAdornment>
        ),
        style: { borderRadius: '50px' }
      }}
    />
  );
};

export default SearchFilter;