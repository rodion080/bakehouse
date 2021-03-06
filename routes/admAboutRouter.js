const { Router } = require('express');

const router = Router();
const fs = require('fs');
const path = require('path');
const config = require('config');
const sizeOf = require('image-size');
const multer = require('multer');
const AboutContent = require('../models/AboutContent');
// var upload = multer({ dest: 'client/public/images/about' });
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'client/public/images/about');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post('/setaboutcontent', upload.single('image'),
  // ,
  // async (req, res) => {
  // // const candidate = await AboutContent.findOne();
  // try {
  //   // if (!candidate) {
  //   //   const aboutContent = new AboutContent({
  //   //     aboutContent: req.body.aboutContent
  //   //   });
  //   //   await aboutContent.save();
  //   //   res.status(200).json('Completed!');
  //   // }
  //   //
  //   // candidate.aboutContent = req.body.aboutContent;
  //   // await candidate.save();
  //
  //   res.status(200).json('Done!');
  // } catch (e) {
  //   console.log(e);
  //   res.status(500).json({message: 'Something went wrong. Try again.'});
  // }
// }
);

router.post('/updateaboutcontent', async (req, res) => {
  const imagesToUpdateArr = JSON.parse(req.body.imagesToUpdate);
  const aboutContent = JSON.parse(req.body.aboutContent);
  try {
    const candidate = await AboutContent.findOne();
    const pathToCheck = path.join(__dirname, '..', config.get('imagesPath'), 'about');

    fs.readdir(pathToCheck, (err, files) => {
      if (files) {
        files.forEach((file) => {
          if (!imagesToUpdateArr.includes(file)) {
            fs.unlink(path.join(pathToCheck, file), () => {
            });
          }
        });
      }
    });

    if (!candidate) {
      const aboutContentModel = new AboutContent({
        aboutContent: req.body.aboutContent,
      });
      await aboutContentModel.save();
      return res.status(200).json('Done!');
    }
    candidate.aboutContent = aboutContent;
    await candidate.save();

    res.status(200).json('Done!');
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Try again.' });
  }
});

router.post('/getaboutcontent', async (req, res) => {
  try {
    const pathToCheck = path.join(__dirname, '..', config.get('imagesPath'), 'about');
    const imgSizes = [];
    fs.readdir(pathToCheck, (err, files) => {
      if (files) {
        files.forEach((file) => {
          const dimensions = sizeOf(`${pathToCheck}/${file}`);
          imgSizes.push({ width: dimensions.width, height: dimensions.height });
        });
      }
    });

    const candidate = await AboutContent.findOne();
    if (candidate) {
      res.status(200).json({
        aboutContent: candidate.aboutContent,
        imgSizes,
      });
    } else {
      res.status(400).json('');
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Something went wrong. Try again.' });
  }
});

router.post('/correctaboutcontent', async (req, res) => {
  try {
    req.body.imagesToDelete.forEach((imgToDelete) => {
      const pathToCheck = path.join(__dirname, '..', config.get('imagesPath'), 'about');
      fs.unlink(path.join(pathToCheck, imgToDelete), () => {
      });
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
