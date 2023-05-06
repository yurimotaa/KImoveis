import "reflect-metadata";
import "express-async-errors";
import express from "express";
import usersRoutes from "./routes/users.routes";
import { handleErrors } from "./error";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);

app.use(handleErrors);

export default app;
