// import { useState, useEffect } from "react";
// import { fetchSectors, submitEntry, fetchEntriesBySector } from "../utils/api";
// import {
//   Container,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";


// const SectorForm = () => {
//   const [sectors, setSectors] = useState([]);
//   const [selectedSector, setSelectedSector] = useState(null);
//   const [selectedAction, setSelectedAction] = useState("");
//   const [formData, setFormData] = useState({});
//   const [errors, setErrors] = useState({});
//   const [sectorEntries, setSectorEntries] = useState([]);

//   // Fetch sectors on component mount
//   useEffect(() => {
//     const getSectors = async () => {
//       try {
//         const data = await fetchSectors();
//         console.log("Fetched Sectors:", data);
//         setSectors(data);
//       } catch (error) {
//         console.error("Error fetching sectors:", error);
//       }
//     };
//     getSectors();
//   }, []);

//   // Handle sector selection
//   const handleSectorChange = (event) => {
//     const sector = sectors.find((s) => s._id === event.target.value);
//     setSelectedSector(sector);
//     setSelectedAction("");
//     setFormData({});
//     setErrors({});
//     setSectorEntries([]);
//   };

//   // Handle action selection
//   const handleActionChange = (event) => {
//     setSelectedAction(event.target.value);
//     if (event.target.value === "view") {
//       fetchSectorEntries();
//     }
//   };

//   // Handle input change
//   const handleInputChange = (e, field) => {
//     setFormData({ ...formData, [field.label]: e.target.value });
//     if (!e.target.value.trim()) {
//       setErrors({ ...errors, [field.label]: "This field is required" });
//     } else {
//       const newErrors = { ...errors };
//       delete newErrors[field.label];
//       setErrors(newErrors);
//     }
//   };

//   // Fetch entries for the selected sector
//   const fetchSectorEntries = async () => {
//     if (!selectedSector) return;
//     try {
//       const response = await fetchEntriesBySector(selectedSector._id);
//       console.log("Fetched Entries Data:", response);
  
//       // Extract `entries` correctly
//       let entries = response.entries || []; 
  
//       if (!Array.isArray(entries)) {
//         console.error("Unexpected API response format:", response);
//         entries = [];
//       }
  
//       setSectorEntries(entries);
//     } catch (error) {
//       console.error("Error fetching entries:", error);
//     }
//   };
  

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let newErrors = {};
//     selectedSector.fields.forEach((field) => {
//       if (!formData[field.label]?.trim()) {
//         newErrors[field.label] = "This field is required";
//       }
//     });

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       await submitEntry({ sectorId: selectedSector._id, data: formData });
//       alert("Entry Submitted Successfully!");
//       setFormData({});
//       setErrors({});
//     } catch (error) {
//       alert("Error submitting entry. Please try again.");
//     }
//   };

//   return (
//     <Container maxWidth="sm" style={{ marginTop: "20px" }}>
//       <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
//         Select a Sector
//       </Typography>
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Choose Sector</InputLabel>
//         <Select value={selectedSector?._id || ""} onChange={handleSectorChange}>
//           <MenuItem value="">-- Choose Sector --</MenuItem>
//           {sectors.map((sector) => (
//             <MenuItem key={sector._id} value={sector._id}>
//               {sector.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {selectedSector && (
//         <>
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Select Action</InputLabel>
//             <Select value={selectedAction} onChange={handleActionChange}>
//               <MenuItem value="">-- Choose Action --</MenuItem>
//               <MenuItem value="submit">Submit New Entry</MenuItem>
//               <MenuItem value="view">View Sector Data</MenuItem>
//             </Select>
//           </FormControl>

//           {/* Form to Submit New Entry */}
//           {selectedAction === "submit" && (
//             <form onSubmit={handleSubmit}>
//               {selectedSector.fields.map((field) => (
//                 <TextField
//                   key={field.label}
//                   label={field.label}
//                   type={field.fieldType || "text"}
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   onChange={(e) => handleInputChange(e, field)}
//                   error={!!errors[field.label]}
//                   helperText={errors[field.label] || ""}
//                 />
//               ))}
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 style={{ marginTop: "15px" }}
//                 disabled={Object.keys(errors).length > 0}
//               >
//                 Submit
//               </Button>
//             </form>
//           )}

//           {/* Display Sector Entries in Table */}
//           {selectedAction === "view" && (
//             <>
//               <Typography variant="h6" color="white" gutterBottom>
//                 Sector Entries
//               </Typography>
//               {sectorEntries.length > 0 ? (
//                 <TableContainer component={Paper}>
//                   <Table>
//                     <TableHead>
//                       <TableRow>
                        
