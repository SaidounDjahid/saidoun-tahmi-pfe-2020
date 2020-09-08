/* cette route appelée adminLogin.js est chargé de récupérer les données d'un admin dans les fins d'une authentification
de ce dernier */

const express = require('express');

const router = express.Router();

/* get admin */
router.post('/', (req, res) => {
  req.database.collection('admin').findOne({ pass:req.body.pass, email: req.body.email}, (err, user) => {
    if (err) throw err;
    if (user) {
        res.json({success :true, user})
        return ;
    }
    res.json({success:false});
  });
});
//export
module.exports = router;
