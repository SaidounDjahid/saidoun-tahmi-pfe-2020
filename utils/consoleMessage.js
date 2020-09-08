//Ce script permet d'afficher des logs dans le terminal lors de l'exe de l'application
//ici on définit les paramètres tels que la couleur des messages (logColor), l'affihage de l'heure 
//et de la date pour la survenue des evenements (erreurs notamment)

//on requiert le module chalk
const chalk = require('chalk');
const { log } = console;
function consoleMessage(type, message, linebreak) {
  const logColor = {
    error: 'redBright',
    info: 'cyanBright',
    viinfo: 'blueBright',
    header: 'yellowBright',
    intro: 'bgBlue'
  };
  const date = new Date();
  const hour = date.getHours();
  const mins = date.getMinutes();
  if (linebreak) log('');
  log(chalk.greenBright(`${hour}:${mins}`) + chalk.magentaBright(' | ') + chalk[logColor[type]](message));
}
//export
module.exports = consoleMessage;
