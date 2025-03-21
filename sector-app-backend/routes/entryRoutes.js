// const express = require("express");
// const Entry = require("../models/Entry");
// const Sector = require("../models/Sector");
// const authenticateUser = require("../middlewares/authMiddleware"); // Import authentication middleware

// const router = express.Router();

// // Submit an entry
// router.post("/", authenticateUser, async (req, res) => {
//   try {
//     const { sectorId, data } = req.body;
//     const userId = req.user.id; // Get user ID from middleware

//     // Check if sector exists
//     const sector = await Sector.findById(sectorId);
//     if (!sector) {
//       return res.status(404).json({ message: "Sector not found" });
//     }

//     // Validate required fields
//     for (const field of sector.fields) {
//       if (field.required && !data[field.label]) {
//         return res.status(400).json({ message: `Missing required field: ${field.label}` });
//       }
//     }

//     // Save entry with userId
//     const newEntry = new Entry({ sectorId, userId, data });
//     await newEntry.save();
//     res.status(201).json(newEntry);
//   } catch (error) {
//     res.status(500).json({ message: "Error saving entry", error });
//   }
// });

// // Get entries for a specific sector (ONLY for the logged-in user)
// router.get("/:sectorId", authenticateUser, async (req, res) => {
//   try {
//     const sectorId = req.params.sectorId;
//     const userId = req.user.id; // Get user ID from authentication middleware

//     // Fetch only the entries that belong to this user and sector
//     const entries = await Entry.find({ sectorId, userId });
//     res.json(entries);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching entries" });
//   }
// });

// module.exports = router;
const express = require("express");
const Entry = require("../models/Entry");
const Sector = require("../models/Sector");
const authenticateUser = require("../middlewares/authMiddleware"); // Import authentication middleware
const { io } = require("../index");
const router = express.Router();

// Submit an entry
// router.post("/", authenticateUser, async (req, res) => {
//   try {
//     console.log("User Object from Middleware:", req.userId); // ✅ Debugging

//     const { sectorId, data } = req.body;
//     const userId = req.userId; // Get user ID from middleware

//     if (!userId) {
//       return res.status(401).json({ message: "User ID missing, authentication failed." });
//     }

//     // Check if sector exists
//     const sector = await Sector.findById(sectorId);
//     if (!sector) {
//       return res.status(404).json({ message: "Sector not found" });
//     }

//     // Validate required fields
//     for (const field of sector.fields) {
//       if (field.required && !data[field.label]) {
//         return res.status(400).json({ message: `Missing required field: ${field.label}` });
//       }
//     }

//     // Save entry with userId
//     const newEntry = new Entry({ sectorId, userId, data });
//     await newEntry.save();

//     res.status(201).json({ success: true, entry: newEntry });
//   } catch (error) {
//     console.error("Error saving entry:", error);
//     res.status(500).json({ success: false, message: "Error saving entry", error: error.message });
//   }
// });

router.post("/", authenticateUser, async (req, res) => {
  try {
    console.log("🔹 User Object from Middleware:", req.userId); // ✅ Debugging log

    const { sectorId, data } = req.body;
    const userId = req.userId; // Get user ID from middleware

    if (!userId) {
      return res.status(401).json({ message: "User ID missing, authentication failed." });
    }

    console.log("🔹 Saving Entry for:", { sectorId, userId, data }); // ✅ Debugging log

    const newEntry = new Entry({ sectorId, userId, data });
    await newEntry.save();

    console.log("✅ Entry Saved:", newEntry); // ✅ Debugging log
    res.status(201).json({ success: true, entry: newEntry });
  } catch (error) {
    console.error("❌ Error saving entry:", error);
    res.status(500).json({ success: false, message: "Error saving entry", error: error.message });
  }
});


// Get entries for a specific sector (ONLY for the logged-in user)


router.get("/:sectorId", authenticateUser, async (req, res) => {
  try {
    console.log("🔹 User ID from Middleware:", req.userId); // ✅ Debugging log
    console.log("🔹 Sector ID:", req.params.sectorId); // ✅ Debugging log

    const sectorId = req.params.sectorId;
    const userId = req.userId; // Ensure user ID exists

    if (!userId) {
      return res.status(401).json({ message: "User ID missing, authentication failed." });
    }

    // Fetch only the entries that belong to this user and sector
    const entries = await Entry.find({ sectorId, userId });

    console.log("🔹 Entries Found:", entries); // ✅ Debugging log
    res.json({ success: true, entries });
  } catch (error) {
    console.error("❌ Error fetching entries:", error);
    res.status(500).json({ success: false, message: "Error fetching entries", error: error.message });
  }
});


module.exports = router;
