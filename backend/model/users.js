

const userDB=[
    {
        username:"maurizio",
        password:"123",
        nome:"Maurizio D'Ottavi"
    },
    {
        username:"gigi",
        password:"345",
        nome:"Pierluigi Alessandrini"
    },
    {
        username:"bill",
        password:"678",
        nome:"William Shakespeare"
    },
];

class Users {
    static getUser (user,password){
        let found=null;
        userDB.forEach (u => {
            if (u.username == user && u.password==password) {
                found=u;
            } 
        });
        return found;
    }
}
module.exports = Users;