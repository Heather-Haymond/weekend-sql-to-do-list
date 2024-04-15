const router = require('express').Router();
const pool = require('../modules/pool');

// GET
router.get('/', (req, res) => {
  console.log('GET in /toDo');
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
          console.log('Get error in server:', dbError);
          res.sendStatus(500);
      });
});
    // POST
    router.post('/', (req, res) => {
      console.log('trying to get the todos!!');
      let todo = req.body.text;
      console.log('req.body.text', req.body.text);
      sqlText = `
          INSERT INTO todos
              (text)
              VALUES ($1);
      `;
      pool.query(sqlText, [text])
    // here, res.sendStatus is the express variable, don't overwrite with
    //      .then variable???
    .then((dbRes) => {
        console.log('successful POST, inserted a row!', dbRes);
        res.sendStatus(201);
    })
    .catch((dbErr) => {
        console.log('Whoa...server error in POST for /todos:', dbErr);
        res.sendStatus(500);
    })
});

    // PUT
    // DELETE

module.exports = router;
