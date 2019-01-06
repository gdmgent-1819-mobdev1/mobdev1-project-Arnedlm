import { compile } from 'handlebars';
import update from '../helpers/update';
import { validateSignupForm } from '../functions';

// Import the template to use
const signupTemplate = require('../templates/signup.handlebars');

const f = require('../functions');

export default () => {
  // Data to be passed to the template
  const user = 'Test user';

  
  
  // Return the compiled template to the router
  update(compile(signupTemplate)({ user }));

  //code
  document.addEventListener("input", () => { validateSignupForm(); })

  document.getElementById("submitBtn").addEventListener("click", (e) => {
    e.preventDefault();
    f.signup()
  });
  

};