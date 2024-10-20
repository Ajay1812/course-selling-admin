import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../config";
import { Card, Typography, TextField, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

export function ForgotPassword() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigator = useNavigate('')
  const { id, token } = useParams()

  const adminValid = async () => {
    const res = await fetch(`${BASE_URL}/admin/forgotpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    if (data.status == 201) {
      console.log("Admin valid")
    } else {
      navigator('*')
    }
  }
  useEffect(() => {
    adminValid()
  }, [])

  const sendPassword = async (e) => {
    e.preventDefault()
    const res = await fetch(`${BASE_URL}/admin/${id}/${token}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    })
    const data = await res.json()
    if (data.status == 201) {
      setPassword('')
      setMessage(true) // FIXME: check the after update password message not working
    } else {
      toast.error("! Token expired generate a new Link")
    }

  }
  return (
    <>
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
            Enter your new password
          </Typography>
          <br />
          {message && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ color: "green", fontWeight: "bold" }}>
                Password Successfully Updated.
              </p>
            </div>
          )}
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth={true}
            label="New password"
            placeholder="Enter your new password"
            variant="outlined"
            required
          />
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button size="large" variant="contained" onClick={sendPassword}>
              Change Password
            </Button>
          </div>
        </Card>
        <ToastContainer />
      </div>
    </>
  )
}
