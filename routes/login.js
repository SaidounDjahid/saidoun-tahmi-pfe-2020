/* cette route appelée login.js est chargé du login d'un votant deja inscrit dans la base grace au mail et au Evote (DNI) 
candidat */
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  req.database.collection('users').findOne({ _id:req.body.dni, email: req.body.email}, (err, user) => {
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
