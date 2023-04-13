const createProducts = `
    CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    description VARCHAR,
    price VARCHAR,
    image VARCHAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

module.exports = createProducts;