document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previeni l'invio predefinito del form

    // Recupera i valori dal form di registrazione
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();
    var areaPersonale = document.getElementById('areaPersonale').value.trim();

    // Validazione dei dati
    if (username === '' || password === '' || areaPersonale === '') {
        alert('Per favore, compila tutti i campi.');
        return;
    }

    // Effettua una richiesta HTTP per leggere il database corrente
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'Samuele_Ceci/Login/credenziali.json', true); // Assicurati che l'URL sia corretto
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Converti il database corrente in un array JavaScript
                var database = JSON.parse(xhr.responseText);

                // Aggiungi le nuove credenziali al database
                database.push({
                    username: username,
                    password: password,
                    area_personale: areaPersonale
                });

                // Effettua una richiesta HTTP per aggiornare il database con le nuove credenziali
                var xhrUpdate = new XMLHttpRequest();
                xhrUpdate.open('PUT', 'Samuele_Ceci/Login/credenziali.json', true); // Assicurati che l'URL sia corretto
                xhrUpdate.setRequestHeader('Content-Type', 'application/json');
                xhrUpdate.onreadystatechange = function() {
                    if (xhrUpdate.readyState === XMLHttpRequest.DONE) {
                        if (xhrUpdate.status === 200) {
                            alert('Registrazione completata. Ora puoi effettuare il login.');
                            // Reindirizza l'utente alla pagina di login
                            window.location.href = "login.html";
                        } else {
                            alert('Si è verificato un errore durante la registrazione. Riprova più tardi.');
                        }
                    }
                };
                xhrUpdate.send(JSON.stringify(database));
            } else {
                alert('Errore durante il caricamento del database.');
            }
        }
    };
    xhr.send();
});
