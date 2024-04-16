const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware per il parsing del body delle richieste in formato JSON
app.use(express.json());

// Endpoint per gestire le richieste di aggiornamento del database
app.put('/update-credenziali', (req, res) => {
    // Recupera il body della richiesta che contiene il nuovo database
    const newDatabase = req.body;

    // Scrivi il nuovo database sul file
    fs.writeFile('Samuele_Ceci/Login/credenziali.json', JSON.stringify(newDatabase), (err) => {
        if (err) {
            console.error('Errore durante il salvataggio del database:', err);
            res.status(500).send('Errore durante il salvataggio del database');
        } else {
            console.log('Database aggiornato con successo');
            res.status(200).send('Database aggiornato con successo');
        }
    });
});

// Avvia il server
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
