const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');

const storage = new Storage({
  keyFilename: './helpers/e20-project-google-service.json',
  projectId: 'e20-project',
});

const bucket = storage.bucket('e20-bucket');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // no larger than 50mb
  },
});

const uploadHandler = multer.single('file');

const uploadToGCS = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const gcsFileName = `${Date.now()}-${req.file.originalname}`;
  const file = bucket.file(gcsFileName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on('error', (e) => {
    req.file.cloudStorageError = e;
    next(e);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsFileName;
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsFileName);
      next();
    });
  });

  stream.end(req.file.buffer);
};

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${bucket.name}/${filename}`;
}

module.exports = {
  uploadHandler,
  uploadToGCS,
};
