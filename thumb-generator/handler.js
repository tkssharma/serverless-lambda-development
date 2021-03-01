const fs = require('fs');
const Jimp = require('jimp');

const AWS = require('aws-sdk');
const S3 = new AWS.S3();

module.exports.mediaHandler = async (event) => {
	let bucket = event.Records[0].s3.bucket.name;
	let key = event.Records[0].s3.object.key;

	let request = key.split('/');
	let newKey = `${request[0]}/thumbnails/${request[1]}`;

	const viewUrl = await S3.getSignedUrl('getObject', {
		Bucket: bucket,
		key: key,
		Expires: 600
	});

	const myimage = await Jimp.read(viewUrl);
	const bufferData = await myimage.cover(250, 250).quality(60).getBufferAsync('image/' + 'png');

	const params = {
		Bucket: bucket,
		key: newKey,
		Body: bufferData,
		ACL: 'public-read',
		ContentType: 'image/png'
	};

	const result = await S3.upload(params).promise();
	return result;
};
