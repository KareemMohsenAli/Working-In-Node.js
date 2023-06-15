const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 5000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "User",
});
app.use(express.json());
/////////////////////////////////////////////////////////////////////////////add user endpoint
app.post("/adduser", (req, res) => {
  console.log(req.body);
  const { name, email, password, age } = req.body;
  const getUsersQuery = `SELECT * FROM users`;
  const addUserQuery = `INSERT INTO users (name, email, password,age) VALUES (?, ?, ?,?)`;
  connection.execute(getUsersQuery, (error, result, fields) => {
    if (error) {
      res.json("Error retrieving users:", error);
    } else {
      const emails = result.map((user) => user.email);
      if (emails.includes(email)) {
        res.json({ error: "User already exists" });
      } else {
        connection.execute(
          addUserQuery,
          [name, email, password, age],
          (error, result) => {
            if (error) {
              console.error("Error adding user:", error);
              res.json({ error: "An error occurred" });
            } else {
              console.log("User added successfully");
              res.json({ message: "User added successfully" });
            }
          }
        );
      }
    }
  });
});
/////////////////////////////////////////////////////////////////////////////update user endpoint
app.put("/updateuser/:id", (req, res) => {
  const { newName, newEmail, newPassword, newAge } = req.body;
  const { id } = req.params;
  const updatedUserQuery =
    "UPDATE users SET name=?,email=?,password=?,age=? WHERE id=?";
  const getUserById = `SELECT id FROM users WHERE id=?`;
  connection.execute(getUserById, [id], (error, result) => {
    if (error) {
      res.json("Error retrieving userId:");
      console.log(error);
    } else {
      if (result.length > 0) {
        connection.execute(
          updatedUserQuery,
          [newName, newEmail, newPassword, newAge, id],
          (error, result) => {
            if (error) {
              res.json({ error: "An error occurred" });
            } else {
              res.json({ message: "Successfully updated" });
            }
          }
        );
      } else {
        res.json({ message: "ID that u want to update it doesnt exist" });
      }
    }
  });
});
/////////////////////////////////////////////////////////////////////////////delete user endpoint
app.delete("/deleteuser/:id", (req, res) => {
  const { id } = req.params;
  const checkUserExist = "SELECT id FROM users WHERE id=?";
  const deleteUserQuery = "DELETE FROM users WHERE id=?";
  connection.execute(checkUserExist, [id], (error, result) => {
    if (error) {
      res.json({ error: "An error occurred of retreiving ID" });
    } else {
      if (result.length > 0) {
        connection.execute(deleteUserQuery, [id], (error, result) => {
          if (error) {
            res.json({
              error: "An error occurred while attempting to delete the user",
            });
            console.log(error);
          } else {
            res.json({ error: "user deleted Successfully" });
          }
        });
      } else {
        res.json({ message: "user ID doesnt exist" });
      }
    }
  });
});
/////////////////////////////////////////////////////////////////////////////search for user endpoint
app.get("/searchbyname", (req, res) => {
  const searchForSpecificUser =
    "SELECT * FROM users WHERE name LIKE 'a%' AND age<30";
  connection.execute(searchForSpecificUser, (err, results) => {
    if (err) {
      res.json({ error: "error while trying to get the name of the user" });
    } else {
      if (results.length == 0) {
        res.json({ message: "There no user achieved the search" });
      } else {
        res.json(results);
      }
    }
  });
});
/////////////////////////////////////////////////////////////////////////////search by ids endpoint
app.get("/searchbyids", (req, res) => {
  //it contains many ids
  const ids = req.query.ids;
  //another way
  // const idArray = ids.split(',');
  // const loopingOnIdArray = idArray.map(() => '?').join(',');
  console.log(ids);
  const getUserByIdQuery = `SELECT * FROM users WHERE id IN (${ids})`;
  connection.execute(getUserByIdQuery, (err, results) => {
    if (err) {
      res.json({ error: "error while trying to get users IDS" });
    } else {
      res.json(results);
    }
  });
});
///////////////////////////////////////////////////////////////////////////////get all users endpoint
app.get("/getusers", (req, res) => {
  const query = `SELECT * FROM users;`;
  connection.execute(query, (err, result, fields) => {
    console.log(err);
    return res.json({ message: "done", result });
  });
});
/////////////// i made the following to get all users and their created products,
//so i made createdby column in products table as a foreign key to get all users with their products////////////////////
// CREATE TABLE products (
//   id INT PRIMARY KEY AUTO_INCREMENT,
//   pName VARCHAR(50),
//   pDescription VARCHAR(255),
//   price DECIMAL(10,2),
//   createdby INT,
//   FOREIGN KEY (createdby) REFERENCES users(id)
// );
////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////get all users and their products
app.get("/usersproducts", (req, res) => {
  const GetUsersProducts = `SELECT users.*, products.* FROM users LEFT JOIN products ON users.id = products.createdby`;
  connection.execute(GetUsersProducts, (err, results) => {
    if (err) {
      console.error("Error retrieving users with products:", err);
      res.json({ error: "An error occurred" });
    } else {
      res.json(results);
    }
  });
});
//////////////////////////////////////////////////products///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////add product endpoint
app.post("/addproduct", (req, res) => {
  const { pName, pDescription, price } = req.body;
  // console.log(pName, pDescription, price);

  const checkProductExist = "SELECT * FROM products WHERE pName=?";
  connection.execute(checkProductExist, [pName], (err, results) => {
    if (results.length > 0) {
      console.log(err);
      res.json({ message: "product already exists" });
    } else {
      const addUserQuery = `INSERT INTO products (pName, pDescription, price) VALUES (?, ?, ?)`;
      connection.execute(
        addUserQuery,
        [pName, pDescription, price],
        (err, results) => {
          if (err) {
            console.error("Error adding product:", err);
            res.json({ error: "An error occurred" });
          } else {
            console.log("Product added successfully");
            res.json({ message: "Product added successfully" });
          }
        }
      );
    }
  });
});
//////////////////////////////////////////////////////////////////////////////delete product endpoint
app.delete("/deleteproduct/:id", (req, res) => {
  const productId = req.params.id;
  const ownerId = req.body.userId;
  const deletePermissionQuery =
    "DELETE FROM products WHERE createdby=? AND id=? ";
  connection.execute(
    deletePermissionQuery,
    [ownerId, productId],
    (err, results) => {
      if (results.affectedRows === 0) {
        res.json({
          error: "Product not found or you do not have permission to delete it",
        });
      } else {
        res.json({ message: "Product deleted successfully" });
      }
    }
  );
});
//////////////////////////////////////////////////////////////////////////////update product endpoint
app.put("/updateproduct/:productId", (req, res) => {
  const productId = req.params.productId;
  const { pName, pDescription, price } = req.body;
  const ownerId = req.body.ownerId; // get owner's ID from request body

  const updateProductQuery = `UPDATE products SET pName=?, pDescription=?, price=? WHERE id=? AND createdby=?`;

  connection.execute(
    updateProductQuery,
    [pName, pDescription, price, productId, ownerId],
    (err, result) => {
      if (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ error: "An error occurred" });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({
            error:
              "Product not found or you do not have permission to update it",
          });
        } else {
          console.log("Product updated successfully");
          res.status(200).json({ message: "Product updated successfully" });
        }
      }
    }
  );
});
//////////////////////////////////////////////////////////////////////////////get all products endpoint
app.get("/getproducts", (req, res) => {
  const query = `SELECT * FROM products;`;
  connection.execute(query, (err, result) => {
    console.log(err);
    return res.json({ message: "done", result });
  });
});
//////////////////////////////////////////////////////////////////////search for product price endpoint
app.get("/searchbyprice", (req, res) => {
  const searchForSpecificProduct = "SELECT * FROM products WHERE price>3000";
  connection.execute(searchForSpecificProduct, (err, results) => {
    if (err) {
      res.json({
        error: "error while trying to get the product bigger than 3000",
      });
    } else {
      if (results.length == 0) {
        res.json({ message: "There no post achieved the search" });
      } else {
        res.json(results);
      }
    }
  });
});
app.get("*", (req, res) => {
  res.status(404).json({ message: "404 page not found" });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
