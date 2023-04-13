const createTags = `
  CREATE TABLE IF NOT EXISTS tags (
  tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
  tag_name VARCHAR NOT NULL,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (product_id) 
    REFERENCES products(product_id) 
    ON DELETE CASCADE
  );
`;

module.exports = createTags;