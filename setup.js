import db from './db.js';

const createTable = `
CREATE TABLE IF NOT EXISTS products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
    )`

async function createProductsTable() {
    try{
        await db.query(createTable);
        console.log("Products table created successfully");
    } catch (error) {
        console.error("Error creating products table: ", error);
        process.exit(1);
    }
}

createProductsTable();
