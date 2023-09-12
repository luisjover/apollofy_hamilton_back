import express from 'express';

// var cors = require("cors");
//Create an express application
const app = express();

// app.use(cors());
// Middleware to be able to read incoming requests
app.use(express.json());
// Middleware to get info about requests 
// app.use(morgan("dev"))
// app.use(fileUpload({
//     useTempFiles: true,
//     tempFileDir: "./uploads"
// }))
// Set different routes
// app.use("/users", UsersRouter);

export default app;