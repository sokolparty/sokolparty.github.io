const boardSize = 3; // Rozmiar 3x3
const values = [
    "1", "2", "3", 
    "4", "5", "6", 
    "7", "8", "9"
];

const bingoBoard = document.getElementById('bingo-board');

// Inicjalizacja Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCFoWA5SvQ2vqdPU6X5vvCO4nz9CnHUyIk",
    authDomain: "sokolparty669.firebaseapp.com",
    projectId: "sokolparty669",
    storageBucket: "sokolparty669.appspot.com",
    messagingSenderId: "10124701911",
    appId: "1:10124701911:web:71e3cc5414e7f700344092",
    measurementId: "G-PVSB6981TZ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Upewnij się, że dokument istnieje w Firestore
const squareRef = db.collection('bingoSquares').doc('current');

squareRef.get().then((doc) => {
    if (!doc.exists) {
        // Ustawienie domyślnych wartości w Firestore
        const initialData = {};
        for (let i = 0; i < values.length; i++) {
            initialData[`value${i}`] = values[i];
        }
        squareRef.set(initialData);
    }
});

// Tworzenie planszy Bingo
function createBoard() {
    bingoBoard.innerHTML = ''; // Wyczyść planszę
    for (let i = 0; i < boardSize * boardSize; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.textContent = values[i]; // Wypełnienie kwadratów z wartościami z tablicy
        square.addEventListener('click', () => markSquare(i));
        bingoBoard.appendChild(square);
    }
}

createBoard();

// Zaznaczanie pola w Firestore
function markSquare(index) {
    squareRef.update({ [index]: true }).catch((error) => {
        squareRef.set({ [index]: true }, { merge: true });
    });
}

// Nasłuchiwanie aktualizacji pól
db.collection('bingoSquares').doc('current').onSnapshot(doc => {
    const data = doc.data();
    if (data) {
        Array.from(bingoBoard.children).forEach((square, index) => {
            square.classList.toggle('marked', data[index] === true);
        });
    }
});

// Resetowanie planszy
function resetBingo() {
    const resetData = {};
    for (let i = 0; i < 9; i++) {
        resetData[i] = false; // Ustawiamy wszystkie pola na false
    }

    squareRef.set(resetData).then(() => {
        console.log("Plansza Bingo została zresetowana!");
    }).catch((error) => {
        console.error("Błąd podczas resetowania planszy: ", error);
    });
}

// Znaczek developerski
const devToggle = document.getElementById('dev-toggle');
const devMenu = document.getElementById('dev-menu');
const inputsContainer = document.getElementById('inputs-container');

devToggle.addEventListener('click', () => {
    devMenu.style.display = devMenu.style.display === 'none' ? 'block' : 'none';
});

// Funkcja do tworzenia inputów do zmiany tekstu w kwadratach
function createInputs() {
    inputsContainer.innerHTML = ''; // Wyczyść wcześniejsze inputy
    for (let i = 0; i < values.length; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = values[i]; // Ustaw aktualną wartość
        input.dataset.index = i; // Przechowuj indeks
        
        input.addEventListener('input', (event) => {
            values[i] = event.target.value; // Zaktualizuj wartość w tablicy
            const square = bingoBoard.children[i];
            square.textContent = values[i]; // Zaktualizuj tekst w kwadracie

            // Aktualizacja wartości w Firestore
            squareRef.set({ [`value${i}`]: values[i] }, { merge: true });
        });
        
        inputsContainer.appendChild(input);
    }
}

// Wywołanie funkcji do tworzenia inputów
createInputs();

// Nasłuchiwanie aktualizacji wartości z Firestore
db.collection('bingoSquares').doc('current').onSnapshot(doc => {
    const data = doc.data();
    if (data) {
        for (let i = 0; i < values.length; i++) {
            if (data[`value${i}`]) {
                values[i] = data[`value${i}`]; // Ustaw wartość z Firestore
                const square = bingoBoard.children[i];
                square.textContent = values[i]; // Zaktualizuj tekst w kwadracie
            }
        }
        createInputs(); // Odśwież inputy, aby pokazać aktualne wartości
    }
});

// Resetowanie planszy
document.getElementById('reset-button').addEventListener('click', resetBingo);
