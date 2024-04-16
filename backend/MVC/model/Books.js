const fs = require("fs").promises;

let BookDB=[];

class Books {
    static async loadBookDB (){
        try {
            const fileContent=await fs.readFile('data/bookdb.json');
            
            BookDB=JSON.parse(fileContent);
            console.log("Caricato1 Book:",  BookDB);
        } catch (err){
            console.log("ERRORE Lettura BookDB: "+err);
            console.log("Caricato Book2:" , BookDB);
            BookDB= [];
        }
    };

    static async saveBookDB(){
        console.log ("Saving BookDb:", BookDB);
        try {
            await fs.writeFile('data/bookdb.json', JSON.stringify(BookDB,null,4));
        } catch (err){
            console.log("ERRORE Scrittura BookDB: "+err);
        }    
    }
    
    static get (id=null){
        if (id === null) {
            return BookDB;
        }
        let found=null;

        BookDB.forEach (u => {
            if (u.id == id) {
                found=u;
            } 
        });
        
        return found;
    }

    static async create (tit, aut){
        const newBook={id: BookDB.length+1, title:tit, author:aut};
        BookDB.push (newBook);  
        await Books.saveBookDB();    
        return  newBook;
    };

    static async delete (id = null){
        if (id === null) {
            BookDB=[];
            await Books.saveBookDB();
            return true;
        }
        let index = -1;
        for (let i=0; i< BookDB.length && index <0; i++){
            if (BookDB[i].id == id) {
                index=i;
            }
        }
        if (index >=0 ){
            BookDB.splice(index,1);
            await Books.saveBookDB();
            return true;
        } else {
            return false;
        }    
    };

    static async update (id,tit,aut){

        let index = -1;
        for (let i=0; i< BookDB.length && index <0; i++){
            if (BookDB[i].id == id) {
                index=i;
            }
        }
        if (index >=0 ){
            if (tit) {
                BookDB[index].title=tit;
            };
            if (tit) {
                BookDB[index].author=aut;
            };
            await Books.saveBookDB();
            return BookDB[index];
        } else {
            return false;
        }    
    };


}
module.exports = Books;