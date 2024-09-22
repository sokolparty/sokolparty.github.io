const boardSize = 3;
const values = [
    "1", "2", "3", 
    "4", "5", "6", 
    "7", "8", "9"
];

const bingoBoard = document.getElementById('bingo-board');
const loginForm = document.getElementById('login-form');
const devToggle = document.getElementById('dev-toggle');
const devMenu = document.getElementById('dev-menu');
const inputsContainer = document.getElementById('inputs-container');
const loginButton = document.getElementById('login-button');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginMessage = document.getElementById('login-message');

let isLoggedIn = false;

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

const squareRef = db.collection('bingoSquares').doc('current');

squareRef.get().then((doc) => {
    if (!doc.exists) {
        const initialData = {};
        for (let i = 0; i < values.length; i++) {
            initialData[`value${i}`] = values[i];
        }
        squareRef.set(initialData);
    }
});

function createBoard() {
    bingoBoard.innerHTML = '';
    for (let i = 0; i < boardSize * boardSize; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.textContent = values[i];
        square.addEventListener('click', () => markSquare(i));
        bingoBoard.appendChild(square);
    }
}

createBoard();

function markSquare(index) {
    squareRef.update({ [index]: true }).catch((error) => {
        squareRef.set({ [index]: true }, { merge: true });
    });
}

db.collection('bingoSquares').doc('current').onSnapshot(doc => {
    const data = doc.data();
    if (data) {
        Array.from(bingoBoard.children).forEach((square, index) => {
            square.classList.toggle('marked', data[index] === true);
        });
    }
});

function resetBingo() {
    const resetData = {};
    for (let i = 0; i < 9; i++) {
        resetData[i] = false;
    }

    squareRef.set(resetData).then(() => {
        console.log("Plansza Bingo została zresetowana!");
    }).catch((error) => {
        console.error("Błąd podczas resetowania planszy: ", error);
    });
}

loginButton.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === "Sabek" && password === "yessir") {
        isLoggedIn = true;
        loginForm.style.display = 'none';
        devMenu.style.display = 'block';
    } else {
        loginMessage.textContent = "Niepoprawna nazwa użytkownika lub hasło.";
    }
});

devToggle.addEventListener('click', () => {
    if (isLoggedIn) {
        devMenu.style.display = devMenu.style.display === 'none' ? 'block' : 'none';
    } else {
        loginForm.style.display = 'block';
    }
});

function createInputs() {
    inputsContainer.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = values[i];
        input.dataset.index = i;
        
        input.addEventListener('input', (event) => {
            values[i] = event.target.value;
            const square = bingoBoard.children[i];
            square.textContent = values[i];
            squareRef.set({ [`value${i}`]: values[i] }, { merge: true });
        });

        inputsContainer.appendChild(input);
    }
}

createInputs();

db.collection('bingoSquares').doc('current').onSnapshot(doc => {
    const data = doc.data();
    if (data) {
        for (let i = 0; i < values.length; i++) {
            if (data[`value${i}`] && data[`value${i}`] !== values[i]) {
                values[i] = data[`value${i}`];
                const square = bingoBoard.children[i];
                square.textContent = values[i];
            }
        }
    }
});

document.getElementById('reset-button').addEventListener('click', resetBingo);
