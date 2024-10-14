import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Button } from "@mui/material";
import axios from "axios";

export function CourseDetails() {
  const { courseId } = useParams();
  const [data, setData] = useState({});

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/admin/courses/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const course = response.data.course;
      setData(course);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  return (
    <div style={{ bottom: 1, height: "100vh" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: "320px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "20px",
          gap: "10px",
        }}
        variant="outlined"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          {data.image && (
            <img
              src={`${data.image}`} // Adjusted to use local assets folder
              alt={data.title}
              style={{ width: "100%", height: "auto", maxHeight: "300px" }}
            />
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5">{data.title}</Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          <Typography variant="body1">{data.description}</Typography>
        </div>
        <div style={{ marginLeft: "1.2rem" }}>
          <Typography variant="h6">₹{data.price}</Typography>
        </div>
        <Button variant="contained">Buy</Button>
      </Card>
    </div>
  );
}
