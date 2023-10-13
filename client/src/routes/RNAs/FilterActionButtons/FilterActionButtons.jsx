import { useState } from "react";
import { Button, Box } from "@mui/material";
import { styles } from "./styles";

const FilterActionButtons = () => {
  const [isOngoingButtonActive, setIsOngoingButtonActive] = useState(false);
  const [isAllButtonActive, setAllButtonActive] = useState(false);

  const handleOngoingButtonClick = () => {
    setIsOngoingButtonActive(true);
    setAllButtonActive(false);
  };

  const handleAllButtonClick = () => {
    setAllButtonActive(true);
    setIsOngoingButtonActive(false);
  };

  return (
    <Box sx={styles.container}>
      <Button
        variant="contained"
        sx={styles.button(isOngoingButtonActive)}
        onClick={handleOngoingButtonClick}
      >
        {"Ongoing"}
      </Button>
      <Button
        variant="contained"
        sx={styles.button(isAllButtonActive)}
        onClick={handleAllButtonClick}
      >
        {"All"}
      </Button>
    </Box>
  );
};

export default FilterActionButtons;
