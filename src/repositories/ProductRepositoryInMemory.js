class ProductRepositoryInMemory {
  products = [];
  tags = [];

  async findProductByTitle(title) {
    return this.products.find(product => product.title === title);
  }

  async createProduct({ title, category, description, price }) {
    const product = {
      product_id: Math.floor(Math.random() * 1000) + 1,
      title,
      category,
      description,
      price
    }

    this.products.push(product);

    return product;
  }

  async createTags(productId, { tags }) {
    tags.forEach(name => {
      this.tags.push({ name });
    });
    
    return this.tags;
  }

}

module.exports = ProductRepositoryInMemory;