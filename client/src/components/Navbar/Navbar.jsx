import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Container, IconButton, Stack, Toolbar } from "@mui/material";
import { useState } from "react";
import BreadcrumbsComponent from "../Breadcrumb";
import { NavigationDrawer } from "./NavigationDrawer";
import styles from "./styles";
import { useNavbarButtonsContext } from "./useNavbarButtonsContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navbarButtons } = useNavbarButtonsContext();

  return (
    <>
      <AppBar>
        <Container maxWidth="xl" sx={styles.appbarContainerStyle}>
          <Toolbar sx={styles.toolbar} disableGutters>
            <img width={110} src="/Logo-Israaid.svg.png" />
            <Stack direction="row" spacing={1}>
              {navbarButtons}
              <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <MenuIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <NavigationDrawer isOpen={isMenuOpen} setOpen={setIsMenuOpen} />
      <BreadcrumbsComponent />
    </>
  );
};
