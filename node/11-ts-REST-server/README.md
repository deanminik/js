# Start a project 

## If you want you can install typescript Globally 

```
npm i -g typescript
```

## Check version 

```
tsc --version 
```

# Initialize npm project 

```
npm init -y 
```

## Configure node for TypeScrip

So here we are going to use a compiler 

```
tsc --init
```

That will create a a tsconfig.json file. 

Then open the file and uncomment the following commands below:

"outDir": "./", and add (dist) Example:  "outDir": "./dist",    

"sourceMap": true, -> this is to identify error executed in typescript 

"moduleResolution": "node10", 

## Test Typescript 

Close the tsconfig.json and all terminal related. Then run this command

```
tsc
```
### If you get the following error:

No inputs were found in config file '/home/linuxlite/Documents/js/js/node/11-ts-REST-server/tsconfig.json'. Specified 'include' paths were '["**/*"]' and 'exclude' paths were '["./dist"]'.

Do this:
Create a app.ts before to run tsc command 

Then you'll see the dist directory with app.js and app.js.map files 

so tsc read all changes and add them into the app.js 


## Add additional rules 

### Dev dependencies 

```
npm i tslint --save-dev
```

Then is necessary to install typescript inside the project despite we already installed typescript globally before 

```
npm i typescript --save-dev
```

Create tslint config file, so we need to point to node_modules/.bin/tslint 

```
./node_modules/.bin/tslint --init

So open the file, and we are going to add the rule of do not show me errors when I use the console terminal 
   "no-console": false

Like this:
```
{
    "defaultSeverity": "error",
    "extends": [
        "tslint:recommended"
    ],
    "jsRules": {},
    "rules": {
        "no-console": false
    },
    "rulesDirectory": []
}
```   

## Compile with tsc command to check if everything is working correctly 

```
tsc
```
and 
```
node dist/app.js 
```

## Install express | cors | dotenv

```
npm i express cors dotenv
```


## Run project

First, compile the ts files to the js version, this is to read ts files and add the changes to the app.js file 
Open a different terminal

```
tsc --watch
```

Then go to de dist directory and run nodemon app

```
nodemon dist/app.js
```


## There is another option if you want to run just one command 

Install this package 

```
npm install -g concurrently
```
Then go to the package.json and add this script 

"dev": "concurrently --kill-others \"tsc -w\" \"nodemon dist/app.js\""

Finally open the terminal and run this command

```
npm run dev
```

If you get the error like the port is taken, just close the terminal and open a new one 