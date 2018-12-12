import { compile } from 'handlebars';
import update from '../helpers/update';
import mapbox from 'mapbox-gl-geocoder';
import config from '../config';

var Mapbox = require('mapbox-gl-geocoder');

const f = require('../functions');
const kotenTemplate = require('../templates/student.handlebars');

const { getInstance } = require('../firebase/firebase');

const firebase = getInstance();

export default () => {
    // Data to be passed to the template
    const user = 'Test user';

    f.checkUserRights("student");
    
    // Return the compiled template to the routes
    update(compile(kotenTemplate)({ user }));

    f.fetchAPI();

    

    let userInfo = document.getElementById("user_info");
    f.showUserInfo(userInfo);
};