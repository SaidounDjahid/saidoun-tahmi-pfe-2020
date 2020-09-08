/* cette route appelée AjouterCandidat.js est chargé de permettre a l'admin d'ajouter un nouvel candidat
candidat */
const express = require('express');
const router = express.Router();
router.post('/', (req, res) => {
    if (!req.files['img'] || !req.body.name || !req.body._id || !req.body.house){
        res.json({success:false});
        return;
    }
    req.body.img = req.files['img'].data;
    req.body._id= parseInt(req.body._id);
    req.body.votes = 0;
    req.database.collection('candidates').insertOne(req.body, (err, candidat) => {
        if (err) throw err;
        if (candidat) {
            res.json({success :true, candidat})
            return ;
        }
        res.json({success:false});
    });
});
//export
module.exports = router;
