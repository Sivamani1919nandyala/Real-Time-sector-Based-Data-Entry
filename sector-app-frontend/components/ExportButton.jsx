import { exportEntries } from "../utils/api";
import { saveAs } from "file-saver";
import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";

const ExportButton = ({ sectorId, type }) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (!sectorId) return alert("Please select a sector first.");
    
    setLoading(true);
    try {
      const fileData = await exportEntries(sectorId, type);
      saveAs(fileData, `entries.${type === "excel" ? "xlsx" : "pdf"}`);
    } catch (error) {
      alert(`Failed to export ${type.toUpperCase()}`);
    }
    setLoading(false);
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleExport} disabled={loading}>
      {loading ? <CircularProgress size={24} /> : `Export as ${type.toUpperCase()}`}
    </Button>
  );
};

export default ExportButton;
