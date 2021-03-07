

Serverless Framework application in TypeScript with dependency Lambda layer and functions packaged individually.

# Install

```bash
npm install
```

## Create layers bundle

```bash
mkdir -p layers/common/nodejs
cp package.json layers/common/nodejs
cd layers/common/nodejs
npm install --only=prod
```
## Deploy application on DEV

You need to configure AWS CLI credentials with sufficient access rights

```bash
rm -rf .build
sls deploy -s dev
Or if you want to update only single Lambda:

```bash
sls deploy -s dev -f hello
```
