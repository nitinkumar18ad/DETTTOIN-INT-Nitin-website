import express from "express";
import cors from "cors";
import contentRoutes from "./routes/contentRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", contentRoutes);

app.get("/", (request, response) => {
  response.json({ status: "ok", service: "vasant-valley-server" });
});

app.listen(port, () => {
  console.log(`Vasant Valley API listening on http://127.0.0.1:${port}`);
});
