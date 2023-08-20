import { createPool } from "mysql";
import dotenv from "dotenv";
dotenv.config();

const pool = createPool({
  multipleStatements: true,
  host: process.env.CLOUD_SQL_HOST,
  user: process.env.CLOUD_SQL_USERNAME,
  password: process.env.CLOUD_SQL_PASSWORD,
  connectionLimit: 10,
  database: process.env.CLOUD_SQL_DATABASE,
  port: process.env.CLOUD_SQL_PORT,
});

const initializeDatabase = () => {
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

    connection.query(deleteQuery, (deleteErr) => {
      if (deleteErr) throw deleteErr;

      connection.query(createCategoriesValuesQuery, (createErr) => {
        if (createErr) throw createErr;

        console.log("Database initialized successfully.");
        connection.release(); // Release the connection back to the pool
      });
    });
  });
};

export default pool;

initializeDatabase();
