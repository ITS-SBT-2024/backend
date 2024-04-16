const fs = require("fs").promises;

let UserDB=[]; 

class Users {
    static async loadUserDB (){
        try {
            const fileContent=await fs.readFile('data/userdb.json');
            
            UserDB=JSON.parse(fileContent);
            console.log("Caricato User1:",UserDB);
        } catch (err){
            console.log("ERRORE Lettura UserDB: "+err);
            
            UserDB=[] ;
            console.log("Caricato User2:" , UserDB);
        }
    };

    static async saveUserDB(){
        try {
            await fs.writeFile('data/userdb.json', JSON.stringify(UserDB,null,4));
        } catch (err){
            console.log("ERRORE Scrittura UserDB: "+err);
        }    
    };

    static getUser (user,password){
        let found=null;
        console.log("UserDB.length=" +UserDB.length);
        console.log("Caricato User:" ,UserDB);
        UserDB.forEach (u => {
            console.debug("username="+ u.username + " password" + u.password);
            if (u.username == user && u.password==password) {
                found=u;
            } 
        });
        return found;
    }
}
module.exports = Users;