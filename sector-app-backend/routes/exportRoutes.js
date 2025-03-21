const express = require("express");
const Entry = require("../models/Entry");
const Sector = require("../models/Sector");
const authenticateUser = require("../middlewares/authMiddleware");
const XLSX = require("xlsx");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const router = express.Router();

// 📌 Export as Excel (.xlsx)
router.get("/export/excel/:sectorId", authenticateUser, async (req, res) => {
  try {
    const { sectorId } = req.params;
    const userId = req.userId; // Get user ID from authentication middleware

    // Fetch user-specific entries for the sector
    const entries = await Entry.find({ sectorId, userId });

    if (!entries.length) {
      return res.status(404).json({ message: "No entries found for export." });
    }

    // Convert data into an array format
    const data = entries.map(entry => ({
      "Entry ID": entry._id.toString(),
      "Sector ID": entry.sectorId.toString(),
      "User ID": entry.userId.toString(),
      ...entry.data // Spread entry data dynamically
    }));

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Entries");

    // Write the Excel file to buffer
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    // Send file as response
    res.setHeader("Content-Disposition", 'attachment; filename="entries.xlsx"');
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
  } catch (error) {
    console.error("Error exporting Excel:", error);
    res.status(500).json({ message: "Error exporting Excel", error: error.message });
  }
});

// 📌 Export as PDF (.pdf)
router.get("/export/pdf/:sectorId", authenticateUser, async (req, res) => {
  try {
    const { sectorId } = req.params;
    const userId = req.userId;

    // Fetch user-specific entries for the sector
    const entries = await Entry.find({ sectorId, userId });

    if (!entries.length) {
      return res.status(404).json({ message: "No entries found for export." });
    }

    // Create a PDF document
    const doc = new PDFDocument();
    res.setHeader("Content-Disposition", 'attachment; filename="entries.pdf"');
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    doc.fontSize(16).text("Entries Report", { align: "center" });
    doc.moveDown();

    entries.forEach((entry, index) => {
      doc.fontSize(12).text(`Entry ${index + 1}`, { underline: true });
      doc.text(`Entry ID: ${entry._id}`);
      doc.text(`Sector ID: ${entry.sectorId}`);
      doc.text(`User ID: ${entry.userId}`);
      Object.entries(entry.data).forEach(([key, value]) => {
        doc.text(`${key}: ${value}`);
      });
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error("Error exporting PDF:", error);
    res.status(500).json({ message: "Error exporting PDF", error: error.message });
  }
});

module.exports = router;
