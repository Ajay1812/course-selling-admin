import { Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', padding: '3rem' }}
    >
      <Grid item xs={12} md={6}>
        <img
          style={{
            width: "100%", height: "auto", borderRadius: "20px", maxWidth: "600px", marginLeft: "2rem", boxShadow: "5px 5px 15px #431232"
          }}
          src="../assets/landing page.avif"
          alt="Landing page illustration"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h2" align="center">
          Coursera Admin
        </Typography>
        <Typography variant="h6" style={{ marginTop: '1rem' }} align="center">
          Welcome to Coursera Admin. Manage courses efficiently!
        </Typography>
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", margin: "2rem" }}>
          <Button variant="contained" onClick={() => navigate('/signup')}>SignUp</Button>
          <Button variant="contained" onClick={() => navigate('/signin')}>SignIn</Button>
        </div>
      </Grid>

      {/* Image Section on the Right */}

    </Grid>
  );
}
