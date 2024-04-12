document.addEventListener('DOMContentLoaded', function () {
    const bookContainer = document.getElementById('bookContainer');
    const addBookForm = document.getElementById('addBookForm');

    // Funzione per aggiungere uno spazio immagine per ogni libro
    function renderBooks() {
        bookContainer.innerHTML = '';
        userDB.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            bookDiv.innerHTML = `
                <h3>${book.nome}</h3>
                <img src="${book.image ? book.image : 'placeholder.jpg'}" alt="${book.nome}">
            `;
            bookContainer.appendChild(bookDiv);
        });
    }

    // Renderizza i libri all'avvio
    renderBooks();

    // Gestione invio del form per aggiungere un libro
    addBookForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const bookName = document.getElementById('bookName').value;
        const bookImage = document.getElementById('bookImage').files[0];
        const formData = new FormData();
        formData.append('name', bookName);
        formData.append('image', bookImage);
        fetch('/add-book', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                userDB.push({ nome: bookName, image: data.image });
                renderBooks();
            } else {
                alert('Errore durante l\'aggiunta del libro');
            }
        })
        .catch(error => console.error('Errore:', error));
    });
});
