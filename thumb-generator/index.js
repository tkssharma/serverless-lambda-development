'use strict';
const AWS = require('aws-sdk');
const Sharp = require('sharp');
const Bluebird = require('bluebird');


const S3 = new AWS.S3({
  signatureVersion: 'v4',
});

const SOURCE_BUCKET = process.env.SOURCE_BUCKET;
const DESTINATION_BUCKET = process.env.DESTINATION_BUCKET;
const CONCURRENCY = process.env.CONCURRENCY || 1;
const SIZES = process.env.SIZES.split(',').map(size => {
  const [width, height] = size.split('x');

  return {
    width: parseInt(width, 10),
    height: parseInt(height, 10),
  };
});


module.exports.handler = (event, context, callback) => {
  const record = event.Records[0].s3;
  const key =  record.object.key;

  getObject(key)
    .then((data) => resizeAndUploadSizes({ data, key }))
    .then(callback)
    .catch(callback);
};


function getObject(key) {
  return S3.getObject({Bucket: SOURCE_BUCKET, Key: key}).promise();
}


function resizeAndUploadSizes({ data, key }) {
  Bluebird.map(SIZES, function({ width, height }) {
    return resizeAndUpload({ width, height, data, key });
  }, { concurrency: CONCURRENCY })
}


function resizeAndUpload({ size, data, width, height, key }) {
  return resize({ data, width, height })
    .then((buffer) => putObject({ buffer, key, width, height }));
}


function resize({ data, width, height }) {
  return Sharp(data.Body)
    .resize(width, height)
    .background({r: 255, g: 255, b: 255, alpha: 0})
    .embed()
    .toFormat('png')
    .toBuffer();
}


function putObject({ buffer, key, width, height }) {
  return S3.putObject({
    Body: buffer,
    Bucket: DESTINATION_BUCKET,
    ContentType: 'image/png',
    Key: `${width}x${height}/${key}`,
  }).promise();
}
