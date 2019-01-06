import handlebars, { compile } from 'handlebars';
import update from '../helpers/update';

// Import the template to use
const ownerTemplate = require('../templates/owner.handlebars');

//Import functions file
const functions = require('../functions');

export default () => {
    //Check user rights
    functions.checkUserRights("owner");

    //Compile template
    update(compile(ownerTemplate)({}));

    //Update header
    const header = require('../partials/header.handlebars');
    handlebars.registerPartial('header', compile(header)({title: 'Dashboard'}));

    //Make navigation
    //Push links
    document.getElementById('myLinks').innerHTML ="<a href='' data-navigo>Berichten</a>";
    //Click event menu
    document.getElementsByClassName("icon")[0].addEventListener("click", () => { functions.menuClickFunction(); });
    //Show name of user
    functions.showUserInfo(document.getElementById("user_info"));
    //Show form
    document.getElementById("addBtn").addEventListener("click", () => { document.getElementById("kot_form").style.display = "block"; })
    //Add kot to database
    document.getElementById("submitBtn").addEventListener("click", () => { functions.addKot(); });
  };