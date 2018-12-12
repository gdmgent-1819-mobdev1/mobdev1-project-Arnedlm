import { compile } from 'handlebars';
import update from '../helpers/update';


// Import the template to use
const signupTemplate = require('../templates/signup.handlebars');

const { getInstance } = require('../firebase/firebase');

const firebase = getInstance();

const f = require('../functions');

export default () => {
  // Data to be passed to the template
  const user = 'Test user';

  
  
  // Return the compiled template to the router
  update(compile(signupTemplate)({ user }));

  //code
  document.getElementById("submitBtn").addEventListener("click", () => {
    f.signup(firebase)
  });
  

};