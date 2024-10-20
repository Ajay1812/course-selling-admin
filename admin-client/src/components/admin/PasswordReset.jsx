import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../config";

export function PasswordReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const sendLink = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center",
      });
    } else {
      const res = await fetch(`${BASE_URL}/admin/sendpasswordlink`, { //http://localhost:3000/
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.status == 201) {
        setEmail("");
        setMessage(true);
      } else {
        toast.error("Invalid User", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
        <Typography textAlign={"center"} variant={"h4"}>
          Enter your Email
        </Typography>
        <br />
        {message && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p style={{ color: "green", fontWeight: "bold" }}>
              Password reset link sent successfully to your email.
            </p>
          </div>
        )}
        <TextField
          value={email}
          onChange={handleChange}
          fullWidth={true}
          label="Email"
          variant="outlined"
          required
        />
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button size="large" variant="contained" onClick={sendLink}>
            Reset
          </Button>
        </div>
      </Card>
      <ToastContainer />
    </div>
  );
}
