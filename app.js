var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var Q = require('q');

pastaMeninos = '/public/Meninos'
pastaMeninas = '/public/Meninas'
extensaoImagem = 'png'
var walk = require('walk');

// Walker options
var pegaMeninos = function (callback) {
  var filesMeninos = [];
  var walker = walk.walk('./public/Meninos', { followLinks: false });
  walker.on('file', function (root, stat, next) {
    // Add this file to the list of filesMeninos
    if (stat.name.substr(-3).toLowerCase() === extensaoImagem)
      filesMeninos.push('/Meninos' + '/' + stat.name);
    next();
  });

  walker.on('end', function () {
    console.log(filesMeninos);
    callback(null, filesMeninos)
  });
}

var pegaMeninas = function (callback) {
  var filesMeninas = [];
  var walker = walk.walk('./public/Meninas', { followLinks: false });
  walker.on('file', function (root, stat, next) {
    // Add this file to the list of filesMeninas
    if (stat.name.substr(-3).toLowerCase() === extensaoImagem)
      filesMeninas.push('/Meninas' + '/' + stat.name);
    next();
  });

  walker.on('end', function () {
    console.log(filesMeninas);
    callback(null, filesMeninas)
  });
}

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '../public'));

app.get('/uploadMeninos', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/uploadMeninos.html'));
});

app.get('/uploadMeninas', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/uploadMeninas.html'));
});

app.get('/', function (req, res) {
  Q.nfcall(pegaMeninos)
  .then((meninos)=>{
    return [meninos,Q.nfcall(pegaMeninas)]
  })
    .spread((meninos,meninas) =>
    { res.render('index2', { fotosMeninos: meninos , fotosMeninas: meninas}) }
    );
})

app.post('/uploadMeninos', function (req, res) {

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, pastaMeninos);

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function (field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function (err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function () {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

app.post('/uploadMeninas', function (req, res) {

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, pastaMeninas);

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function (field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function (err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function () {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});
var server = app.listen(3000, function () {
  console.log('Server listening on port 3000');
});
