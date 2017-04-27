// Initialize Firebase
var config = {
  apiKey: 'AIzaSyC615j7Alq-OjhiFjebWQnF-k6NC1EboZc',
  authDomain: 'woofer-e1994.firebaseapp.com',
  databaseURL: 'https://woofer-e1994.firebaseio.com',
  projectId: 'woofer-e1994',
  storageBucket: 'woofer-e1994.appspot.com',
  messagingSenderId: '115998587327'
}
firebase.initializeApp(config)
firebase.auth().signInAnonymously()

// CREATE a new woof in Firebase
function createWoofInDatabase (woof) {
  firebase.database().ref('woofs').push(woof)
}

// READ from Firebase when woofs are added, changed, or removed
// Write a function for each 'on' method and call addWoofRow,
// updateWoofRow, and deleteWoofRow to update the page. Make
// sure to pass the right parameters (hint: these functions are
// defined in woofer-ui.js).
function readWoofsInDatabase () {
  // on method for addWoofRow
  firebase.database().ref('woofs').on('child_added', function (newWoofSnapshot) {
    addWoofRow(newWoofSnapshot.key, newWoofSnapshot.val())
  })

  // on method for updateWoofRow
  firebase.database().ref('woofs').on('child_changed', function (updateWoofSnapshot) {
    updateWoofRow(updateWoofSnapshot.key, updateWoofSnapshot.val())
  })

  // on method for deleteWoofRow
  firebase.database().ref('woofs').on('child_removed', function (deletedWoofSnapshot) {
    deleteWoofRow(deletedWoofSnapshot.key)
  })
}

// UPDATE the woof in Firebase
function updateWoofInDatabase (woofKey, woofText) {
  firebase.database().ref('woofs').child(woofKey).child('text').set(woofText)
}

// DELETE the woof from Firebase
function deleteWoofFromDatabase (woofKey) {
  firebase.database().ref('woofs').child(woofKey).remove()
}

// Load all of the data
readWoofsInDatabase()
