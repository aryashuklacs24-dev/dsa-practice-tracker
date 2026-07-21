const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const problemRoutes = require("./routes/problemRoutes");

const settingsRoutes =
require("./routes/settingsRoutes");

const codeforcesRoutes =
require("./routes/codeforcesRoutes");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{

    res.send("DSA Tracker Backend Running");

});

app.use("/api/problems",problemRoutes);

app.use(
"/api/settings",
settingsRoutes
);

app.use(
"/api/codeforces",
codeforcesRoutes
);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{

    console.log(`Server running on ${PORT}`);

});