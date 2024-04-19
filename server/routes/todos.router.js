const router = require("express").Router();
const { error } = require("console");
const pool = require("../modules/pool");

// GET
router.get("/", (req, res) => {
  console.log("GET in /toDo");
  //sql is similar to axios. it directs info to the DB
  const sqlText = `
        SELECT * FROM todos
        ORDER BY id;
`;
  //pool
  pool
    .query(sqlText)
    .then((dbResult) => {
      let todoTask = dbResult.rows;
      res.send(todoTask);
    })
    .catch((dbError) => {
      console.log("Get error in server:", dbError);
      res.sendStatus(500);
    });
});
// POST
router.post("/", (req, res) => {
  console.log("todo post in server!!");
  let todo = req.body.text;
  console.log("todo", todo);
  sqlText = `
          INSERT INTO todos
              (text)
              VALUES ($1);
      `;
  pool
    .query(sqlText, [todo])
    .then((dbRes) => {
      console.log("successful POST", dbRes);
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.log("error", dbErr);
      res.sendStatus(500);
    });
});

// PUT
router.put("/:idComplete", (req, res) => {
  let turnToGreen = req.params.idComplete;

  const sqlText = `
    UPDATE todos
    SET "isComplete" = TRUE
    WHERE id = $1;
     `;
  const sqlValues = [turnToGreen];

  pool
    .query(sqlText, sqlValues)
    .then((dbResult) => {
      // The update was successful, gotta let the client know:
      res.sendStatus(200);
    })
    .catch((dbError) => {
      console.log("UPDATE/todos/:id failed:", dbError);
      // The delete failed, gotta let the client know:
      res.sendStatus(500);
    });
});

// DELETE /todos/:id
router.delete("/:theIdToDeletePlz", (req, res) => {
  console.log("DELETE /todos/:id received a request!");

  // Figure out what todo to delete, based on the value
  // that is inside the :id route parameter:
  console.log("req.params is", req.params);
  let idToDelete = req.params.theIdToDeletePlz;

  const sqlText = `
    DELETE FROM "todos"
     WHERE id = $1;
  `;
  const sqlValues = [idToDelete];

  pool
    .query(sqlText, sqlValues)
    .then((dbResult) => {
      // The delete was successful, gotta let the client know:
      res.sendStatus(200);
    })
    .catch((dbError) => {
      console.log("DELETE /todos/:id failed:", dbError);
      // The delete failed, gotta let the client know:
      res.sendStatus(500);
    });
});

module.exports = router;
