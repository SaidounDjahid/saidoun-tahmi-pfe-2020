/* cette route appelée modify.js est chargé de permettre a un user de modifier ses données grace a des requetes upadte sur la base de données */
const express = require('express');
const router = express.Router();
router.post('/', (req, res) => {
    console.log(req.body)
  req.database.collection('users').update({ _id:req.body._id}, req.body, (err,user) => {
    if (err) throw err;
    if (user) {
        console.log("YES")
        console.log(user)
        res.json({success :true, user :req.body})
        return ;
    }
    res.json({success:false});
      });
});
//export
module.exports = router;
