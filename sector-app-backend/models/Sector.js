// const mongoose = require("mongoose");

// const SectorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   fields: [
//     {
//       label: { type: String, required: true },
//       fieldType: { type: String, required: true } // Change 'type' to 'fieldType'
//     }
//   ]
// });

// module.exports = mongoose.model("Sector", SectorSchema);
const mongoose = require("mongoose");

const SectorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Unique name for sectors
  fields: [
    {
      label: { type: String, required: true },
      fieldType: { type: String, required: true },
      required: { type: Boolean, default: false }, // New: Specifies if field is mandatory
    }
  ]
});

// Index for better lookup performance
SectorSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("Sector", SectorSchema);
