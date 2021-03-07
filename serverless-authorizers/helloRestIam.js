'use strict';

module.exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello IAM, authenticated user identity: ' + event.requestContext.identity.cognitoIdentityId + ' !',
      input: event,
    }),
  };

  callback(null, response);
};
