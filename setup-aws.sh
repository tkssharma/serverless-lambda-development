install node js 

setup serverless-user and give access to lambda admin access on AWS 

```bash
npm install -g serverless 
```

```bash
serverless config cradentials --provider aws --key XXX --secret XXX --profile serverless-user
```
0. Create first Lambda using Node JS "Hello World"

```bash
sls create --template aws-nodejs --path lambda
```

1. deploy lambda 

```bash

sls deploy -v 
sls invoke -f fun-name -l
-- update lambda and deploy --
sls deploy function -f fun-name
sls invoke -f fun-name -l
sls logs -f fun-name -t
sls remove 
remove user manually 
```
2. update/Invoke  lambda 
3. Check logs Lambda
4. remove lambda 
5. remove stack 
6. remove User 