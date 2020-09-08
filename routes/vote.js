/* cette route appelée vote.js est chargé de récupérer  la voix d'un votant et incrémente le nombre de voix du candidat
sélectionné */
const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {  
  req.database.collection('voters').findOne( {_id : req.body.voter.dni, ...req.body.voter},(err,voter)=>{
    if (err)
      throw err;
    if (voter) {
      res.json({alreadyVoted :true, success: false});
      return
    }
    else {
      //recherche du candidat choisi
      req.database.collection('candidates').findOne({ name: req.body.candidate.name }, (err, candidate) => {
        if (err) throw err;
    
        try { //incrementation du nombre de votes de ce candidat pour les fins statistiques
          req.database.collection('candidates').updateOne(
            { _id: candidate._id }, 
            { $set: { votes: candidate.votes + 1 } }
          );
          const model = {
            _id : req.body.voter.dni,
            email : req.body.voter.email,
            dni :req.body.voter.dni
          }
          req.database.collection('voters').insertOne(model , (error) => {
            if (error) throw error;
          });
          res.json({ success: true });
        } catch (e) {
          res.json({ success: false });
        }
      });
    }
  })
  
});
//export 
module.exports = router;
