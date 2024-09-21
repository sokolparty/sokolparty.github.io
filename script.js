document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        const storageRef = storage.ref('images/' + file.name);
        
        // Przesyłanie pliku
        storageRef.put(file).then(() => {
            document.getElementById('message').textContent = 'Zdjęcie przesłane pomyślnie!';
        }).catch((error) => {
            console.error('Błąd podczas przesyłania zdjęcia:', error);
            document.getElementById('message').textContent = 'Błąd podczas przesyłania zdjęcia: ' + error.message;
        });
    }
});
