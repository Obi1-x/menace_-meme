require('dotenv').config();

var logBox = {};

var admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const { getDatabase, set, child, get } = require('firebase-admin/database');

// Initialize Firebase admin.
//var serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;
//var serviceAccount = require('./meme-menace-firebase-adminsdk-tjdg1-41625b4048.json');
var serviceAccount = {
    "type": "service_account",
    "project_id": "meme-menace",
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_x509_cert_url,
    "client_x509_cert_url": process.env.CLIENT_x509_cert_url
  }

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://meme-menace-default-rtdb.firebaseio.com"
});
serviceAccount = {}


// Retrieve services via the defaultApp variable...
let auth = getAuth();  //app.auth();
let database = getDatabase();  //app.database();








//========================================DB QUERIES.
const getAdmin = async (adminId) => {
    const adminPath = `menaceData/appData/admins/${adminId}/`;

    logBox["lastLog"] = new Date().getTime();
    logBox["refPath"] = adminPath;
    console.log("Admin get path: ", adminPath);

    return database.ref(adminPath);
}

const setAdmin = (adminId, admin) => {
    const adminPath = `menaceData/appData/admins/${adminId}/`;

    logBox["lastLog"] = new Date().getTime();
    logBox["refPath"] = adminPath;
    console.log("Admin set path: ", adminPath);

    return database.ref(adminPath).set(admin);
}




const getUser = async (userId) => {
    const userPath = `menaceData/userData/${userId}/`;

    logBox["lastLog"] = new Date().getTime();
    logBox["refPath"] = userPath;
    console.log("User get path: ", userPath);

    return database.ref(userPath);
}

const setUser = async (user) => {
    const userPath = `menaceData/userData/${user.ID}/`;

    logBox["lastLog"] = new Date().getTime();
    logBox["refPath"] = userPath;
    console.log("User set path: ", userPath);

    return database.ref(userPath).set(user);
}




const getMeme = async (memeIndex) => {}

const setMeme = async (aMeme) => {}


const memePoolSize = async() => {}



module.exports = {
    getUser,
    setUser,
    getAdmin,
    setAdmin,
    getMeme,
    setMeme,
    memePoolSize,
    logBox
};