import { Box, Typography } from "@mui/material";
import styles from "./styles";

const IsraaidLogo = () => (
  <Box style={styles.logoContainer}>
    <Typography style={styles.logoText}>Welcome to</Typography>
    <img
      src="/Logo-Israaid.svg.png"
      alt="ISRAAID Logo"
      style={styles.logoImage}
    />
  </Box>
);

export default IsraaidLogo;
