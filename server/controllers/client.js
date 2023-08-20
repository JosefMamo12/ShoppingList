import pool from "../config/connect.js";

export const getCategories = (req, res) => {
  try {
    pool.query("SELECT * FROM categories", (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const addItemUsingIcon = (req, res) => {
  const { itemId, categoryId } = req.body;

  pool.getConnection((getConnectionErr, connection) => {
    if (getConnectionErr) {
      return res.status(500).json({ error: "Database connection error" });
    }
    connection.beginTransaction((beginTransactionErr) => {
      if (beginTransactionErr) {
        connection.release();
        return res.status(500).json({ error: "Transaction begin error" });
      }
    });
    const updateQuery = `UPDATE items SET total = total + 1 WHERE id = ?`;
    connection.query(updateQuery, [itemId], (updateErr) => {
      if (updateErr) {
        connection.rollback(() => {
          connection.release();
          return res.status(500).json({ error: "Update query error" });
        });
      }

      connection.commit((commitErr) => {
        if (commitErr) {
          connection.rollback(() => {
            connection.release();
            return res.status(500).json({ error: "Commit error" });
          });
        }
        updateCategories(connection, categoryId, "add");
        connection.release();
        return res.sendStatus(200);
      });
    });
  });
};

const updateItem = (connection, itemId) => {
  return new Promise((resolve, reject) => {
    const updateQuery = `UPDATE items SET total = total - 1 WHERE id = ?`;
    connection.query(updateQuery, [itemId], (updateErr) => {
      if (updateErr) {
        return reject("Update query error");
      }
      resolve();
    });
  });
};

// Function to execute procedures
const executeProcedures = (connection, action) => {
  const procedures = ["DeleteItemsWithFlagPro", "DeleteItemsWithFlag"];
  const procedurePromises = procedures.map((procedure) => {
    return new Promise((resolve, reject) => {
      executeProcedure(connection, procedure)
        .then(() => resolve())
        .catch(() => reject(`Error executing ${procedure}`));
    });
  });

  return Promise.all(procedurePromises);
};
export const removeItemUsingIcon = async (req, res) => {
  const { itemId, categoryId, action } = req.body;

  pool.getConnection(async (getConnectionErr, connection) => {
    if (getConnectionErr) {
      return res.status(500).json({ error: "Database connection error" });
    }

    try {
      await connection.beginTransaction();

      await updateItem(connection, itemId);

      if (action === "remove") {
        await executeProcedures(connection, action);
      }

      updateCategories(connection, categoryId, action);

      await connection.commit();

      connection.release();
      return res.sendStatus(200);
    } catch (err) {
      connection.rollback(() => {
        connection.release();
        return res.status(500).json({ error: err });
      });
    }
  });
};

export const addItem = (req, res) => {
  const { itemName, categoryId } = req.body;

  pool.getConnection((getConnectionErr, connection) => {
    if (getConnectionErr) {
      return res.status(500).json({ error: "Database connection error" });
    }

    connection.beginTransaction((beginTransactionErr) => {
      if (beginTransactionErr) {
        connection.release();
        return res.status(500).json({ error: "Transaction begin error" });
      }

      connection.query(
        `SELECT id FROM items WHERE item_name = ?`,
        itemName,
        (selectErr, selectResult) => {
          if (selectErr) {
            connection.rollback(() => {
              connection.release();
              return res.status(500).json({ error: "Select query error" });
            });
          }

          if (Object.keys(selectResult).length === 0) {
            connection.query(
              `INSERT INTO items (item_name, category_id, total, should_delete) values (?, ?, 1, 0)`,
              [itemName, categoryId],
              (insertErr) => {
                if (insertErr) {
                  connection.rollback(() => {
                    connection.release();
                    return res
                      .status(500)
                      .json({ error: "Insert query error" });
                  });
                }

                connection.commit((commitErr) => {
                  if (commitErr) {
                    connection.rollback(() => {
                      connection.release();
                      return res.status(500).json({ error: "Commit error" });
                    });
                  }
                  updateCategories(connection, categoryId, "add");
                  connection.release();
                  return res.sendStatus(200);
                });
              }
            );
          } else {
            const id = selectResult[0]["id"];
            const updateQuery = `UPDATE items SET total = total + 1 WHERE id = ?`;

            connection.query(updateQuery, [id], (updateErr) => {
              if (updateErr) {
                connection.rollback(() => {
                  connection.release();
                  return res.status(500).json({ error: "Update query error" });
                });
              }

              connection.commit((commitErr) => {
                if (commitErr) {
                  connection.rollback(() => {
                    connection.release();
                    return res.status(500).json({ error: "Commit error" });
                  });
                }
                updateCategories(connection, categoryId, "add");
                connection.release();
                return res.sendStatus(200);
              });
            });
          }
        }
      );
    });
  });
};
export const getItems = (req, res) => {
  const query = "SELECT * FROM items";
  pool.query(query, (err, result) => {
    if (err) return res.status(404).json({ error: err.message });
    return res.status(200).json(result);
  });
};

export const getTotalItems = (req, res) => {
  const query = "SELECT SUM(total) as total FROM items";
  pool.query(query, (err, result) => {
    if (err) return res.status(404).json({ error: err.message });
    console.log(result);
    return res.status(200).json(result);
  });
};
const updateCategories = (connection, categoryId, action) => {
  const updateCategoriesQuery =
    action === "add"
      ? `UPDATE categories set total = total + 1 WHERE id = ?`
      : `UPDATE categories set total = total - 1 WHERE id = ?`;
  connection.query(updateCategoriesQuery, [categoryId], (updateErr) => {
    if (updateErr) {
      connection.rollback(() => {
        connection.release();
        return res.status(500).json({ error: "Update query error" });
      });
    }

    connection.commit((commitErr) => {
      if (commitErr) {
        connection.rollback(() => {
          connection.release();
          return res.status(500).json({ error: "Commit error" });
        });
      }
    });
  });
};
const executeProcedure = (connection, procedureName) => {
  return new Promise((resolve, reject) => {
    connection.query(`CALL ${procedureName}()`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log(`${procedureName} executed successfully.`);
        resolve(results);
      }
    });
  });
};
