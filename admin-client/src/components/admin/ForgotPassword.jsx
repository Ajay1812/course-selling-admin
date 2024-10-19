import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config.js";
import axios from "axios";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/admin/forgot-password`, {
        username: email
      });
      console.log(response.data);
      navigate('/reset-password'); // Navigate if email is successfully sent
    } catch (error) {
      console.error('Error sending reset email:', error);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          paddingTop: "150px",
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h4"}>Forgot Password</Typography>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          style={{
            width: "400px",
            padding: "20px",
            border: "1px solid black",
            borderRadius: "20px",
            boxShadow: "6.3px 10.6px 10.6px hsl(0deg 0% 0% / 0.34)",
          }}
          variant="outlined"
        >
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br /> <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="large"
              variant="contained"
              onClick={handleForgotPassword}
            >
              Reset
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
