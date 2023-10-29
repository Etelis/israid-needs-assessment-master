import { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Typography,
} from "@mui/material";
import FormatLineSpacingIcon from "@mui/icons-material/FormatLineSpacing";
import { SortingOptionsEnum } from "./SortingOptionsEnum";
import styles from "./styles";

const Sort = ({ currentSort, onSortChange, sx }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    onSortChange(event.target.value);
    handleClose();
  };

  return (
    <Box sx={{ ...styles.button, ...sx }}>
      <IconButton onClick={handleClick}>
        <FormatLineSpacingIcon sx={styles.icon} />
      </IconButton>
      <Typography sx={styles.typography}></Typography>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Typography sx={styles.typography}>Sort:</Typography>
        <RadioGroup value={currentSort} onChange={handleChange}>
          {Object.entries(SortingOptionsEnum).map(([key, value]) => (
            <MenuItem key={key}>
              <FormControlLabel
                value={value}
                control={<Radio sx={{ fontSize: "2rem" }} />}
                label={value}
              />
            </MenuItem>
          ))}
        </RadioGroup>
      </Menu>
    </Box>
  );
};
export default Sort;
