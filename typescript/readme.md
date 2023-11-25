## Create the **tsconfig.json**

```
tsc --init
```
That creates the config file for typescript.
There you can active many options to work with your project. For example:

- Strict typing = true.
- Select the version of javascript and more.

So you can convert javascript in something more strict to avoid errors, easy to read and maintain.

## Compile -> Transpile my .ts file 
Here this command convert your ts file into standard js

```
tsc app.ts
```
But that can be tired to execute in every ts file, so thankfully with the **tsconfig.json** we can avoid to do that process 
manually with just executing this command.
```
tsc
```

**That was still boring to run and transpile executing the tsc command in every change**

There is another option, to automate this process.

Typescript has a **watcher mode** to detect any change, so execute any of these commands

```
tsc -watch or tsc -w
```
Also useful to detect errors in console terminal 




