import React, { useState, useEffect } from "react";
import { Card, Typography, Button, CircularProgress, Grid } from "@mui/material"; // Import Grid
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function GetCourses() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [error, setError] = useState(null);

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/admin/courses', {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const courses = Array.isArray(response.data.courses) ? response.data.courses : [];
      const coursesWithImages = courses.map((course) => {
        if (course.image && course.image.type === 'Buffer') {
          const base64String = btoa(
            new Uint8Array(course.image.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          return { ...course, image: `data:image/jpeg;base64,${base64String}` };
        } else {
          return course;
        }
      });

      setData(coursesWithImages);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch courses. Please check your permissions or try again later.");
    }
  };

  setTimeout(() => {
    setLoading(false)
  }, 1000)

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div style={{ height: "auto" }}>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "2.5rem", height: 'auto' }}>
        <Typography variant="h3">Courses</Typography>
      </div>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={3} justifyContent="center" style={{ marginTop: "2.5rem", gap: "30px" }}>
          {data.map((course) => (
            <Grid item key={course._id} xs={8} sm={6} md={4} lg={3}>
              <Card
                style={{
                  width: "100%",
                  height: "500px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "20px",
                  boxShadow: "8.0px 16.0px 16.0px hsl(0deg 0% 0% / 0.25)",
                  gap: "10px",
                }}
                variant="outlined"
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src={course.image} alt={course.title} style={{ width: '100%', height: 'auto', maxHeight: "300px" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "left", margin: "0 1rem 0 1rem" }}>
                  <Typography variant="h5">{course.title}</Typography>
                </div>
                <div style={{ display: "flex", textAlign: "justify", color: "#808080", letterSpacing: 1, margin: "0 1rem 0 1rem" }}>
                  <Typography variant="body1">{course.description}</Typography>
                </div>
                <div style={{ marginLeft: "1.4rem" }}>
                  <Typography color="green" variant="h6">₹{course.price}</Typography>
                </div>
                <Button variant="contained" onClick={() => {
                  navigate(`/getcourse/${course._id}`, {
                    replace: true
                  });
                }}>Buy</Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="body1">{error}</Typography>
        </div>
      )}
    </div>
  );
}
