const config = require('config');

const socketPort = config.get('socketPort') || 5001;
const io = require('socket.io').listen(socketPort);
const ss = require('socket.io-stream');

const path = require('path');
const fs = require('fs');

io.on('connection', (socket) => {
  console.log(`socket in laucnhed. Port: ${socketPort}`);
  ss(socket).on('img-about-upload', (stream, data) => {
    const pathForImages = path.resolve(__dirname, config.get('imagesPath'), 'about');
    const filename = path.basename(data.name);
    stream.pipe(fs.createWriteStream(`${pathForImages}/${filename}`));
  });
});
