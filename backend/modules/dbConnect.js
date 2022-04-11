const { MongoClient } = require("mongodb");

const uri = process.env.DBURI;

// const uri = "mongodb://localhost:27017";

let db=null;

function dbConnect() {
    
        const client = new MongoClient(uri);
        client.connect().then((connection)=>{
            db = connection.db('bookMyRoom');
        })
        .catch((error)=>{
            db = null;
        });
};
dbConnect();


function dbClient(command) {
    if (command === "reset") {
        db=null;
    }
    else if (!db) {
        dbConnect();
        return db;

    } else {
        return db;
    }
}

module.exports = dbClient;