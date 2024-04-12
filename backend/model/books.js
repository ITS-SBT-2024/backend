const BookDB=[
    {
        id:1,
        title:"The Lord of the Rings",
        author:"J.R.R. Tolkien"
    },
    {
        id:2,
        title:"Le Cronache di Narnia",
        author:"C.S. Lewis"
    },
    {
        id:3,
        title:"I draghi del crepuscolo d'autunno",
        author:"M. Weis & T. Hickman"
    },
    {
        id:4,
        title:"Eragon",
        author:"C. Paolini"
    }
];

class Books {
    static getBook (id){
        let found=null;
        BookDB.forEach (u => {
            if (u.id == id) {
                found=u;
            } 
        });
        return found;
    }
    static createBook (tit, aut){
        userDB.push ({id: BookDB.lenght+1, title:tit, author:aut});       
    }    
}
module.exports = Books;