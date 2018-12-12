import { compile } from 'handlebars';
import update from '../helpers/update';

// Import the template to use
const ownerTemplate = require('../templates/owner.handlebars');
const header = require('../partials/header.handlebars');

const f = require('../functions');

export default () => {
    // Data to be passed to the template
    const user = 'Test user';

    //Check user rights
    f.checkUserRights("owner");
    f.showUserInfo
    //Update header
    const header = require('../partials/header.handlebars');
    update(compile(header)({title: 'Dashboard'}));

    // Return the compiled template to the router
    update(compile(ownerTemplate)({}));
  
    let userInfo = document.getElementById("user_info");
    f.showUserInfo(userInfo);
    //code
    document.getElementById("submitBtn").addEventListener("click", () => {
      f.addKot();
    })
  };