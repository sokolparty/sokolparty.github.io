import { getStorage } from "firebase/storage"; // Dodaj import, jeśli używasz modułów

document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        const storageRef = storage.ref('images/' + file.name);
        
        // Przesyłanie pliku
        storageRef.put(file).then(() => {
            document.getElementById('message').textContent = 'Zdjęcie przesłane pomyślnie!';
            displayImages(); // Wywołaj funkcję wyświetlającą zdjęcia
        }).catch((error) => {
            console.error('Błąd podczas przesyłania zdjęcia:', error);
            document.getElementById('message').textContent = 'Błąd podczas przesyłania zdjęcia: ' + error.message;
        });
    }
});

// Funkcja do wyświetlania zdjęć
function displayImages() {
    const imagesList = document.getElementById('images-list');
    imagesList.innerHTML = ''; // Wyczyść listę przed dodaniem nowych zdjęć

    const storageRef = storage.ref('images/');
    storageRef.listAll().then((result) => {
        result.items.forEach((imageRef) => {
            imageRef.getDownloadURL().then((url) => {
                const imgElement = document.createElement('img');
                imgElement.src = url;
                imgElement.style.width = '200px'; // Możesz dostosować szerokość
                imgElement.style.margin = '10px'; // Margines między obrazkami
                imagesList.appendChild(imgElement); // Dodaj obrazek do listy
            });
        });
    }).catch((error) => {
        console.error('Błąd podczas pobierania zdjęć:', error);
    });
}

// Wywołaj displayImages() przy ładowaniu strony
window.onload = function() {
    displayImages();
};
