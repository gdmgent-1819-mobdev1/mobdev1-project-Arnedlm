// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';

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
  const title = 'Firebase calls example';
  // Return the compiled template to the router
  update(compile(listTemplate)({ title, loading, koten }));

  if (firebase) {
    // firebase.auth().createUserWithEmailAndPassword('test@test.com', 'test333').catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log(errorCode,errorMessage);
    // });
    
    const database = firebase.database().ref('/koten');
    database.on('value', (snapshot) => {
      key = snapshot.key;
      koten = snapshot.val();
      console.log(koten);
      loading = false;   
          
      // Run the update helper to update the template
      update(compile(listTemplate)({ title, loading, koten, key }));
    });
  }
};

