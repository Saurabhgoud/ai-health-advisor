import "dotenv/config";
import dns from "node:dns";
import app from "./app.js";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import connectDB from "./config/db.js";
const PORT = process.env.PORT || 3e3;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server start error:", error);
    process.exit(1);
  }
};
startServer();
