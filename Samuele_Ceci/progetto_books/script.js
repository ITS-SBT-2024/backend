let libri = { "libri": [] };

function mostraElencoLibri() {
  var elencoLibri = document.getElementById("elencoLibri");
  elencoLibri.innerHTML = ""; // Pulisce la lista prima di aggiungere nuovi elementi

  libri.libri.forEach(function(libro) {
    var listItem = document.createElement("li");

    // Aggiunge il nome del libro con un tag span
    var nomeLibroSpan = document.createElement("span");
    nomeLibroSpan.textContent = libro.nome;
    nomeLibroSpan.classList.add("nome-libro");
    listItem.appendChild(nomeLibroSpan);

    // Aggiunge l'ID del libro con un tag span
    var idLibroSpan = document.createElement("span");
    idLibroSpan.textContent =  libro.id;
    idLibroSpan.classList.add("id-libro");
    listItem.appendChild(idLibroSpan);

    elencoLibri.appendChild(listItem);
  });
}

function cercaLibro() {
  var idCercato = document.getElementById("idCercato").value;
  var libroTrovato = libri.libri.find(function(libro) {
    return libro.id === idCercato;
  });

  if (libroTrovato) {
    alert("Libro trovato: " + libroTrovato.nome);
  } else {
    alert("Nessun libro trovato con l'ID specificato.");
  }
}

function aggiungiLibro() {
  var nomeLibro = document.getElementById("nomeLibro").value;
  var nuovoId = (libri.libri.length > 0) ? (parseInt(libri.libri[libri.libri.length - 1].id) + 1).toString() : "1";
  libri.libri.push({ nome: nomeLibro, id: nuovoId });
  mostraElencoLibri();
}

function modificaLibro() {
  var idModifica = document.getElementById("idModifica").value;
  var nuovoNome = document.getElementById("nuovoNome").value;
  var libroDaModificare = libri.libri.find(function(libro) {
    return libro.id === idModifica;
  });

  if (libroDaModificare) {
    libroDaModificare.nome = nuovoNome;
    mostraElencoLibri();
  } else {
    alert("Nessun libro trovato con l'ID specificato.");
  }
}

function eliminaLibro() {
  var idElimina = document.getElementById("idElimina").value;
  var indiceLibro = libri.libri.findIndex(function(libro) {
    return libro.id === idElimina;
  });

  if (indiceLibro !== -1) {
    libri.libri.splice(indiceLibro, 1);
    mostraElencoLibri();
  } else {
    alert("Nessun libro trovato con l'ID specificato.");
  }
}

function eliminaCollezione() {
  var conferma = confirm("Sei sicuro di voler eliminare l'intera collezione di libri?");
  if (conferma) {
    libri.libri = [];
    mostraElencoLibri();
  }
}

mostraElencoLibri(); // Mostra l'elenco dei libri all'avvio della pagina
