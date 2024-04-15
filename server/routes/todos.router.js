const router = require('express').Router();
const pool = require('../modules/pool');

// GET
router.get('/', (req, res) => {
  console.log('GET in /toDo');
  //sql is backend language. Comparison to front end (and backend) Javascript
  const sqlText = `
        SELECT * FROM todos
        ORDER BY id;
`;
//pool is similar to axios.it directs info to the DB
  pool
      .query(sqlText)
      .then((dbResult) => {
          let toDoTask = dbResult.rows;
          res.send(toDoTask);
      })
      .catch((dbError) => {
          console.log('Get error in server:', dbError);
          res.sendStatus(500);
      });
});
    // POST
    router.post('/', (req, res) => {
      console.log('post toDo');
      let toDoTask = req.body.text;
      console.log('req.body.text', req.body.text);
      sqlText = `
          INSERT INTO todos
              (text)
              VALUES ($1);
      `;
      pool.query(sqlText, [text])
   
    .then((dbRes) => {
        console.log('new row!', dbRes);
        res.sendStatus(200);
    })
    .catch((dbErr) => {
        console.log('error', dbErr);
        res.sendStatus(500);
    })
});

    // PUT
    // DELETE

module.exports = router;
