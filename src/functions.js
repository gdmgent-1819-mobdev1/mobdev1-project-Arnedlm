//Import navigo(navigator)
import Navigo from 'navigo';
const router = new Navigo(window.location.origin, true);

//Import firebase
const { getInstance } = require('./firebase/firebase');
const firebase = getInstance();

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1IjoiYXJuZWRsbSIsImEiOiJjam5qMGVicmswaXlnM3F0ZGkxbm1lZGVyIn0.HjeTPd9BEQ3Qf2JFLUHSqA' });

//Import classes
const classes = require('./classes');

//global variables
let arrayCoordinates = [];
let newKotId = 33448;

//Sign up form validation
export function validateSignupForm() {
  let fname = document.getElementById("signup_fname");
  fname.addEventListener("input", function (event) { !fname.validity.valid ? fname.className = "error" : fname.className = "" }, false);
  
  let name = document.getElementById("signup_name");
  name.addEventListener("input", function (event) { !name.validity.valid ? name.className = "error" : name.className = "" }, false);

  let address = document.getElementById("signup_address");
  address.addEventListener("input", function (event) { !address.validity.valid ? address.className = "error" : address.className = "" }, false);

  let phone = document.getElementById("signup_phone");
  phone.addEventListener("input", function (event) { !phone.validity.valid ? phone.className = "error" : phone.className = "" }, false);
}

