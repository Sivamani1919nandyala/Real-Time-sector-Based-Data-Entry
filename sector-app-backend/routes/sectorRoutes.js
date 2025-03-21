// const express = require("express");
// const Sector = require("../models/Sector");

// const router = express.Router();

// // Get all sectors
// router.get("/", async (req, res) => {
//     try {
//       const sectors = await Sector.find();
//       console.log("Fetched Sectors from DB:", sectors);  // ✅ Debugging log
//       res.json(sectors);
//     } catch (error) {
//       console.error("Error fetching sectors:", error);
//       res.status(500).json({ message: "Error fetching sectors", error });
//     }
//   });
  

// module.exports = router;
const express = require("express");
const Sector = require("../models/Sector");
const Middleware = require("../middlewares/authMiddleware")

const router = express.Router();

// ✅ Get all sectors
router.get("/", Middleware, async (req, res) => {
  try {
    const sectors = await Sector.find();
    console.log("Fetched Sectors from DB:", sectors);
    res.json(sectors);
  } catch (error) {
    console.error("Error fetching sectors:", error);
    res.status(500).json({ message: "Error fetching sectors", error });
  }
});

// ✅ Get sector by ID (fetch specific sector details)
router.get("/:id",Middleware, async (req, res) => {
  try {
    const sector = await Sector.findById(req.params.id);
    if (!sector) {
      return res.status(404).json({ message: "Sector not found" });
    }
    res.json(sector);
  } catch (error) {
    console.error("Error fetching sector:", error);
    res.status(500).json({ message: "Error fetching sector", error });
  }
});

// // ✅ Create a new sector
// router.post("/", async (req, res) => {
//   try {
//     const { name, fields } = req.body;

//     // Check for duplicate sector name
//     const existingSector = await Sector.findOne({ name });
//     if (existingSector) {
//       return res.status(400).json({ message: "Sector with this name already exists" });
//     }

//     // Create new sector
//     const newSector = new Sector({ name, fields });
//     await newSector.save();
//     res.status(201).json(newSector);
//   } catch (error) {
//     console.error("Error creating sector:", error);
//     res.status(500).json({ message: "Error creating sector", error });
//   }
// });

// // ✅ Update sector (e.g., modify fields)
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedSector = await Sector.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedSector) {
//       return res.status(404).json({ message: "Sector not found" });
//     }
//     res.json(updatedSector);
//   } catch (error) {
//     console.error("Error updating sector:", error);
//     res.status(500).json({ message: "Error updating sector", error });
//   }
// });

// // ✅ Delete sector
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedSector = await Sector.findByIdAndDelete(req.params.id);
//     if (!deletedSector) {
//       return res.status(404).json({ message: "Sector not found" });
//     }
//     res.json({ message: "Sector deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting sector:", error);
//     res.status(500).json({ message: "Error deleting sector", error });
//   }
// });

module.exports = router;
