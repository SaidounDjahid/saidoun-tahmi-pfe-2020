//cette route appelée views permet d'intégrer les vues et notaemment le home 
const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});
//export
module.exports = router;