//Sign up
export function signup() {
  let email = document.getElementById("signup_email").value;
  let password = document.getElementById("signup_password").value;
  let fname = document.getElementById("signup_fname").value;
  let name = document.getElementById("signup_name").value;
  let address = document.getElementById("signup_address").value;
  let phone = document.getElementById("signup_phone").value
  let school = document.getElementById("signup_school").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (response) {
      sendNotification('Thanks for signing up to our website! Check your e-mail for account verification!');
      sendVerificationEmail(response.user);
      writeUserData(response.user.uid, fname, name, address, phone, email, school);
    })
    .catch(function (error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode, errorMessage);
      document.getElementById('signup_error').innerHTML = errorCode + " - " + errorMessage;
    });
}
//Login
export function login() {
  let email = document.getElementById("login_email").value;
  let password = document.getElementById("login_password").value;
  let key;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (response) {
      sendNotification('You are now logged in successfully!');
      key = response.user.uid;
  })
    .catch(function (error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode, errorMessage);
    document.getElementById("login_error").innerHTML = errorCode + " - " + errorMessage;
  });
  let userRef = firebase.database().ref('users/');
  userRef.on('value', function (snapshot) {
    snapshot.forEach(function (data) {
      if(key == data.key){
        let school = data.val().school;
        if(school == 'noStudent'){
          router.navigate('/kotbaas');
        }     
        else {
          router.navigate('/student');
        }
      }
    });
  });
}
//Write data to firebase
function writeUserData(userId, fname, name, address, phone, email, school) {
  if(school == 'noStudent'){
    let gebruiker = new classes.Kotbaas(fname, name, address, email, phone);
  }     
  else {
    let gebruiker = new classes.Student(fname, name, address, email, phone, school);
  }

  firebase.database().ref('users/' + userId).set(gebruiker);
}
//Check if a user is logged in and his rights
export function checkUserRights(page){
  firebase.auth().onAuthStateChanged(function(user) {
    let userRef = firebase.database().ref('users/');

    userRef.on('value', function (snapshot) {
      snapshot.forEach(function (data) {
        if (user) {
          if(user.uid == data.key){
            let school = data.val().school;
            if(school == 'noStudent' && page != "owner"){
              router.navigate('/kotbaas');
            }
            else if(school != 'noStudent' && page != "student") {
              router.navigate('/student');           
            }
          }
        } else {
          router.navigate('/');
        } 
      });
    }); 
  })
} 
//Send verification email
function sendVerificationEmail(user) {
    user.sendEmailVerification()
      .then(function () {
      // Email sent.
      document.getElementsByTagName('form')[0].reset();
    }).catch(function (error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
  
      console.log(errorCode, errorMessage);
    });
}
export function requestNotificationPermission() {
  if (Notification && Notification.permission === 'default') {
    Notification.requestPermission(function (permission) {
      if (!('permission' in Notification)) {
        Notification.permission = permission;
      }
    });
  }
}
//Send notification
function sendNotification(msg) {
  let notif = new Notification(msg);
}
//Fetch data from datatank
export function fetchAPI(){
  fetch('https://datatank.stad.gent/4/wonen/kotatgent.json')
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      
      addArraytoDatabase(data);
    })
    .catch(function(error){
      console.error('Fail:', error)
    });
}
//Add data from datatank to database
function addArraytoDatabase(array){
  array.forEach((elem) => {
    
    let kot = new classes.Kot(elem.Huurprijs, elem.Waarborg, elem.Type, elem.Oppervlakte, elem.Verdieping, elem["Privé toilet"], elem["Privé douche"], elem["Privé keuken"], elem.Opties, elem.Straat + " " + elem.Huisummer, elem.Plaats);
    let kotId = elem["Kot revisie id"];
    addCoordinates(kotId, kot.adres);
    
    firebase.database().ref('koten/' + kotId).set(kot);
  })


}
//Show name of user
export function showUserInfo(userInfo){
  firebase.auth().onAuthStateChanged(function(user) {
    let userRef = firebase.database().ref('users/');
    userRef.on('value', function (snapshot) {
      snapshot.forEach(function (data) {
        if (user) {
          if(user.uid == data.key){
            console.log(data.val());
            userInfo.innerHTML = data.val().firstName + "(<a id='logout' href='' >Uitloggen</a>)"
            document.getElementById('logout').addEventListener("click", () => {firebase.auth().signOut(); router.navigate("/");});
            
          }
        }
      });
    }); 
    
    
  })
}
//Get coordinates from addresses
function addCoordinates(id, location){
  let kotenRef = firebase.database().ref().child("koten/" + id);
  let hopperRef = kotenRef.child("koten");

  geocodingClient
          .forwardGeocode({
            query: location,
            limit: 1
          })
          .send()
          .then(response => {
            const match = response.body;
            let coordinates = match.features[0].geometry.coordinates;
            
            kotenRef.update({
              coordinates: coordinates
            });
            
          });
}
//Add markers to map
export function addMarkers(mapboxgl, map){
  const database = firebase.database().ref('/koten');
    database.once('value', (snapshot) => {
      let koten = snapshot.val();
      for(let key in koten){
        let x = koten[key]
        let popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML('<p>' + x.straat + '</p><a href="/detail?id=' + key + '" data-navigo>Meer info</a>');
        var el = document.createElement('div');
        el.id = 'marker';
        let marker = new mapboxgl.Marker()
          .setLngLat(x.coordinates)
          .setPopup(popup)
          .addTo(map);
      }
    })
        
}
export function addKot(){
  let straat = document.getElementById('kot_straat').value;
  let plaats = document.getElementById('kot_plaats').value;
  let huurprijs = document.getElementById('kot_huurprijs').value;
  let waarborg = document.getElementById('kot_waarborg').value;
  let type = document.getElementById('kot_type').value;
  let opp = document.getElementById('kot_opp').value;
  let verdieping = document.getElementById('kot_verdieping').value;
  let toilet = document.getElementById('kot_toilet').value;
  let douche = document.getElementById('kot_douche').value;
  let keuken = document.getElementById('kot_keuken').value;
  let meubels = document.getElementById('kot_meubels').value;
  
  let kot = new classes.Kot(huurprijs, waarborg, type, opp, verdieping, toilet, douche, keuken, meubels, straat, plaats);
  
  firebase.database().ref('koten/' + newKotId).set(kot);
  firebase.auth().onAuthStateChanged(function(user) { 
    firebase.database().ref('userPosts/' + user.uid).set(newKotId);
  })
  sendNotification("Uw kot werd succesvol toegevoegd!");
  document.getElementById("kot_form").reset();
  newKotId++;
}
export function menuClickFunction() {
  let myLinks = document.getElementById("myLinks");
  if (myLinks.style.display === "block") {
    myLinks.style.display = "none";
  } else {
    myLinks.style.display = "block";
  }
}
export function returnClickFunction(){
  router.navigate('/student');
}
export function addDataToSearchGame(){
  const database = firebase.database().ref('/koten');
    database.on('value', (snapshot) => {
      let koten = snapshot.val();
      console.log(koten);
      
      snapshot.forEach((elem) => {
        console.log(elem.val().straat);
 
        
      })
    })
} 