//                         {sectorEntries[0]?.data &&
//                           Object.keys(sectorEntries[0].data).map((key) => (
//                             <TableCell key={key}>
//                               <strong>{key}</strong>
//                             </TableCell>
//                           ))}
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {sectorEntries.map((entry, index) => (
//                         <TableRow key={index}>
                          
//                           {entry.data &&
//                             Object.entries(entry.data).map(([key, value]) => (
//                               <TableCell key={key}>{value}</TableCell>
//                             ))}
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               ) : (
//                 <Typography color="gray">No entries found for this sector.</Typography>
//               )}
//             </>
//           )}
//         </>
//       )}
//     </Container>
//   );
// };

// export default SectorForm;

import { useState, useEffect } from "react";
import { fetchSectors, submitEntry, fetchEntriesBySector } from "../utils/api";
import ExportButton from "./ExportButton"; // Import Export Button
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

const SectorForm = () => {
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [sectorEntries, setSectorEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch sectors on component mount
  useEffect(() => {
    const getSectors = async () => {
      try {
        setLoading(true);
        const data = await fetchSectors();
        console.log("Fetched Sectors:", data);
        setSectors(data);
      } catch (error) {
        console.error("Error fetching sectors:", error);
      } finally {
        setLoading(false);
      }
    };
    getSectors();
  }, []);

  // Handle sector selection
  const handleSectorChange = (event) => {
    const sector = sectors.find((s) => s._id === event.target.value);
    setSelectedSector(sector);
    setSelectedAction("");
    setFormData({});
    setErrors({});
    setSectorEntries([]);
  };

  // Handle action selection
  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
    if (event.target.value === "view") {
      fetchSectorEntries();
    }
  };

  // Handle input change
  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field.label]: e.target.value });
    if (!e.target.value.trim()) {
      setErrors({ ...errors, [field.label]: "This field is required" });
    } else {
      const newErrors = { ...errors };
      delete newErrors[field.label];
      setErrors(newErrors);
    }
  };

  // Fetch entries for the selected sector
  const fetchSectorEntries = async () => {
    if (!selectedSector) return;
    try {
      setLoading(true);
      const response = await fetchEntriesBySector(selectedSector._id);
      console.log("Fetched Entries Data:", response);

      // Extract `entries` correctly
      let entries = response.entries || [];

      if (!Array.isArray(entries)) {
        console.error("Unexpected API response format:", response);
        entries = [];
      }

      setSectorEntries(entries);
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    selectedSector.fields.forEach((field) => {
      if (!formData[field.label]?.trim()) {
        newErrors[field.label] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await submitEntry({ sectorId: selectedSector._id, data: formData });
      alert("Entry Submitted Successfully!");
      setFormData({});
      setErrors({});
      fetchSectorEntries(); // Refresh data after submission
    } catch (error) {
      alert("Error submitting entry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h5" fontWeight="bold" color="black" gutterBottom>
        Select a Sector
      </Typography>

      {loading && <CircularProgress color="inherit" style={{ marginBottom: "20px" }} />}

      <FormControl fullWidth margin="normal">
        <InputLabel>Choose Sector</InputLabel>
        <Select value={selectedSector?._id || ""} onChange={handleSectorChange}>
          <MenuItem value="">-- Choose Sector --</MenuItem>
          {sectors.map((sector) => (
            <MenuItem key={sector._id} value={sector._id}>
              {sector.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedSector && (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Action</InputLabel>
            <Select value={selectedAction} onChange={handleActionChange}>
              <MenuItem value="">-- Choose Action --</MenuItem>
              <MenuItem value="submit">Submit New Entry</MenuItem>
              <MenuItem value="view">View Sector Data</MenuItem>
            </Select>
          </FormControl>

          {/* Form to Submit New Entry */}
          {selectedAction === "submit" && (
            <form onSubmit={handleSubmit}>
              {selectedSector.fields.map((field) => (
                <TextField
                  key={field.label}
                  label={field.label}
                  type={field.fieldType || "text"}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onChange={(e) => handleInputChange(e, field)}
                  error={!!errors[field.label]}
                  helperText={errors[field.label] || ""}
                />
              ))}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "15px" }}
                disabled={loading || Object.keys(errors).length > 0}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
              </Button>
            </form>
          )}

          {/* Display Sector Entries in Table */}
          {selectedAction === "view" && (
            <>
              <Typography variant="h6" color="black" gutterBottom>
                Sector Entries
              </Typography>

              {/* Export Buttons */}
              <div style={{ marginBottom: "15px" }}>
                <ExportButton sectorId={selectedSector?._id} type="excel" />
                <ExportButton sectorId={selectedSector?._id} type="pdf" style={{ marginLeft: "10px" }} />
              </div>

              {loading ? (
                <CircularProgress color="inherit" />
              ) : sectorEntries.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {sectorEntries[0]?.data &&
                          Object.keys(sectorEntries[0].data).map((key) => (
                            <TableCell key={key}>
                              <strong>{key}</strong>
                            </TableCell>
                          ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sectorEntries.map((entry, index) => (
                        <TableRow key={index}>
                          {entry.data &&
                            Object.entries(entry.data).map(([key, value]) => (
                              <TableCell key={key}>{value}</TableCell>
                            ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography color="gray">No entries found for this sector.</Typography>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default SectorForm;
