//déclaration de l'objet candidates 
// l'objet candidates est un 1 array ou chaque case est un object litterals ( sorte d'enregistrement )
//propre a js
// chaque object litterals possède les propriétés suivantes ! 
// name: , 
// house: ( parti), 
//img: le nom de l'image  du candidat ! 
const candidates = [
  {
    name: 'Abdelmadjid Tebboune',
    house: 'FLN',
    img: 'daenerys'
  },
  {
    name: 'Sidali Hamraoui',
    house: 'RCD',
    img: 'tyrion'
  },
  {
    name: 'Nassira Bekhti',
    house: 'MJC',
    img: 'cersei'
  },
  {
    name: 'Hamza Yacoub',
    house: 'Ansar El Djazaïr',
    img: 'jonsnow'
  },
  {
    name: 'Farida Benghali',
    house: 'UDS',
    img: 'sansa'
  },
  {
    name: 'Hassen yahiaoui',
    house: 'FFS',
    img: 'nightking'
  },
  {
    name: 'Vote Blanc',
    house: '',
    img: 'blanc'
  }
];

// fonction d'insertion des candidats dans la base de données
// on crée la collection candidates dans la base de données election et on insère les candidats ! 
// a chaque insertion d'un nouveau candidat, l'index du candidat est incrémenté de 1.
//Cette fonction est appelée dans index.js avec comme paramètre db notre base election 
function setCandidates(db) {
  candidates.forEach((candidate, index) => {
    db.collection('candidates')
      .updateOne(
        { _id: (index + 1) },
        {
          $setOnInsert: {
            name: candidate.name,
            house: candidate.house,
            img: candidate.img,
            votes: 0
          }
        },
        { upsert: true }
      );
  });
}
//exportation du module 
module.exports = setCandidates;
