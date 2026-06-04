import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBw8HBTT9pFJv6-rEEjibSvwHPpNWJaHB0",
    authDomain: "mn-portfiolio.firebaseapp.com",
    projectId: "mn-portfiolio",
    storageBucket: "mn-portfiolio.firebasestorage.app",
    messagingSenderId: "80517558958",
    appId: "1:80517558958:web:7f7372eaf2caa0b7eef33f",
    measurementId: "G-SGDRFV8517"
  };

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
getAnalytics(app);

window.handleSubmit = async function () {

  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const email = document.getElementById('cemail').value.trim();
  const ptype = document.getElementById('ptype').value;
  const budget = document.getElementById('budget').value;
  const message = document.getElementById('message').value.trim();

  // Validation
  if (!fname || !email || !message) {
    alert("Please fill all required fields.");
    return;
  }

  try {

    await addDoc(collection(db, "contacts"), {
      firstName: fname,
      lastName: lname || "",
      email: email,
      projectType: ptype || "",
      budget: budget || "",
      message: message,
      createdAt: new Date().toISOString()
    });

    // Success UI
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';

    console.log("Contact saved successfully");

  } catch (error) {

    console.error("Firestore Error:", error);

    alert(
      "Message could not be sent. Please try again later."
    );
  }
}; 