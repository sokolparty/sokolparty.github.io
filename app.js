// Konfiguracja Firebase
import { app } from `./firebaseConfig`;
const firebaseConfig = {
  apiKey: "AIzaSyA_P1R1-PGfykAVM_Y9B6Ajz4ckkz1vz9Q",
  authDomain: "sokolparty420.firebaseapp.com",
  projectId: "sokolparty420",
  storageBucket: "sokolparty420.appspot.com",
  messagingSenderId: "361570196780",
  appId: "1:361570196780:web:e1e1e419d06d475355e089",
  measurementId: "G-18TK7X35TQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
};

// Inicjalizacja Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const storage = firebase.storage();

// Funkcja do przesyłania pliku
function uploadFile() {
    const file = document.getElementById('fileInput').files[0];
    const storageRef = storage.ref('images/' + file.name);
  
    storageRef.put(file).then((snapshot) => {
        console.log('Plik został przesłany!', snapshot);
        displayImages(); // Odśwież galerię po przesłaniu pliku
    }).catch((error) => {
        console.error('Błąd przesyłania:', error);
    });
}

// Funkcja do wyświetlania przesłanych zdjęć
function displayImages() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Wyczyść galerię przed wyświetleniem zdjęć

    const imagesRef = storage.ref('images/');

    imagesRef.listAll().then((result) => {
        result.items.forEach((imageRef) => {
            imageRef.getDownloadURL().then((url) => {
                const img = document.createElement('img');
                img.src = url;
                img.width = 200;
                gallery.appendChild(img);
            });
        });
    }).catch((error) => {
        console.error('Błąd wyświetlania zdjęć:', error);
    });
}

// Wywołaj displayImages przy załadowaniu strony, aby pokazać istniejące zdjęcia
window.onload = displayImages;
