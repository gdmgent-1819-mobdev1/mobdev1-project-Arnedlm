// Only import the compile function from handlebars instead of the entire library
import handlebars, { compile } from 'handlebars';
import update from '../helpers/update';
import { forEach } from 'gl-matrix/src/gl-matrix/vec2';
import { addDataToSearchGame, nextKot, addToFavorites } from '../functions';

const { getInstance } = require('../firebase/firebase');

const firebase = getInstance();

// Import the template to use
const searchTemplate = require('../templates/search.handlebars');

const functions = require('../functions');

export default () => {
  //Update header
  const header = require('../partials/header.handlebars');
  handlebars.registerPartial('header', compile(header)({title: 'Search game'}));
 
  // Return the compiled template to the router
  update(compile(searchTemplate)());

  //Make navigation
  //Push links
  document.getElementById('myLinks').innerHTML ="<a href='/student' data-navigo>Dashboard</a><a href='/lijst' data-navigo>Lijst</a><a href='/map' data-navigo>Kaart</a>";
  //Click event menu
  document.getElementsByClassName("icon")[0].addEventListener("click", () => { functions.menuClickFunction(); });

  //Add data of database to the game
  addDataToSearchGame();
  let n = 0;
  document.getElementById("likeBtn").addEventListener("click", () => {
    nextKot(n);
    addToFavorites(n);
    n++;
  })
  document.getElementById("dislikeBtn").addEventListener("click", () => {
    nextKot(n);
    n++;
    dislike++;
  })

};
