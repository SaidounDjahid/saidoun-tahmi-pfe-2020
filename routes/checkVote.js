/* cette route verifie si un user a deja voté ou pas grace a la fonction alreadyVoted*/
const express = require('express');

const router = express.Router();
router.post('/', (req, res) => {
  req.database.collection('voters').findOne({ _id:req.body.id}, (err, voter) => {
    if (err) throw err;
    
    if (voter) {
        res.json({success :false, alreadyVoted:true})
        return ;
    }
        res.json({success :true});
  });
});
//export
module.exports = router;
