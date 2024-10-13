import { TextField, Button, Card, Typography, Checkbox, FormControlLabel, Drawer, IconButton } from '@mui/material';
import { useState } from 'react';
import { DropDownMenu } from './DropDown';
import { CourseTable } from './TableData';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
// import MenuIcon from '@mui/icons-material/Menu';

export function AddCourse() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [file, setFile] = useState(null);
  const [published, setPublished] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(''); // New state to hold the image URL

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);

    // Create a local URL for the uploaded image
    const fileUrl = URL.createObjectURL(event.target.files[0]);
    setImageUrl(fileUrl);
  };

  const handlePublishedChange = (event) => {
    setPublished(event.target.checked);
  };

  const handleAddCourse = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price ? parseInt(price) : null);
    formData.append('published', published);
    if (file) {
      formData.append('image', file);
    }

    await fetch('http://localhost:3000/admin/courses', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    setRefresh(prev => !prev); // Toggle refresh state to trigger update
    setTitle(''); // Clear input fields
    setDescription('');
    setPrice('');
    setPublished(false);
    setFile(null); // Clear the file input
    setImageUrl(''); // Clear the image URL
    setSidebarOpen(false); // Close sidebar after submitting
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ height: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "2rem", marginLeft: "1.5rem" }}>
        <IconButton
          onClick={toggleSidebar}
          color="primary"
          aria-label="open sidebar"
        >
          <AddBoxOutlinedIcon fontSize='large' />
        </IconButton>
      </div>
      <Typography textAlign={"center"} variant='h4' style={{ marginBottom: "10px" }}>Courses Management</Typography>

      {/* Sidebar for Adding Course */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        <div style={{ width: "300px", padding: "20px", marginTop: "2.5rem" }}>
          <Typography textAlign="center" variant='h4'>Add Course</Typography>
          <Card style={{ padding: "20px", marginTop: "20px", border: "1px solid black", borderRadius: "10px" }} variant="outlined">
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              label="Title"
              variant="outlined"
              margin="normal"
            />
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              label="Description"
              variant="outlined"
              margin="normal"
            />
            <DropDownMenu
              onChange={(value) => setPrice(value)}
            />
            <br /><br />
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              style={{ display: 'none' }} // Hidden file input
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                sx={{
                  bgcolor: '#333',
                  color: 'white',
                }}
              >
                Upload Image
              </Button>
            </label>
            <br /><br />

            {/* Display the uploaded image */}
            {imageUrl && (
              <div>
                <img src={imageUrl} alt="Uploaded Preview" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
              </div>
            )}

            <FormControlLabel
              control={<Checkbox checked={published} onChange={handlePublishedChange} />}
              label="Published"
            />
            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
              <Button
                size="large"
                variant="contained"
                onClick={handleAddCourse}
                sx={{
                  bgcolor: 'primary.dark',
                  color: 'white',
                }}
              >
                Add Course
              </Button>
            </div>
          </Card>
        </div>
      </Drawer>

      <br />
      <div style={{ width: "100vw" }}>
        <CourseTable refresh={refresh} />
      </div>
    </div>
  );
}
