const sqliteConnection = require("../database");

class ProductRepository {

  async searchProductsByTitleOrTag(tags, title) {
    const database = await sqliteConnection();
    await database.exec("PRAGMA foreign_keys=ON");

    const products = await database.all(`
    SELECT products.product_id, products.title, products.description, products.category, products.price, products.image
    FROM products
    INNER JOIN tags ON products.product_id = tags.product_id
    WHERE tags.tag_name IN ($1)
    OR products.title LIKE $2
    GROUP BY products.product_id
    ORDER BY products.title`, [tags, title]);

    return products;
  }

  async findProductByTitle(title) {
    const database = await sqliteConnection();
    await database.exec("PRAGMA foreign_keys=ON");

    const product = await database.get("SELECT * FROM products WHERE title = (?)", [title]);

    return product;
  }

  async findProductById(id) {
    const database = await sqliteConnection();
    await database.exec("PRAGMA foreign_keys=ON");

    const product = await database.get("SELECT * FROM products WHERE product_id = (?)", [id]);

    return product;
  }

  async createProduct({ title, category, description, price }) {
    const database = await sqliteConnection();
    await database.exec("PRAGMA foreign_keys=ON");

    const product = await database.run("INSERT INTO products (title, category, description, price) VALUES (?, ?, ?, ?)", [title, category, description, price]);

    return product;
  }

  async updateProduct({ id, title, category, description, price, tags }) {
    const database = await sqliteConnection();
    await database.exec("PRAGMA foreign_keys=ON");

    const updatedProduct = await database.run(`
    UPDATE products SET
    title = ?,
    category = ?,
    description = ?,
    price = ?,
    updated_at = DATETIME('now')
    WHERE product_id = ?`,
    [title, category, description, price, id]);

    return updatedProduct;
  }

  async updateImageProduct(filename, id) {
    const database = await sqliteConnection();
    await database.exec("PRAGMA foreign_keys=ON");
    
    await database.run("UPDATE products SET image = (?) WHERE product_id = (?)", [filename, id]);

  }

  async deleteProduct(id) {
    const database = await sqliteConnection();
    await database.exec("PRAGMA foreign_keys=ON");

    await database.run("DELETE FROM products WHERE product_id = ?", [id]);
  }

  async findTagsById(id) {
    const database = await sqliteConnection();
    await database.exec("PRAGMA foreign_keys=ON");

    const tags = await database.all("SELECT tag_name FROM tags WHERE product_id = ?", [id]);

    return tags;
  }

  async findAllTags() {
    const database = await sqliteConnection();
    await database.exec("PRAGMA foreign_keys=ON");

    const tags = await database.all("SELECT tag_name, product_id FROM tags");

    return tags;
  }

  async createTags(productId, { tags }) {
    const database = await sqliteConnection();
    await database.exec("PRAGMA foreign_keys=ON");

    await tags.forEach(name => {
      database.run("INSERT INTO tags (tag_name, product_id) VALUES (?, ?)", [name, productId]);
    });
  }

  async updateTags(productId, { tags }) {
    const database = await sqliteConnection();
    await database.exec("PRAGMA foreign_keys=ON");

    await database.run("DELETE FROM tags WHERE product_id = ?", [productId]);

    await tags.forEach(name => {
      database.run("INSERT INTO tags (tag_name, product_id) VALUES (?, ?)", [name, productId]);
    });
  }
}

module.exports = ProductRepository;