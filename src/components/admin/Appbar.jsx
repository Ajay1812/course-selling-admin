import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Appbar() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  const fetchUserEmail = () => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/admin/me', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setEmail(data.username);
          }
        });
    } else {
      setEmail(null);
    }
  };

  useEffect(() => {
    fetchUserEmail();
  }, []);

  const handleLogout = () => {
    alert('Logged Out');
    localStorage.setItem('token', null);
    setEmail(null); // Clear email state
    navigate('/', { replace: true });
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar style={{ display: "flex", justifyContent: "space-between", boxShadow: "8.0px 16.0px 16.0px hsl(0deg 0% 0% / 0.25)" }}>
        <Typography style={{ cursor: "pointer" }} variant="h6" component="div" onClick={() => {
          navigate('/')
        }}>
          Coursera
        </Typography>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {email ? (
            <>
              <div style={{ marginRight: 10, fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', letterSpacing: 1.5 }}><u><b>{email.toUpperCase()}</b></u></div>
              <Button
                style={{ margin: "0 10px 0 10px" }}
                variant="text"
                color="inherit"
                onClick={() => {
                  navigate('/getcourse')
                }}
              >
                Courses
              </Button>
              <Button
                style={{ margin: "0 10px 0 10px" }}
                variant="text"
                color="inherit"
                onClick={() => {
                  navigate('/addcourse')
                }}
              >
                Add Course
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                color="inherit"
                style={{ marginRight: 10 }}
                onClick={() => navigate('/signup', { replace: true })}
              >
                Signup
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate('/signin', { replace: true })}
              >
                Signin
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar >
  );
}
