# What are controllers?

The controllers are just simple functions that are going to be called eventually. 

Normally our controller receive requests and responses as an arguments.

In this case we are using Typescript, so if you go to this file -> /11-ts-REST-server/tsconfig.json and check 
the property "strict": true, on the line 85, this means that we should add "typing" to properties or variables 

Like this
```
const getUsers = (req: Request, res:Response)  =>{

}
```