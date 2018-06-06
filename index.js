var fs = require("fs-extra");

function lireFichier(nomFichier)
{
  fs.readFile(nomFichier, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
  });
}

  fs.emptyDir('temp').then(() => {
    fs.readJSON('pubs.json').then(contenu => {
      fs.outputJson('temp/pub.json', contenu).then(() => {
        lireFichier('temp/pub.json');
        fs.watchFile('temp/pub.json', (curr, prev) => {
          console.log(`the current mtime is: ${curr.mtime}`);
          console.log(`the previous mtime was: ${prev.mtime}`);
          lireFichier('temp/pub.json');
        });
      })
    })
  }).catch(err => {
    console.error(err)
  })

