import "reflect-metadata";
import "express-async-errors";
import express from "express";
import usersRoutes from "./routes/users.routes";
import { handleErrors } from "./error";
import loginRoutes from "./routes/login.routes";
import categoriesRoutes from "./routes/categories.routes";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoriesRoutes);

app.use(handleErrors);

export default app;
