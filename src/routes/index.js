const { Router } = require("express");

const usersRoutes = require("./users.routes");
const productsRoutes = require("./products.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();
routes.use("/users", usersRoutes);
routes.use("/products", productsRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;