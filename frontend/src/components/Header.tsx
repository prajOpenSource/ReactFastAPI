import {
  AppBar,
  Toolbar,
  Typography
} from "@mui/material";

function Header() {
  return (
    <AppBar
      position="static"
      elevation={1}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600
          }}
        >
          React FastAPI Application
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;