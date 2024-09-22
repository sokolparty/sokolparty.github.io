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

const boardSize = 3; // Zmiana na 3x3
const values = [
    "1", "2", "3", 
    "4", "5", "6", 
    "7", "8", "9"
];

const bingoBoard = document.getElementById('bingo-board');

// Tworzenie planszy Bingo
for (let i = 0; i < boardSize * boardSize; i++) {
    const square = document.createElement('div');
    square.className = 'square';
    square.textContent = values[i]; // Wypełnienie kwadratów z wartościami z tablicy
    square.addEventListener('click', () => markSquare(i));
    bingoBoard.appendChild(square);
}

// Pozostała część kodu (markSquare, resetBingo itp.)


// Zaznaczanie pola w Firestore
function markSquare(index) {
    const squareRef = db.collection('bingoSquares').doc('current');
    
    // Użycie opcji update, aby zaktualizować tylko jedno pole, bez nadpisywania innych
    squareRef.update({ [index]: true }).catch((error) => {
        // Jeśli dokument nie istnieje, użyj set
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

