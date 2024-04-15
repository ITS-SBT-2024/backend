async function action(method,url, data = null) {
    // funzione che viene chiamata dalle varie della View per fare azioni sul server
    console.log ("action running:" + method + " on " + url + " " + data);
    let options={
        method: method, // *GET, POST, PUT, DELETE, etc.                 
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    if (data !== null ){
        options.body=JSON.stringify(data)
    }
    const response = await fetch(url, options);
    if (response.ok){
        return response.json();
    } else {
        if (response.status == 401) {
            console.log("Utente non loggato...");
            document.location="/login.html";
        } else {
            // In caso di altri errori lo notifico all'utente che l'azione non e'
            // andataa bhuon fine...
            alert ("Qualcosa e' andato storto sul server!!! Riprova piu' tardi ;)");
        }
        return null
    }
    ///return response.json(); // parses JSON response into native JavaScript objects
}

async function listBooks (){
    console.log("Listing books...");
    // Funzione che richiede la lista dei libri al serve e li mostra nella finestra
    let booklist="<table border=1 cellspacing=0><tr><th>#</th><th>Titolo</th><th>Azioni</th></tr>";
    let list=await action("GET", "/books");
    let i=0;
    if (list.length>0){
        list.forEach(l => {i++;booklist+="<tr><td>"+i+"</td><td>"+l.title+"</td>"+
            "<td><button onclick='deleteBook("+l.id+")'>Cancella Libro</button>"+
            "<button onclick='showBook("+l.id+")'>Dettagli Libro</button>"+
            "</td></tr>"})
        
    } else  {
        booklist+="<tr><td colspan=3>Non ci sono Libri</td></tr>";
    }
    booklist+="</table>";  
    let r=document.getElementById("results");
    r.innerHTML=booklist;
}

async function deleteBook (id){
    // Funzione che cancella il libro con id 
    console.log("Deleting book "+id+"...");
    await action("DELETE", "/books/"+id);
    await listBooks ();
}

async function deleteAllBooks (){
    // Funzione che cancella tutti i libri
    console.log("Deleting ALL books...");
    await action("DELETE", "/books");
    await listBooks ();
}
function createBookForm(){
    // Funzione che crea un form al volo e lo visualizza al posto della lista
    let form="Titolo:<input type='text' id='titolo' size=30/><br/>";
    form+="Autore:<input type='text' id='autore' size=30/><br/>";
    form+="<button onclick='createBook()'>Crea Nuovo Libro</button>";
    
    let r=document.getElementById("results");
    r.innerHTML=form;
}
async function createBook (){
    // Funzione che prende i dati inseriti crea il libro sul server e richiama la lista 
    console.log("Creating new book...");
    let tit=document.getElementById("titolo").value;
    let aut=document.getElementById("autore").value;
    res=await action("POST", "/books", {"title":tit,"author":aut});
    if (!res) {
        alert ("Errore Durante la creazione del libro");
    }
    listBooks ();
}
async function showBook (id){
    console.log("book Details...");
    // Prendiamo i dettagli del libro
    let b=await action("GET","/books/"+id);

    if (!b) { 
        alert ("ERRORE: Libro non trovato sul DB"); 
        return
    }
    let form="Id:"+b.id+"<br/>";
    form="Titolo:<input type='text' id='titolo' size=30 "+ 'value="'+b.title+'"/><br/>';
    form+="Autore:<input type='text' id='autore' size=30 "+ 'value="'+b.author+'"/><br/>';
    form+="<button onclick='updateBook("+b.id+")'>Aggiorna Libro</button>";

    let r=document.getElementById("results");
    r.innerHTML=form;
}
async function updateBook (id){
    // Funzione che prende i dati inseriti crea il libro sul server e richiama la lista 
    console.log("Updating new book...");
    let tit=document.getElementById("titolo").value;
    let aut=document.getElementById("autore").value;
    res=await action("POST", "/books/"+id, {"title":tit,"author":aut});
    if (!res) {
        alert ("Errore Durante l'aggiornamento del libro");
    }
    listBooks ();
}       
async function replaceBook (id){
    // Funzione che prende i dati inseriti crea il libro sul server e richiama la lista 
    console.log("Replacing new book...");
    let tit=document.getElementById("titolo").value;
    let aut=document.getElementById("autore").value;
    res=await action("PUT", "/books/"+id, {"id":id,"title":tit,"author":aut});
    if (!res) {
        alert ("Errore Durante la sostituzione del libro");
    }
    listBooks ();
}         