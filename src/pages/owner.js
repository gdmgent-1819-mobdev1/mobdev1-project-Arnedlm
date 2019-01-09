import handlebars, { compile } from 'handlebars';
import update from '../helpers/update';

// Import the template to use
const ownerTemplate = require('../templates/owner.handlebars');

const { getInstance } = require('../firebase/firebase');

const firebase = getInstance();
//Import functions file
const functions = require('../functions');

export default () => {
    //Check user rights
    functions.checkUserRights("owner");

    //Update header
    const header = require('../partials/header.handlebars');
    handlebars.registerPartial('header', compile(header)({title: 'Dashboard'}));

    //Compile template
    update(compile(ownerTemplate)({}));  

    
    
    
    let koten = [];
    const db = firebase.database().ref('userPosts/');
    db.on('value', (snapshot1) => {
      snapshot1.forEach((elem) => {
        const database = firebase.database().ref('koten/');
        database.on('value', (snapshot2) => {
          snapshot2.forEach((data) => {
            firebase.auth().onAuthStateChanged(function(user) { 
              if(user.uid == elem.val()){
                let kotId = data.key;
                console.log(data.key);
                console.log(elem.key);
                  if(elem.key == kotId){
                
                    koten.push(data.val());
                    console.log(koten);
                    
                    update(compile(ownerTemplate)({koten}));
                    //Show name of user
    functions.showUserInfo(document.getElementById("user_info"));

                    //Make navigation
                    //Push links
                    document.getElementById('myLinks').innerHTML ="<a href='' data-navigo>Berichten</a>";
                    //Click event menu
                    document.getElementsByClassName("icon")[0].addEventListener("click", () => { functions.menuClickFunction(); });

                    //Show form
                    document.getElementById("addBtn").addEventListener("click", () => { document.getElementById("kot_form").style.display = "block"; console.log("shit happens") })
                    //Add kot to database
                    document.getElementById("submitBtn").addEventListener("click", () => { functions.addKot(); });
                  }
              }
            })
          })      
        })
      })
    })
    
  };