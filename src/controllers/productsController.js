const ProductsService = require("../services/ProductsService");
const ProductRepository = require("../repositories/ProductRepository");

class ProductsController {

  async create(request, response) {
    const { title, category, description, price, tags } = request.body;

    const productRepository = new ProductRepository();
    const productsService = new ProductsService(productRepository);

    await productsService.executeCreate({ title, category, description, price, tags });

    return response.status(201).json();
  }

  async index(request, response) {
    const { search } = request.query;

    const productRepository = new ProductRepository();
    const productsService = new ProductsService(productRepository);
    
    const productsWithTags = await productsService.executeIndex(search);
      
    return response.json(productsWithTags);
  }

  async show(request, response) {
    const { id } = request.params;

    const productRepository = new ProductRepository();
    const productsService = new ProductsService(productRepository);

    const productWithTags = await productsService.executeShow(id);
    const { tags, product } = productWithTags

    return response.json({
      ...product,
      tags
    });
  }

  async update(request, response) {
    const { title, category, description, price, tags } = request.body;
    const { id } = request.params;
    
    const productRepository = new ProductRepository();
    const productsService = new ProductsService(productRepository);

    await productsService.executeUpdate({ id, title, category, description, price, tags });

    return response.json();
  }

  async delete(request, response) {
    const { id } = request.params;
    
    const productRepository = new ProductRepository();
    const productsService = new ProductsService(productRepository);

    await productsService.executeDelete(id);

    return response.json();
  }
}

module.exports = ProductsController;