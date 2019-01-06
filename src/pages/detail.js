// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';

// Import the template to use
const detailTemplate = require('../templates/detail.handlebars');

const functions = require('../functions');

export default () => {
  // Data to be passed to the template
  functions.requestNotificationPermission();

  
  // Return the compiled template to the router
  update(compile(detailTemplate)());

  
};
