//const detaDB = require('./detaBASE');
const fbDB = require('./fb_DB');
const dbLogs = fbDB.logBox;

//======================================= SCHEMAs
class UserInfo{
    constructor(user_name, first_name, id) {
        this.userName = user_name;
        this.firstName = first_name;
        this.ID = id;
        this.entryDate = new Date().getTime();
    }
 }

 class AdminInfo{
    constructor(creator) {
        this.dateAssigned = new Date().getTime();
        this.isCreator = creator;
    }
 }

 class Meme{
    constructor(_creator, src, desc){
        this.timeAdded = new Date().getTime();
        this.addedBy = _creator; //Count;
        this.source = src; //Memesource file.
        this.description = desc; //Meme description
    }
 }
 //==================================================== SCHEMAs END.


//=================================== DB QUERIES
const registerUser = (aUser) => {
    const newUser = new UserInfo(aUser.username, aUser.first_name, aUser.id);
    //Main registration
    fbDB.setUser(newUser).then((err) => {
        if (err) {
            dbLogs["Register user"] = "This error occured: " + error;
            console.log("An error occurred");
        }
        else if(!err){
            dbLogs["Register user"] = "User added";
            console.log("User added");
        }
    }).catch((error) => {
        dbLogs["Register user"] = "This error occured: " + error;
        console.log("This error occured: ", error);
    });
}


const verifyUser = async(aUser) => {
    //Get user inform from db.
    const unknownUser = await fbDB.getUser(aUser.id);
    unknownUser.once('value').then(async (snapshot) => {
        if (snapshot.val()) {
            console.log("User data already exists");
            dbLogs["Snapshot"] = snapshot.val();
            console.log("User info: ", snapshot.val());
        } else if (!snapshot.val()) {
            dbLogs["Snapshot"] = "User not detected.";
            console.log("User info: ", snapshot.val());
            registerUser(aUser);
        }
    }).catch((error) => {
        dbLogs["Verify user"] = "This error occured: " + error;
        console.log("This error occured: ", error);
    });
}


const assignAdmin = (adminId, isCreator) => { //Set this manually or get admin data from telegraf API if avaialable.
    fbDB.setAdmin(String(adminId), new AdminInfo(isCreator)).then((err) => {
        if (err) {
            dbLogs["Assigned admin"] = "This error occured: " + error;
            console.log("An error occurred.");
        }
        else if(!err){
            dbLogs["Assigned admin"] = "Admin added.";
            console.log("Admin added.");
        }
    }).catch((error) => {
        dbLogs["Assign admin"] = "This error occured: " + error;
        console.log("This error occured: ", error);
    });
}


const isAdmin = async (adminId) => {
    //Verification from DB.
    console.log("\nLooking for admin");
    const checking = await fbDB.getAdmin(adminId);
    return checking.once('value');
}


const pushMeme = (creator, source, desc_) => {
    var newMeme = new Meme(creator, source, desc_);

    //appData.memes.push(newMeme);
    fbDB.setMeme(newMeme);
}

const popMeme = (index) => {
    //return appData.memes[index];
    return fbDB.getMeme();
}

const getMemePoolSize = () => {
    return fbDB.memePoolSize();
}




/*
const testRetrieve = async () => {
    var aUser = {
        "id": 1355311995,
        "first_name": "Phenomenal",
        "username": "eizeko",
        "type": "private"
    }

    const unknownUser = await fbDB.getUser(aUser.id);
    unknownUser.once('value').then(async (snapshot) => {
        if (snapshot.val()) {
            console.log("User exists");
            dbLogs["Snapshot"] = snapshot.val();
            console.log("User info: ", snapshot.val());
            //fbDB.freeResources();
            return snapshot.val();
        } else if (!snapshot.val()) {
            dbLogs["Snapshot"] = "User not detected.";
            console.log("User info: ", snapshot.val());
            //fbDB.freeResources();
            return "Nothing found";
        }
    }).catch((error) => {
        dbLogs["Verify user"] = "This error occured: " + error;
        console.log("This error occured: ", error);
    });
}

const testSend = () => {
    var theOwner = {
        "id": 1355311995,
        "first_name": "Phenomenal",
        "username": "eizeko",
        "type": "private"
    }
    
    var firstAdmin = {
        "id": 1770541911,
        "first_name": 'Mean',
        "username": 'Chime22',
        "type": 'private'
    }

    registerUser(theOwner);
    
}*/
//=======================================================DB QUERIES END.


//=================================== DB INITs
/*
function initDB(){
    const dummyUser = {
        "id": 1355312007,
        "first_name": "Eminem",
        "username": "slimShady",
        "type": "private"
    }
    registerUser(dummyUser);
}
initDB();

var theOwner = {
    "id": 1355311995,
    "first_name": "Phenomenal",
    "username": "eizeko",
    "type": "private"
}

var firstAdmin = {
    "id": 1770541911,
    "first_name": 'Mean',
    "username": 'Chime22',
    "type": 'private'
}*/

//assignAdmin(theOwner.id, true);
//assignAdmin(firstAdmin.id, false);

//pushMeme(1355311995, "https://picsum.photos/200/300/", "Testing... A beautiful photo.");
//pushMeme(1355311995, "https://twitter.com/Jeyjeffrey1/status/1566504571157053448?s=20", "The excuse of traffic never gets old.");

/*
isAdmin("1355311995").then((anAdmin) => {
    if (anAdmin.val()) { //Is an Admin.
        console.log("\nGotten admin: " + Object.values(anAdmin.val()));
        dbLogs["Snapshot"] = anAdmin.val();
    } else if (!anAdmin) {
        dbLogs["Snapshot"] = "Failed to fetch admin";
        console.log("Failed to fetch admin");
    }
});*/
//=======================================================DB INiTs.


module.exports = {
    verifyUser,
    assignAdmin,
    isAdmin,
    pushMeme,
    popMeme,
    getMemePoolSize,
    dbLogs
}