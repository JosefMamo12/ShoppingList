import { createPool } from "mysql";

const pool = createPool({
  multipleStatements: true,
  host: "localhost",
  user: "root",
  password: "1234",
  connectionLimit: 10,
  database: "list",
  port: "3307",
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
