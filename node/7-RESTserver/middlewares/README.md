# For what is this middlewares folder?

Here, we've created all customs middlewares 

Remember: Middlewares are functions that execute before our controllers function. | Also our middlewares are waiting for a request and response

The purpose of our middlewares is to verify according to our customs verifications if everything is correct.


### const { response, request } = require('express');

To have the typing, this is better if we are not working with typescript


### next();

If we can arrive here, please go to next middleware for example in user.route we see this | check('email', 'The email is not valid').isEmail() so if everything is ok go next to this    check('name', 'The name is required').not().isEmpty() etc...
When there are not more middlewares then execute the controller, for example usersPost