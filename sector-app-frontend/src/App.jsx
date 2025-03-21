import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login/index";
import Register from "../pages/Register/index";
import ProtectedPage from "../components/ProtectedPage";
import { Box, Container, Typography } from "@mui/material";

function App() {
  return (
    <Router>
      <Box
        sx={{
          width: "100vw", // Full width
          height: "120vh", // Full height
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start", // Align text at the top
          backgroundColor: "lightgray",
          paddingTop: "30px", // Small padding from top
        }}
      >
        <Container sx={{ textAlign: "center", padding: "20px" }}>
          <Typography variant="h3" fontWeight="bold" color="black">
            Real-Time Sector-Based Data Entry
          </Typography>
          
          <Routes>
          <Route path="/" element={<ProtectedPage><Home /></ProtectedPage>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;