var firebaseConfig = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

firebaseConfig.initializeApp({
    credential: firebaseConfig.credential.cert(serviceAccount)
});

module.exports = firebaseConfig