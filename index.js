//index.js index de l'application 
//lancer $ node index.js 
//ou $ MONGO=CLOUD node index.js pour un déploiement de la base sur le cloud atlas 
//ou $ MONGO=LOCAL node index.js pour un déploiement local de la base ( mongo doit etre installé sur la machine)
//import des modules : mongodb, react, express-fileupload, assert,, cors ,death, morgan ...
const express = require('express');
const { MongoClient } = require('mongodb');
const assert = require('assert');
const register = require('@react-ssr/express/register');
const cors = require('cors');
const onTerminationSignal = require('death');
const httpLogger = require('morgan');
const log = require('./utils/consoleMessage');

// Les modules Endpoints ou points finaux 
const viewsRouter = require('./routes/views');
const candidatesRouter = require('./routes/candidates');
const voterRouter = require('./routes/voter');
const voteRouter = require('./routes/vote');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const checkVoteRouter = require('./routes/checkVote');
const modifyRouter = require('./routes/modify');
const adminLoginRouter = require('./routes/adminLogin');
const AjouterCandidatRouter = require('./routes/AjouterCandidat');
const SupprimerCandidatRouter = require('./routes/SupprimerCandidat');
const setCandidates = require('./db/setCandidates');
const bodyParser = require('body-parser');
var fileUpload = require('express-fileupload') ;

//démarrage d'une nouvelle instance express appelée app 
const app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(httpLogger('dev'));
app.use(express.static('public'));

//connexion avec la base mongodb en local sur le port 27017 ou sur le cloud atlas mongodb sur le cluster0 : nom de l'admin de la base : admin, password de la base : admin 
const mongodbType = process.env.MONGODB === 'LOCAL'
  ? 'mongodb://localhost:27017/election'
  : 'mongodb://admin:admin@cluster0-shard-00-00.zw2rz.mongodb.net:27017,cluster0-shard-00-01.zw2rz.mongodb.net:27017,cluster0-shard-00-02.zw2rz.mongodb.net:27017/election?ssl=true&replicaSet=atlas-e5stlm-shard-0&authSource=admin&retryWrites=true&w=majority';

log('info', 'Connexion de l\'application avec MongoDB...');
MongoClient.connect(`${mongodbType}`, { useUnifiedTopology: true }, (err, mongodb) => {
  assert.equal(null, err);

  //déclaration de la base de données election
  const db = mongodb.db('election');

  //insertion des candidats -> call to the function setCandidates( db->setCandidtes.js -> setCandidates(<databaseName>))
  setCandidates(db);
  log('info', 'Connexion établie');
  (async () => {
    log('info', 'Etablissement des routes et des vues ( Views )  '); 
    await register(app);
    app.use('/', viewsRouter);
    app.use('/candidates', (req, res, next) => {
      req.database = db;
      next();
    }, candidatesRouter);
    app.use('/voter', (req, res, next) => {
      req.database = db;
      next();
    }, voterRouter);
    app.use('/vote', (req, res, next) => {
      req.database = db;
      next();
    }, voteRouter);
    app.use('/register', (req,res,next)=>{
      req.database=db;
      next()
    }, registerRouter);
    app.use('/login', (req,res,next)=>{
      req.database=db;
      next()
    }, loginRouter);
    app.use('/checkVote', (req,res,next)=>{
      req.database=db;
      next()
    }, checkVoteRouter);
    app.use('/modify', (req,res,next)=>{
      req.database=db;
      next()
    }, modifyRouter);
    app.use('/adminLogin', (req,res,next)=>{
      req.database=db;
      next()
    }, adminLoginRouter);
    app.use('/AjouterCandidat', (req,res,next)=>{
      req.database=db;
      next()
    }, AjouterCandidatRouter);
    app.use('/supprimerCandidat', (req,res,next)=>{
      req.database=db;
      next()
    }, SupprimerCandidatRouter);
    log('info', 'Fait.');

    //application en écoute sur le port 3000 en local 
    app.listen(3000, () => {
      log('header', `DÉMARRAGE DE L'APPLICATION SUR LE PORT ${process.env.PORT || 3000}`, true);
    
      log('header', 'ENDPOINTS', true);
      log('info', 'GET  | /');
      log('info', 'GET  | /candidates');
      log('info', 'GET  | /voter');
      log('info', 'POST | /vote');
    });
  })();

  //Ctrl+c ou autre raccourci -> signal de terminaisaison de l'exe de l'app
  onTerminationSignal(() => {
    log('info', 'Fermeture de la connexion à la base de données', true);
    mongodb.close();
    log('info', 'Fermé');
    log('info', 'Terminaison du processus...');
    process.exit();
  });
});
