document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previeni il comportamento predefinito del form

    // Recupera i valori di username e password
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Effettua una richiesta HTTP per leggere il file JSON
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'credenziali.json', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var utenti = JSON.parse(xhr.responseText);
                // Verifica le credenziali
                var utente = utenti.find(function(u) {
                    return u.username === username && u.password === password;
                });
                if (utente) {
                    // Reindirizza l'utente all'area personale
                    window.location.href = "area_personale.html";
                } else {
                    alert('Credenziali non valide. Riprova.');
                }
            } else {
                console.error('Errore durante il caricamento del file JSON');
            }
        }
    };
    xhr.send();
});
