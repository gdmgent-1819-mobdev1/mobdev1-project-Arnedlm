// Only import the compile function from handlebars instead of the entire library
import handlebars, { compile } from 'handlebars';

// Import the update helper
import update from '../helpers/update';
import { forEach } from 'gl-matrix/src/gl-matrix/vec2';

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1IjoiYXJuZWRsbSIsImEiOiJjam5qMGVicmswaXlnM3F0ZGkxbm1lZGVyIn0.HjeTPd9BEQ3Qf2JFLUHSqA' });

const { getInstance } = require('../firebase/firebase');

const firebase = getInstance();

const functions = require('../functions');
// Import the template to use
const listTemplate = require('../templates/list.handlebars');

export default () => {
  // Data to be passed to the template
  let loading = true;
  let koten = {};
  let key;
  // Return the compiled template to the router
  update(compile(listTemplate)({loading, koten }));

  //Update header
  const header = require('../partials/header.handlebars');
  handlebars.registerPartial('header', compile(header)({title: 'Lijst met koten'}));

  if (firebase) {
    //Get data from firebase    
    const database = firebase.database().ref('koten/');
    database.on('value', (snapshot) => {
      koten = snapshot.val();
      console.log(koten);
      loading = false;   
      // Run the update helper to update the template
      update(compile(listTemplate)({ loading, koten, key }));
      document.getElementById('myLinks').innerHTML ="<a href='/student' data-navigo>Dashboard</a>";
      document.getElementsByClassName("icon")[0].addEventListener("click", () => { functions.menuClickFunction()});
    });
  }
  
};