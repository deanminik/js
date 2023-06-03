This Node.js code exports two functions, **showMenu** and **pause**, as an object. Here's the documentation for each function:

1. **showMenu**: This function displays a menu with options and prompts the user to select an option. It returns a promise that resolves with the selected option.

   - **Parameters:** None
   - **Returns:** A Promise that resolves with the selected option.

**Example usage**:

```
showMenu()
  .then(option => {
    console.log('Selected option:', option);
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
```
2. **pause**: This function pauses the execution and waits for the user to press the ENTER key. It returns a promise that resolves when the user presses ENTER.

   - **Parameters:** None
   - **Returns:** APromise that resolves when the user presses ENTER.

**Example usage**:

```
pause()
  .then(() => {
    console.log('Execution resumed.');
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });

```

Both functions use the **readline** module to handle user input from the command line interface (CLI). They create an interface to read input from **process.stdin** and write output to **process.stdout.**

The **colors** module is also required, which adds color to the console output. The green color is used to emphasize the menu options and the "ENTER" text.

To use these functions in another module or file, you can import them as follows:

```
const { showMenu, pause } = require('./path/to/module');
```


