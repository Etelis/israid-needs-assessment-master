import { useState } from "react";
import { Button, Box } from "@mui/material";
import { styles } from "./styles";
import RNAFilterOptions from '../../../../enums/RNAFilterOptions';

const FilterActionButtons = ({ setActiveFilter }) => {
  const [activeButton, setActiveButton] = useState(RNAFilterOptions.ALL);

  const handleButtonClick = (filterOption) => {
    setActiveButton(filterOption);
    setActiveFilter(filterOption);
  };

  return (
    <Box sx={styles.container}>
      <Button
        variant="contained"
        sx={styles.button(activeButton === RNAFilterOptions.ONGOING)}
        onClick={() => handleButtonClick(RNAFilterOptions.ONGOING)}
      >
        {"Ongoing"}
      </Button>
      <Button
        variant="contained"
        sx={styles.button(activeButton === RNAFilterOptions.ALL)}
        onClick={() => handleButtonClick(RNAFilterOptions.ALL)}
      >
        {"All"}
      </Button>
    </Box>
  );
};

export default FilterActionButtons;