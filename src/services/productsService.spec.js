const ProductsService = require("./ProductsService");
const ProductRepositoryInMemory = require("../repositories/ProductRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("ProductService", () => {
  let productRepository;
  let productsService;

  beforeEach(() => {
    productRepository = new ProductRepositoryInMemory();
    productsService = new ProductsService(productRepository);
  });

  it("product should be created", async () => {
    const newProduct = {
      title: "Teste",
      category: "refeição",
      description: "Testando 123",
      price: "R$ 15,00",
      tags: ["teste1", "teste2"]
    };
  
    const { product, tags } = await productsService.executeCreate(newProduct);
  
    expect(product).toHaveProperty("title", "Teste");
  });
});