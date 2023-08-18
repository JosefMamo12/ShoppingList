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

const totalUpdateQuery = (tableName, categoryId, oldTotal) => {
  const newTotal = oldTotal + 1;
  const query = "UPDATE ? SET total = ? where id = ?";
  pool.query(query, [tableName, newTotal, categoryId], (err, res) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("totalUpdateQuery ==> Update Succeed");
  });
};

export const addItem = (req, res) => {
  const { itemName, categoryId } = req.body;
  pool.query(
    `SELECT id FROM items WHERE item_name RLIKE CONCAT('.*', ?, '.*')`,
    itemName,
    (err, result) => {
      if (err) {
        throw err;
      }
      console.log(typeof result);
      if (Object.keys(result).length === 0) {
        // console.log(res[0]);
        console.log("Inserting new item");
        pool.query(
          `INSERT INTO items (item_name, category_id, total) values ("${itemName}" , ${categoryId}, 1)`,
          (err, res) => {
            if (err) {
              throw err;
            }
          }
        );
      } else {
        console.log("Updating existing item");
        const id = result[0]["id"];
        const query = `UPDATE items SET total = total + 1 WHERE id = ${id}`;
        pool.query(query, (err, res) => {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log(`Item: ${itemName} has been Updated successfully`);
        });
      }
    }
  );
};
export const getItems = (req, res) => {
  const query = "SELECT * FROM items";
  pool.query(query, (err, result) => {
    if (err) return res.status(404).json({ error: err.message });
    return res.status(200).json(result);
  });
};
