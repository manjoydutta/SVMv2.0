const enrolled_voters = document.querySelector("#enrolled-voters");
const votes_polled = document.querySelector("#votes_polled");
const percentage_turnout = document.querySelector("#percentage_turnout");
var ctx = document.getElementById("pieChart").getContext("2d");
var resetButton = document.getElementById("stop-session");

document.getElementById('log-out-btn').addEventListener('click',function(){
    location.replace("../index.html");});
const firebaseConfig = {
  apiKey: "AIzaSyBEwJV2zhRCCGZgEo_39dC1dhr_Vgu45r4",
  authDomain: "voting-log.firebaseapp.com",
  databaseURL: "https://voting-log-default-rtdb.firebaseio.com",
  projectId: "voting-log",
  storageBucket: "voting-log.appspot.com",
  messagingSenderId: "84061766566",
  appId: "1:84061766566:web:0edc65e7c19340eca94567",
  measurementId: "G-5RNWGZDY34"
};
firebase.initializeApp(firebaseConfig);
var firebaseRef = firebase.database().ref('voter');

firebaseRef.on("value", function(snapshot){
    var arr = [];
    var voter_arr = [];
    var flag = [];
    var i=0;
    var n;
    snapshot.forEach(function(element){
        n=arr.push(element.key);
    })
        snapshot.forEach(function(element){
            voter_arr.push(snapshot.child(''+arr[i]).child('voter').val());
            flag.push(snapshot.child(''+arr[i]).child('flag').val());i++;
    })
    enrolled_voters.textContent=i;
    votes_polled.textContent=flag.filter(element => element === 1).length;
    percentage_turnout.textContent=flag.filter(element => element === 1).length/i;
    var pieChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: [ "Voters Voted","Did Not Vote"],
          datasets: [
            {
              label: "# of Votes",
              data: [flag.filter(element => element === 1).length, (i-flag.filter(element => element === 1).length)],
              backgroundColor: [
                "rgba(54, 162, 235, 0.2)","rgba(255, 99, 132, 0.2)"],
            //   borderColor: [
            //     "rgba(54, 162, 235, 1)","rgba(255, 99, 132, 1)"],
            //   borderWidth: 1
            }
          ]
        }
    });
    // var firestore = firebase.firestore();
    resetButton.addEventListener("click", function() {
      var data = {
        name: 2, roll:1
      };
      firebase.database().ref().child("voter/user").update(data);
    //   firestore.collection("voter").doc("user").update({
    //     name: 2,
    //     roll: 30
    // });
  });
});


// // import * as admin from "firebase-admin";
// document.getElementById("stop-session").addEventListener("click",function(){
// // Import the Firebase Admin SDK
// const admin = require("firebase-admin");

// // Initialize the Firebase Admin SDK with a service account

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://voting-log-default-rtdb.firebaseio.com"
// });
// // Get a reference to the database
// const db = admin.database();
// // Set the new database rules
// const rules = {
//   ".read": false,
//   ".write": false
// };
// // Update the database rules
// db.ref().update({ ".settings/rules": JSON.stringify(rules) })
//   .then(() => {
//     console.log("Database rules updated successfully.");
//   })
//   .catch(error => {
//     console.error("Error updating database rules:", error);
//   });
// });