# NPM PACKAGES

Remember execute this command, when there is an app with npm packages already installed 
But remember you need the package.json 

```
npm install
```

## colors 

This was the version work on the projects 

```
npm install colors@1.4.0

```

## inquirer

```
npm install inquirer@7.3.3
```

## uuid

```  
npm install uuid@9.0.0
```

## nodemon
Nodemon reads changes from only js files, if you need to see changes from other kind of file stop nodemon and reload.
But it is posible to setup nodemon to add another extension to read too. 

```  
npm i nodemon
```

### To run use this command
For example use nodemon app, app is the name of the main file
```  
nodemon namefile 
```


## Having an issue with to get the result of an endpoint like this 
triggerUncaughtException(err, true /* fromPromise */);
            ^
Error: connect ENETUNREACH 2606:4700:20::681a:bd5:443
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1494:16) 

run this linux command

```
sudo service networking restart
```

## NPM dotenv

```
npm i dotenv
```

## Use an environment variable 

```
process.env.nameofyourvariable
```


## To work with web server and Rest server | Framework express
```
 npm i express 
 ```

## CORS 

 ```
npm i cors
 ```


## If everything is done,  to run your project just call nodemon and the main js file 

 ```
nodemon app 
 ```


 ## Typescript project 

/node/11-ts-REST-server/README.md