/* cette route appelée register est chargé de permettre le register */
const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  req.database.collection('users').findOne({ _id:req.body.dni, email: req.body.email}, (err, candidate) => {
    if (err) throw err;
    if (candidate) {
        res.json({success :false, message : "Un votant existe deja avec cet email"})
        return ;
    }
    try {
        req.body._id = req.body.dni;
      req.database.collection('users').insertOne(req.body, (error) => {
        if (error) throw error;
      });
      res.json({ success: true });
    } catch (e) {
      res.json({ success: false });
    }
  });
});
//export
module.exports = router;
