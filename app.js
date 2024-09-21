// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// Function to upload a file
function uploadFile(file) {
  const storageRef = ref(storage, 'images/' + file.name);
  
  uploadBytes(storageRef, file).then((snapshot) => {
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

  const imagesRef = ref(storage, 'images/');

  listAll(imagesRef).then((result) => {
    result.items.forEach((imageRef) => {
      getDownloadURL(imageRef).then((url) => {
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
