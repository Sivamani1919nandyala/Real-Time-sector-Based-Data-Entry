A real-time sector-based data entry and export application using React.js, Node.js, Express.js, MongoDB, and Socket.io. It supports Excel (.xlsx) and PDF (.pdf) exports with authentication.
Features
✅ User Authentication (JWT)
✅ Real-time Data Entry (Socket.io)
✅ Sector-based Data Management
✅ Export Data to Excel & PDF
✅ REST API with MongoDB
✅ Secure Routes & Middleware
📂 Project Setup
 Prerequisites
Node.js (Download from Node.js official site)
MongoDB (Use MongoDB Atlas or local MongoDB)
Git (Install from Git website)
🔹 Backend Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/sector-app.git
cd sector-app/sector-app-backend
2️⃣ Install dependencies
npm install
3️⃣ Create .env file
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
4️⃣ Run the backend server
npm start
or with nodemon (for development):
npm run dev
🔹 Frontend Setup
1️⃣ Go to the frontend folder

cd sector-app-frontend
2️⃣ Install dependencies

npm install
3️⃣ Start the React app
npm run dev
👉 App will run at: http://localhost:5173

