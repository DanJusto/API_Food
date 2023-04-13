const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage")

class ProductsService {
  constructor(productRepository){
    this.productRepository = productRepository;
  }

  async executeCreate ({ title, category, description, price, tags }) {

    const checkProductExists = await this.productRepository.findProductByTitle(title);    
    if (checkProductExists) {
      throw new AppError("Este produto já está cadastrado.");
    }

    const product = await this.productRepository.createProduct({ title, category, description, price });
    
    const tagsName = await this.productRepository.createTags(product.lastID, { tags });

    return product, { tagsName };
  }

  async executeUpdate ({ id, title, category, description, price, tags }) {

    const product = await this.productRepository.findProductById(id);
    
    if(!product) {
      throw new AppError("Produto não encontrado.");     
    }

    const checkProductExists = await this.productRepository.findProductByTitle(title);
       
    if (checkProductExists && checkProductExists.product_id !== Number(id)) {
      throw new AppError("Este produto já está cadastrado.");
    }

    product.title = title ?? product.title;
    product.category = category ?? product.category;
    product.description = description ?? product.description;
    product.price = price ?? product.price;

    const updatedProduct = await this.productRepository.updateProduct({ title, category, description, price, id });

    const updatedTags = await this.productRepository.updateTags(id, { tags })

    return updatedProduct, { updatedTags };
  }

  async executeDelete (id) {

    const product = await this.productRepository.findProductById(id);
  
    if (!product) {
      throw new AppError("Produto não encontrado."); 
    }

    const diskStorage = new DiskStorage;
    await diskStorage.deleteFile(product.image);

    await this.productRepository.deleteProduct(id);

    return "Produto deletado!"
  }

  async executeShow (id) {

    const product = await this.productRepository.findProductById(id);
    const tags = await this.productRepository.findTagsById(id);

    return { product, tags };
  }

  async executeIndex (search) {

    const filteredSearch = search.split(/[\s, ]+/).map(search => search.trim());

    const preparedTags = filteredSearch.toString();
    const preparedTitle = "%" + search + "%";
    
    const products = await this.productRepository.searchProductsByTitleOrTag(preparedTags, preparedTitle);
    const allTags = await this.productRepository.findAllTags();
    
    const productsWithTags = products.map(product => {
      const productTags = allTags.filter(tag => tag.product_id === product.product_id);
      return {
        ...product,
        tags: productTags
      }
    });

    return productsWithTags;
  }
}

module.exports = ProductsService;