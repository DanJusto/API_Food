const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage")

class ProductsImageService {
  constructor(productRepository){
    this.productRepository = productRepository;
  }

  async executeUpdate ({ id, imageFilename }) {

    const diskStorage = new DiskStorage;

    const product = await this.productRepository.findProductById(id);

    if (!product) {
      throw new AppError("Produto não encontrado.", 400);
    }

    if (product.image) {
      await diskStorage.deleteFile(product.image);
    }

    const filename = await diskStorage.saveFile(imageFilename);

    await this.productRepository.updateImageProduct(filename, id);
  }
}

module.exports = ProductsImageService;