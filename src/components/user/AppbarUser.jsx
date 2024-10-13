import { Typography, Button, AppBar, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function AppbarUser() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          Coursera
        </Typography>
        <div style={{ display: "flex" }}>
          <Button
            variant="outlined"
            color="inherit"
            style={{ marginRight: 10 }}
            onClick={() => navigate('/users/signup', { replace: true })}
          >
            Signup
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate('/users/login', { replace: true })}
          >
            Signin
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
