import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { DrawerMenu } from "./DrawerMenu";
import { Link, Outlet } from "react-router-dom";
import CameraIcon from "@mui/icons-material/Camera";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

const Navigation = () => {
  return (
    <Box sx={{ flexGrow: 1, flexWrap: "wrap", minWidth: "sm" }}>
      <AppBar position="fixed">
        <Toolbar>
          <CameraIcon fontSize="large" sx={{ mr: 2 }} />
          <Typography
            color="inherit"
            variant="h5"
            sx={{ mr: "auto", letterSpacing: 5 }}
          >
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              <Typography variant="h5" sx={{ letterSpacing: 5 }}>
                PhotoGallery
              </Typography>
            </Link>
          </Typography>
          <LoggedIn>
            <DrawerMenu />
          </LoggedIn>
          <LoggedOut>
            <Typography>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/login"
              >
                Login
              </Link>
            </Typography>
          </LoggedOut>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default Navigation;
