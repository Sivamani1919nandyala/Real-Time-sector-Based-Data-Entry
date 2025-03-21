// const mongoose = require("mongoose");

// const EntrySchema = new mongoose.Schema({
//   sectorId: { type: mongoose.Schema.Types.ObjectId, ref: "Sector", required: true },
//   data: { type: Object, required: true }, // Dynamic data storage
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Entry", EntrySchema);
const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
  sectorId: { type: mongoose.Schema.Types.ObjectId, ref: "Sector", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  
  data: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Index for faster retrieval of sector-wise entries
EntrySchema.index({ sectorId: 1 });

module.exports = mongoose.model("Entry", EntrySchema);
