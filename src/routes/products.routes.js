const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const ProductsController = require("../controllers/productsController");
const ProductsImageController = require("../controllers/productsImageController");
const { isAdmin, validationAuth } = require("../middlewares/validationAuth");

const productsController = new ProductsController();
const productsImageController = new ProductsImageController();
const upload = multer(uploadConfig.MULTER);
const productsRouter = Router();

productsRouter.post("/", isAdmin, productsController.create);
productsRouter.get("/", validationAuth, productsController.index);
productsRouter.get("/:id", validationAuth, productsController.show);
productsRouter.put("/:id", isAdmin, productsController.update);
productsRouter.delete("/:id", isAdmin, productsController.delete);
productsRouter.patch("/:id/image", isAdmin, upload.single("image"), productsImageController.update);

module.exports = productsRouter;