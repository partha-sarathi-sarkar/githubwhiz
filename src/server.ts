import express from "express";
import path from "path";
import http from "http";

import indexRoutes from "./routes/index.routes";
import day1Routes from "./routes/day1.routes";
import healthRoutes from "./routes/health.routes";

const app = express();

/**
 * View Engine
 */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/**
 * Static Files
 */
app.use(express.static(path.join(__dirname, "../public")));

/**
 * Routes
 */
app.use("/", indexRoutes);
app.use("/DAY-1", day1Routes);
app.use("/health", healthRoutes);

/**
 * Create HTTP Server
 */
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/**
 * GRACEFUL SHUTDOWN LOGIC
 */

const gracefulShutdown = () => {
  console.log("Received shutdown signal. Closing server gracefully...");

  server.close((err) => {
    if (err) {
      console.error("Error during server shutdown:", err);
      process.exit(1);
    }

    console.log("All connections closed. Exiting process.");
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error("Forcing shutdown after timeout...");
    process.exit(1);
  }, 10000);
};

// Listen for termination signals
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);