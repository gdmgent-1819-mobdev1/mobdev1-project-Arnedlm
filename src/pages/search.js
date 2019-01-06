// Only import the compile function from handlebars instead of the entire library
import handlebars, { compile } from 'handlebars';
import update from '../helpers/update';
import { forEach } from 'gl-matrix/src/gl-matrix/vec2';
import { addDataToSearchGame } from '../functions';

const { getInstance } = require('../firebase/firebase');

const firebase = getInstance();

// Import the template to use
const searchTemplate = require('../templates/search.handlebars');

const functions = require('../functions');

export default () => {
 
  // Return the compiled template to the router
  update(compile(searchTemplate)());

  //Update header
  const header = require('../partials/header.handlebars');
  handlebars.registerPartial('header', compile(header)({title: 'Search game'}));

  addDataToSearchGame();

};
