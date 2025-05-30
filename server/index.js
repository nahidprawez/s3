import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import s3Routes from "./router/s3Routes.js";

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT || "3000", 10);

const isProd = process.env.NODE_ENV === "production";
const STATIC_PATH = join(process.cwd(), "client", isProd ? "dist" : "");

const app = express();
app.use(express.json());

if (isProd) {
  console.log("entered here", isProd);
  
  app.use(serveStatic(STATIC_PATH, { index: false }));

  app.get("*", (req, res) => {
    res
      .status(200)
      .set("Content-Type", "text/html")
      .send(readFileSync(join(STATIC_PATH, "index.html")));
  });
}

app.use("/api/s3", s3Routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
