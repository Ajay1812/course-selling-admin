import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, InputAdornment, Pagination, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { useNavigate } from "react-router-dom";

export function CourseTable({ refresh }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State to handle filtered data
  const [open, setOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/admin/courses/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const courses = Array.isArray(response.data.courses) ? response.data.courses : [];
      setData(courses);
      setFilteredData(courses);
    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error.message);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:3000/admin/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData((prevData) => prevData.filter((course) => course._id !== courseId));
      setFilteredData((prevData) => prevData.filter((course) => course._id !== courseId)); // Update filtered data
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleUpdateOpen = (course) => {
    setCurrentCourse(course);
    setOpen(true);
  };

  const handleUpdateClose = () => {
    setOpen(false);
    setCurrentCourse(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCurrentCourse({ ...currentCourse, image: file });
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', currentCourse.title);
      formData.append('description', currentCourse.description);
      formData.append('price', currentCourse.price);
      if (currentCourse.image) {
        formData.append('image', currentCourse.image);
      }

      await axios.put(`http://localhost:3000/admin/courses/${currentCourse._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchInfo(); // Refresh data after update
      handleUpdateClose();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter the data based on the search term
    const filteredCourses = data.filter((course) =>
      course.title.toLowerCase().includes(value) ||
      course.description.toLowerCase().includes(value) ||
      course._id.includes(value)
    );
    setFilteredData(filteredCourses);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchInfo();
  }, [refresh]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{}}>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        {/* Search Bar */}
        <TextField
          label="Search Courses"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: '10px', width: '60%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <br /> <br />
        <div style={{ width: "80vw" }}>
          {loading ? ( // Show loading only while fetching courses initially
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
              <CircularProgress />
            </div>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead style={{ background: "#003366" }}>
                  <TableRow>
                    <TableCell style={{ color: "white" }}>ID</TableCell>
                    <TableCell style={{ color: "white" }}>Name</TableCell>
                    <TableCell style={{ color: "white", width: '170px' }}>Description</TableCell>
                    <TableCell style={{ color: "white" }}>Image</TableCell>
                    <TableCell style={{ color: "white" }}>Published</TableCell>
                    <TableCell style={{ color: "white" }}>Price</TableCell>
                    <TableCell style={{ color: "white", width: '80px' }}>Date</TableCell>
                    <TableCell style={{ color: "white" }}>Edit</TableCell>
                    <TableCell style={{ color: "white" }}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.map((course, index) => (
                    <TableRow key={course._id} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white", cursor: 'pointer' }}>
                      <TableCell style={{ width: '100px' }} onClick={() => navigate(`/getcourse/${course._id}`)}>{course._id}</TableCell>
                      <TableCell onClick={() => navigate(`/getcourse/${course._id}`)}>{course.title}</TableCell>
                      <TableCell onClick={() => navigate(`/getcourse/${course._id}`)}>{course.description}</TableCell>
                      <TableCell>
                        {course.image ? (
                          <img
                            src={`${course.image}`}
                            alt={course.title}
                            style={{ width: '50px', height: '50px' }}
                            onClick={() => navigate(`/getcourse/${course._id}`)}
                          />
                        ) : (
                          <span>No Image Available</span>
                        )}
                      </TableCell>
                      <TableCell>{course.published ? "Yes" : "No"}</TableCell>
                      <TableCell>₹{course.price}</TableCell>
                      <TableCell onClick={() => navigate(`/getcourse/${course._id}`)}>{new Date(course.createdAt).toLocaleDateString('en-CA')}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="success" startIcon={<EditSharpIcon />} onClick={() => handleUpdateOpen(course)}>
                          Update
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(course._id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0 1rem 0' }}>
          <Pagination
            count={Math.ceil(filteredData.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            size="large"
          />
        </div>
        {/* Update Dialog */}
        <Dialog open={open} onClose={handleUpdateClose}>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogContent>
            {currentCourse && (
              <>
                <TextField
                  label="Title"
                  value={currentCourse.title}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, title: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Description"
                  value={currentCourse.description}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Price"
                  value={currentCourse.price}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, price: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateClose} color="primary">Cancel</Button>
            <Button onClick={handleUpdateSubmit} color="primary">Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
