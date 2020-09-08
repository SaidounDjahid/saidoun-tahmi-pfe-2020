/* cette route appelée SupprimerCandidat.js est chargé de  permettre a l'admin de supprimer un candidat grace 
a la requete deleteOne */
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    req.database.collection('candidates').deleteOne({_id: req.body._id}, (err, candidat) => {
        if (err) throw err;
        if (candidat) {
            res.json({success :true, candidat})
            return ;
        }
        res.json({success:false});
    });
});
//esport
module.exports = router;
