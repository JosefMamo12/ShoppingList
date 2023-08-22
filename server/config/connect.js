import mysql from "mysql2";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const pool = mysql.createPool({
  multipleStatements: true,
  host: process.env.CLOUD_SQL_HOST,
  user: process.env.CLOUD_SQL_USERNAME,
  password: process.env.CLOUD_SQL_PASSWORD,
  database: process.env.CLOUD_SQL_DATABASE,
  port: 3306,
  connectionLimit: 10,
  ssl: { ca: fs.readFileSync("config/DigiCertGlobalRootCA.crt.pem") },
});
// const pool = createPool({
//   multipleStatements: true,
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   connectionLimit: 10,
//   database: "list",
//   port: "3307",
// });
const initializeDatabase = () => {
  const createCategoriesTableQuery = `
  CREATE TABLE IF NOT EXISTS categories (
    id INT NOT NULL ,
    label VARCHAR(45) NULL,
    total INT NULL,
    PRIMARY KEY (id)
  );
`;
  const createItemsTableQuery = `
  CREATE TABLE IF NOT EXISTS items (
    id INT NOT NULL AUTO_INCREMENT,
    category_id INT NULL,
    item_name VARCHAR(100) NULL,
    total INT NULL,
    should_delete INT NULL,
    PRIMARY KEY (id)
  );
`;
  const deleteQuery = "DELETE FROM items; DELETE FROM categories;"; // Split the DELETE queries
  const createCategoriesValuesQuery = `
    INSERT INTO categories (id, label, total)
    VALUES
    (0, 'בשר ודגים', 0), 
    (1, 'ירקות ופירות', 0), 
    (2, 'מוצרי ניקיון', 0), 
    (3, 'מאפים', 0), 
    (4, 'מוצרי חלב', 0);
  `;

  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(createCategoriesTableQuery, (createCategoriesErr) => {
      if (createCategoriesErr) throw createCategoriesErr;

      connection.query(createItemsTableQuery, (createItemsErr) => {
        if (createItemsErr) throw createItemsErr;

        connection.query(deleteQuery, (deleteErr) => {
          if (deleteErr) throw deleteErr;

          connection.query(createCategoriesValuesQuery, (createErr) => {
            if (createErr) throw createErr;

            console.log("Database initialized successfully.");
            connection.release(); // Release the connection back to the pool
          });
        });
      });
    });
  });
};

export default pool;

initializeDatabase();
