const ProductsImageService = require("../services/ProductsImageService");
const ProductRepository = require("../repositories/ProductRepository");

class ProductsImageController {
  async update(request, response) {
    const { id } = request.params;
    if(!request.file) {
      return response.json();
    }
    const imageFilename = request.file.filename

    const productRepository = new ProductRepository();
    const productsImageService = new ProductsImageService(productRepository);

    await productsImageService.executeUpdate({ id, imageFilename });

    return response.json();
  }
}

module.exports = ProductsImageController;