module.exports.user = (event, context, callback) => {

    if (typeof event.authorizationToken === 'undefined') {
        if (process.env.DEBUG === 'true') {
            console.log('AUTH: No token');
        }
        callback('Unauthorized');
    }

    const split = event.authorizationToken.split('Bearer');
    if (split.length !== 2) {
        if (process.env.DEBUG === 'true') {
            console.log('AUTH: no token in Bearer');
        }
        callback('Unauthorized');
    }
    const token = split[1].trim();
    // custom logic 
    callback(null, generatePolicy('test', 'Allow', event.methodArn));
    //callback(null, generatePolicy('test', 'Deny', event.methodArn));
    // callback('Unauthorized');
}
const generatePolicy = function(principalId, effect, resource) {
	const authResponse = {};
	authResponse.principalId = principalId;
	if (effect && resource) {
		const policyDocument = {};
		policyDocument.Version = '2012-10-17';
		policyDocument.Statement = [];
		const statementOne = {};
		statementOne.Action = 'execute-api:Invoke';
		statementOne.Effect = effect;
		statementOne.Resource = resource;
		policyDocument.Statement[0] = statementOne;
		authResponse.policyDocument = policyDocument;
	}
	return authResponse;
};