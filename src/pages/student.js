import handlebars, { compile } from 'handlebars';
import update from '../helpers/update';

//Import functions file
const functions = require('../functions');

// Import the template to use
const kotenTemplate = require('../templates/student.handlebars');

export default () => {  
    //Check user
    functions.checkUserRights("student");  

    //Update header
    const header = require('../partials/header.handlebars');
    handlebars.registerPartial('header', compile(header)({title: 'Dashboard'}));

    // Return the compiled template to the routes
    update(compile(kotenTemplate)());

    //Make navigation
    //Push links
    document.getElementById('myLinks').innerHTML ="<a href='/zoeken' data-navigo>Zoeken</a><a href='/lijst' data-navigo>Lijst</a><a href='/map' data-navigo>Kaart</a>";
    //Click event menu
    document.getElementsByClassName("icon")[0].addEventListener("click", () => { functions.menuClickFunction(); });

    //Get data from datatank and check for updated data
    functions.fetchAPI();

    //Show user info
    let userInfo = document.getElementById("user_info");
    functions.showUserInfo(userInfo);
    
    
};