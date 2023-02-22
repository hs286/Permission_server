import express from "express";
import cors from "cors";
import BlogRoutes from "./routes/BlogRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import SeedRoutes from "./routes/SeedRoutes.js";
import PermissionRoutes from './routes/PermissionRoutes.js';
import bodyParser from "body-parser";
import Connection from "./database/db.js";
import multer from "multer";
const upload=multer({dest:'uploads/'})

const app = express();

app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({
//   parameterLimit: 100000,
//   limit: '5mb',
//   extended: true
// }));
// app.use(bodyParser.json());


app.use(bodyParser.json({limit: '3mb'}));
app.use(bodyParser.urlencoded({parameterLimit: 100000,limit: '50mb', extended: true}));
app.use(express.json());
app.use('/upload',express.static('upload'));

app.use("/blogs", BlogRoutes);
app.use("/users", UserRoutes);
app.use("/seedData",SeedRoutes);
app.use("/permission",PermissionRoutes)


const PORT = 8000;

Connection();

app.listen(PORT, () => {
  console.log(`server running successfully hi ${PORT}`);
});
