const Users = require('./Users');
const Books = require('./Books');

async function Loader (){
    console.log("Starting Loader...");
    await Users.loadUserDB();
    console.log("UserDB Loaded...");
    await Books.loadBookDB();
    console.log("BookDB Loaded...");
}
module.exports = Loader;