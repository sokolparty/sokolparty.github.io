// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA_P1R1-PGfykAVM_Y9B6Ajz4ckkz1vz9Q",
  authDomain: "sokolparty420.firebaseapp.com",
  projectId: "sokolparty420",
  storageBucket: "sokolparty420.appspot.com",
  messagingSenderId: "361570196780",
  appId: "1:361570196780:web:ed13c0abc51d865355e089",
  measurementId: "G-BRWXNL09M4"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const storage = firebase.storage();

// Function to upload a file
function uploadFile() {
  const file = document.getElementById('fileInput').files[0];
  const storageRef = storage.ref('images/' + file.name);
  
  storageRef.put(file).then((snapshot) => {
    console.log('Uploaded a blob or file!', snapshot);
    displayImages(); // Refresh the displayed images after upload
  }).catch((error) => {
    console.error('Upload failed:', error);
  });
}

// Function to display all uploaded images
function displayImages() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear the gallery before displaying images

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
    console.error('Error displaying images:', error);
  });
}

// Example of usage: Call the uploadFile function with a selected file
document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  uploadFile(file);
});

// Call displayImages when the page loads to show existing images
window.onload = displayImages;
