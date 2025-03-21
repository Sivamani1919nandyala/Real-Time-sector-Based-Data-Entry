// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const Sector = require("../models/Sector");

// dotenv.config(); // Load environment variables

// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log(" MongoDB Connected for Seeding"))
//   .catch((err) => console.error(" MongoDB Connection Error:", err));

// const sectors = [
//   {
//     name: "IT",
//     fields: [
//       { label: "Technology Stack", fieldType: "text" },
//       { label: "Years of Experience", fieldType: "number" },
//     ],
//   },
//   {
//     name: "Healthcare",
//     fields: [
//       { label: "Specialization", fieldType: "text" },
//       { label: "Years Practicing", fieldType: "number" },
//     ],
//   },
//   {
//     name: "Education",
//     fields: [
//       { label: "Degree", fieldType: "text" },
//       { label: "Years Teaching", fieldType: "number" },
//     ],
//   },
//   {
//     name: "Finance",
//     fields: [
//       { label: "Certification", fieldType: "text" },
//       { label: "Experience in Financial Sector", fieldType: "number" },
//     ],
//   },
// ];

// const seedDatabase = async () => {
//   try {
//     await Sector.deleteMany(); // Clear existing sectors
//     await Sector.insertMany(sectors);
//     console.log("Sectors Seeded Successfully");
//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Error Seeding Data:", error);
//     mongoose.connection.close();
//   }
// };

// seedDatabase();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Sector = require("../models/Sector");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected for Seeding"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const sectors = [
  {
    name: "IT",
    fields: [
      { label: "Technology Stack", fieldType: "text", required: true },
      { label: "Years of Experience", fieldType: "number", required: false },
    ],
  },
  {
    name: "Healthcare",
    fields: [
      { label: "Specialization", fieldType: "text", required: true },
      { label: "Years Practicing", fieldType: "number", required: false },
    ],
  },
  {
    name: "Education",
    fields: [
      { label: "Degree", fieldType: "text", required: true },
      { label: "Years Teaching", fieldType: "number", required: false },
    ],
  },
  {
    name: "Finance",
    fields: [
      { label: "Certification", fieldType: "text", required: true },
      { label: "Experience in Financial Sector", fieldType: "number", required: false },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await Sector.deleteMany();
    await Sector.insertMany(sectors);
    console.log("Sectors Seeded Successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error Seeding Data:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
