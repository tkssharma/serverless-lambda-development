# serverless-thumbnails

> Resize images added to a s3 bucket automatically ✨


### Environment Configuration

- `SOURCE_BUCKET=%source%` where you upload the images
- `DESTINATION_BUCKET=%destination%` where the thumbnails are going to be created
- `SIZES=100x100,200x200,300x300,500x500` the thumbnails sizes can be multiple
- `CONCURRENCY=1` the concurrency to be applied in the thumbnails creation


### Running

> It uses native dependency, so it is necessary to be at linux or use the docker image to install the deps

1. `docker-compose run thumbnails`
2. `serverless deploy`


## License

Licensed under <a href="http://krolow.mit-license.org/">The MIT License</a><br />
Redistributions of files must retain the above copyright notice.

## Author

Vinícius Krolow - krolow[at]gmail.com
